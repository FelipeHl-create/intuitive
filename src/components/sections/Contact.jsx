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
    
    try {
      // Preparar mensagem para email
      const subject = `Nova mensagem do portfólio: ${formData.subject}`
      const body = `Olá Felipe!

Recebi uma nova mensagem através do seu portfólio Intuitive Portfolio:

Nome: ${formData.name}
Email: ${formData.email}
Assunto: ${formData.subject}

Mensagem:
${formData.message}

---
Esta mensagem foi enviada automaticamente através do seu portfólio.
Para responder, use o email: ${formData.email}

Atenciosamente,
Sistema de Contato do Portfólio`

      // Codificar assunto e corpo para URL
      const encodedSubject = encodeURIComponent(subject)
      const encodedBody = encodeURIComponent(body)
      
      // URL do email com a mensagem pré-formatada
      const emailUrl = `mailto:luizhidalgo00@gmail.com?subject=${encodedSubject}&body=${encodedBody}`
      
      // Simular envio (delay para mostrar loading)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Abrir cliente de email padrão do usuário
      window.location.href = emailUrl
      
      // Mostrar mensagem de sucesso para o usuário
      alert('Mensagem preparada! Seu cliente de email será aberto automaticamente.')
      
      // Limpar formulário
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      
    } catch (error) {
      alert('Erro ao preparar mensagem. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "luizhidalgo00@gmail.com",
      link: "mailto:luizhidalgo00@gmail.com"
    },
    {
      icon: "📱",
      title: "Telefone",
      value: "(11) 97658-8301",
      link: "tel:+5511976588301"
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
      value: "Felipe",
      link: "https://www.linkedin.com/in/luiz-felipe-hidalgo-49b86825b"
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
                <a href="https://github.com/FelipeHl-create" className="social-icon" target="_blank" rel="noopener noreferrer" title="GitHub">
                  <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/luiz-felipe-hidalgo-49b86825b" className="social-icon" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://instagram.com/perafelipera" className="social-icon" target="_blank" rel="noopener noreferrer" title="Instagram">
                  <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                  </svg>
                </a>
                <a href="https://wa.me/5511976588301" className="social-icon" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                  <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
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
                    <span className="button-icon">📧</span>
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
