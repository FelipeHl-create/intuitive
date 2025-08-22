import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Admin.css'

const Admin = () => {
  const { login, isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('content')
  const [contentData, setContentData] = useState({
    hero: {
      title: 'Desenvolvedor de Software',
      subtitle: 'Construindo experiências digitais que são seguras e intuitivas'
    },
    about: {
      description: 'Sou um desenvolvedor de software com experiência em criar aplicações web modernas e seguras...',
      stats: {
        experience: '5',
        projects: '50',
        technologies: '15',
        satisfaction: '100'
      }
    },
    contact: {
      email: 'contato@seudominio.com',
      phone: '+55 (11) 99999-9999',
      location: 'São Paulo, Brasil'
    }
  })

  useEffect(() => {
    if (isAuthenticated) {
      // Carregar dados do conteúdo atual
      loadContent()
    }
  }, [isAuthenticated])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await login(credentials)
      if (result.success) {
        navigate('/admin')
      } else {
        setError(result.error)
      }
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const loadContent = async () => {
    try {
      // Aqui você faria uma chamada para a API para carregar o conteúdo atual
      // Por enquanto, usamos os dados mockados
      console.log('Carregando conteúdo...')
    } catch (error) {
      console.error('Erro ao carregar conteúdo:', error)
    }
  }

  const handleContentUpdate = async (section, data) => {
    try {
      // Aqui você faria uma chamada para a API para atualizar o conteúdo
      setContentData(prev => ({
        ...prev,
        [section]: { ...prev[section], ...data }
      }))
      console.log(`Conteúdo da seção ${section} atualizado:`, data)
    } catch (error) {
      console.error('Erro ao atualizar conteúdo:', error)
    }
  }

  const handleInputChange = (section, field, value) => {
    setContentData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <div className="login-header">
            <h1>Painel Administrativo</h1>
            <p>Faça login para gerenciar o conteúdo do site</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Usuário</label>
              <input
                type="text"
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                required
                placeholder="Digite seu usuário"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                required
                placeholder="Digite sua senha"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="login-footer">
            <a href="/" className="back-link">← Voltar ao site</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <div className="admin-title">
          <h1>Painel Administrativo</h1>
          <p>Bem-vindo, {user?.name || 'Administrador'}!</p>
        </div>
        <div className="admin-actions">
          <button onClick={handleLogout} className="logout-button">
            Sair
          </button>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-sidebar">
          <nav className="admin-nav">
            <button
              className={`nav-item ${activeTab === 'content' ? 'active' : ''}`}
              onClick={() => setActiveTab('content')}
            >
              📝 Conteúdo
            </button>
            <button
              className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              🚀 Projetos
            </button>
            <button
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ Configurações
            </button>
          </nav>
        </div>

        <div className="admin-main">
          {activeTab === 'content' && (
            <div className="content-editor">
              <h2>Editor de Conteúdo</h2>
              
              {/* Seção Hero */}
              <div className="content-section">
                <h3>Seção Hero</h3>
                <div className="form-group">
                  <label>Título Principal</label>
                  <input
                    type="text"
                    value={contentData.hero.title}
                    onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
                    placeholder="Título da seção hero"
                  />
                </div>
                <div className="form-group">
                  <label>Subtítulo</label>
                  <input
                    type="text"
                    value={contentData.hero.subtitle}
                    onChange={(e) => handleInputChange('hero', 'subtitle', e.target.value)}
                    placeholder="Subtítulo da seção hero"
                  />
                </div>
                <button 
                  onClick={() => handleContentUpdate('hero', contentData.hero)}
                  className="save-button"
                >
                  Salvar Hero
                </button>
              </div>

              {/* Seção About */}
              <div className="content-section">
                <h3>Seção Sobre</h3>
                <div className="form-group">
                  <label>Descrição</label>
                  <textarea
                    value={contentData.about.description}
                    onChange={(e) => handleInputChange('about', 'description', e.target.value)}
                    placeholder="Descrição sobre você"
                    rows="4"
                  />
                </div>
                <div className="stats-editor">
                  <h4>Estatísticas</h4>
                  <div className="stats-grid">
                    <div className="stat-input">
                      <label>Anos de Experiência</label>
                      <input
                        type="text"
                        value={contentData.about.stats.experience}
                        onChange={(e) => handleInputChange('about', 'stats', { ...contentData.about.stats, experience: e.target.value })}
                      />
                    </div>
                    <div className="stat-input">
                      <label>Projetos Concluídos</label>
                      <input
                        type="text"
                        value={contentData.about.stats.projects}
                        onChange={(e) => handleInputChange('about', 'stats', { ...contentData.about.stats, projects: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => handleContentUpdate('about', contentData.about)}
                  className="save-button"
                >
                  Salvar Sobre
                </button>
              </div>

              {/* Seção Contato */}
              <div className="content-section">
                <h3>Seção Contato</h3>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={contentData.contact.email}
                    onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
                    placeholder="Seu email de contato"
                  />
                </div>
                <div className="form-group">
                  <label>Telefone</label>
                  <input
                    type="text"
                    value={contentData.contact.phone}
                    onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
                    placeholder="Seu telefone"
                  />
                </div>
                <button 
                  onClick={() => handleContentUpdate('contact', contentData.contact)}
                  className="save-button"
                >
                  Salvar Contato
                </button>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="projects-editor">
              <h2>Gerenciador de Projetos</h2>
              <p>Funcionalidade em desenvolvimento...</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-editor">
              <h2>Configurações</h2>
              <p>Funcionalidade em desenvolvimento...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin
