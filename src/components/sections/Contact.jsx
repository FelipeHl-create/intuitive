import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './Contact.css'

const Contact = () => {
  const contactRef = useRef(null)
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const contact = contactRef.current
    const form = formRef.current

    // Animação de entrada da seção
    gsap.fromTo(contact, 
      { 
        opacity: 0, 
        y: 100 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contact,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Efeito parallax para elementos internos
    const parallaxElements = contact.querySelectorAll('.parallax-element')
    parallaxElements.forEach((element, index) => {
      const speed = 0.15 + (index * 0.05)
      gsap.to(element, {
        yPercent: -15 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: contact,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    })
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    // Aqui você pode adicionar lógica para enviar o formulário
    console.log('Formulário enviado:', formData)
  }

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "contato@seudominio.com",
      link: "mailto:contato@seudominio.com"
    },
    {
      icon: "📱",
      title: "Telefone",
      value: "+55 (11) 99999-9999",
      link: "tel:+5511999999999"
    },
    {
      icon: "📍",
      title: "Localização",
      value: "São Paulo, Brasil",
      link: null
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "linkedin.com/in/seuperfil",
      link: "https://linkedin.com/in/seuperfil"
    }
  ]

  return (
    <div className="contact" ref={contactRef} id="contact">
      <div className="contact-container">
        {/* Cabeçalho da seção */}
        <div className="section-header">
          <h2 className="section-title">Vamos Criar Algo Incrível Juntos</h2>
          <p className="section-subtitle">
            Entre em contato para discutir seu próximo projeto ou apenas para dizer olá
          </p>
        </div>

        <div className="contact-content">
          {/* Informações de contato */}
          <div className="contact-info parallax-element">
            <h3 className="info-title">Informações de Contato</h3>
            <div className="info-list">
              {contactInfo.map((info, index) => (
                <div key={index} className="info-item">
                  <div className="info-icon">{info.icon}</div>
                  <div className="info-content">
                    <h4 className="info-label">{info.title}</h4>
                    {info.link ? (
                      <a href={info.link} className="info-value" target="_blank" rel="noopener noreferrer">
                        {info.value}
                      </a>
                    ) : (
                      <span className="info-value">{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Redes sociais */}
            <div className="social-links">
              <h4 className="social-title">Redes Sociais</h4>
              <div className="social-icons">
                <a href="https://github.com/seuperfil" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <span className="icon">📁</span>
                </a>
                <a href="https://linkedin.com/in/seuperfil" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <span className="icon">💼</span>
                </a>
                <a href="https://twitter.com/seuperfil" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <span className="icon">🐦</span>
                </a>
                <a href="https://instagram.com/seuperfil" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <span className="icon">📸</span>
                </a>
              </div>
            </div>
          </div>

          {/* Formulário de contato */}
          <div className="contact-form parallax-element">
            <h3 className="form-title">Envie uma Mensagem</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Assunto</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Sobre o que você gostaria de falar?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Conte-me mais sobre seu projeto..."
                  rows="5"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar Mensagem</span>
                    <span className="button-icon">→</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Mensagem de agradecimento */}
        <div className="contact-footer">
          <p className="footer-text">
            Obrigado por visitar meu portfólio! Estou sempre aberto a novas oportunidades 
            e colaborações interessantes.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact
