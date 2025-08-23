import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Configuração base do axios com interceptors de segurança
  useEffect(() => {
    // Interceptor para adicionar token em todas as requisições
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Interceptor para tratar erros de autenticação
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout()
        }
        return Promise.reject(error)
      }
    )

    // Cleanup dos interceptors
    return () => {
      axios.interceptors.request.eject(requestInterceptor)
      axios.interceptors.response.eject(responseInterceptor)
    }
  }, [])

  // Verificar se há um token válido ao carregar a página
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken')
      const userData = localStorage.getItem('userData')
      
      if (token && userData) {
        try {
          // Verificar se o token é válido (simulação)
          if (token.startsWith('mock_jwt_token_')) {
            setUser(JSON.parse(userData))
          } else {
            localStorage.removeItem('authToken')
            localStorage.removeItem('userData')
          }
        } catch (error) {
          localStorage.removeItem('authToken')
          localStorage.removeItem('userData')
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (credentials) => {
    try {
      setError(null)
      
      // Credenciais do admin (em produção, isso viria de uma API segura)
      const ADMIN_EMAIL = 'master@gmail.com'
      const ADMIN_PASSWORD = 'm@ster6470'
      
      // Verificar credenciais
      if (credentials.username === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
        // Simular token JWT
        const token = 'mock_jwt_token_' + Date.now()
        const userData = {
          id: 1,
          email: ADMIN_EMAIL,
          name: 'Felipe Hidalgo',
          role: 'admin'
        }
        
        // Armazenar token de forma segura
        localStorage.setItem('authToken', token)
        localStorage.setItem('userData', JSON.stringify(userData))
        setUser(userData)
        
        return { success: true }
      } else {
        const errorMessage = 'Email ou senha incorretos'
        setError(errorMessage)
        return { success: false, error: errorMessage }
      }
    } catch (error) {
      const errorMessage = 'Erro ao fazer login'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    setUser(null)
    setError(null)
  }

  const updateProfile = async (profileData) => {
    try {
      setError(null)
      const response = await axios.put('/api/auth/profile', profileData)
      setUser(response.data.user)
      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro ao atualizar perfil'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
