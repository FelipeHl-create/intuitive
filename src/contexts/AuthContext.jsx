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
      if (token) {
        try {
          const response = await axios.get('/api/auth/verify', {
            headers: { Authorization: `Bearer ${token}` }
          })
          setUser(response.data.user)
        } catch (error) {
          localStorage.removeItem('authToken')
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (credentials) => {
    try {
      setError(null)
      const response = await axios.post('/api/auth/login', credentials)
      const { token, user: userData } = response.data
      
      // Armazenar token de forma segura
      localStorage.setItem('authToken', token)
      setUser(userData)
      
      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro ao fazer login'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
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
