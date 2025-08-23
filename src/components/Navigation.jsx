import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Detectar scroll para mudar estilo da navegação
      setIsScrolled(window.scrollY > 100)

      // Detectar seção ativa baseada no scroll
      const sections = ['hero', 'about', 'projects', 'skills', 'contact']
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <Link to="/" className="logo-link">
            <span className="logo-text">Intuitive Portfolio</span>
          </Link>
        </div>

        {/* Menu de navegação */}
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <button
                className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
                onClick={() => scrollToSection('hero')}
              >
                Início
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => scrollToSection('about')}
              >
                Sobre
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                onClick={() => scrollToSection('projects')}
              >
                Projetos
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                onClick={() => scrollToSection('skills')}
              >
                Habilidades
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => scrollToSection('contact')}
              >
                Contato
              </button>
            </li>
            <li className="nav-item">
              <Link to="/admin" className="nav-link admin-link">
                Admin
              </Link>
            </li>
          </ul>
        </div>

        {/* Botão do menu mobile */}
        <div className="nav-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </div>
      </div>

      {/* Indicador de seção ativa */}
      <div className="section-indicator">
        <div className="indicator-dot" data-section="hero"></div>
        <div className="indicator-dot" data-section="about"></div>
        <div className="indicator-dot" data-section="projects"></div>
        <div className="indicator-dot" data-section="skills"></div>
        <div className="indicator-dot" data-section="contact"></div>
      </div>
    </nav>
  )
}

export default Navigation
