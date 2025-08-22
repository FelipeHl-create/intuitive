import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './About.css'

const About = () => {
  const aboutRef = useRef(null)
  const contentRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const about = aboutRef.current
    const content = contentRef.current
    const stats = statsRef.current

    // Animação de entrada da seção
    gsap.fromTo(content, 
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
          trigger: about,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Animação dos números estatísticos
    const statNumbers = stats.querySelectorAll('.stat-number')
    statNumbers.forEach((stat, index) => {
      const finalValue = parseInt(stat.getAttribute('data-value'))
      
      gsap.fromTo(stat, 
        { textContent: 0 },
        {
          textContent: finalValue,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: stats,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.2
        }
      )
    })

    // Efeito parallax para elementos internos
    const parallaxElements = about.querySelectorAll('.parallax-element')
    parallaxElements.forEach((element, index) => {
      const speed = 0.3 + (index * 0.1)
      gsap.to(element, {
        yPercent: -30 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: about,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    })
  }, [])

  return (
    <div className="about" ref={aboutRef} id="about">
      <div className="about-container">
        <div className="about-content" ref={contentRef}>
          {/* Título da seção */}
          <div className="section-header">
            <h2 className="section-title">Sobre Mim</h2>
            <p className="section-subtitle">
              Apaixonado por tecnologia e inovação, com foco em desenvolvimento seguro
            </p>
          </div>

          {/* Conteúdo principal */}
          <div className="about-main">
            <div className="about-text parallax-element">
              <div className="about-description">
                <p>
                  Sou um desenvolvedor de software com experiência em criar aplicações web 
                  modernas e seguras. Minha jornada na tecnologia começou com a curiosidade 
                  de entender como as coisas funcionam, e evoluiu para uma paixão por 
                  construir soluções que fazem a diferença.
                </p>
                <p>
                  Especializo-me em desenvolvimento front-end com React, back-end com Node.js, 
                  e tenho um forte interesse em segurança de aplicações web. Acredito que 
                  cada linha de código deve ser escrita com segurança em mente, desde o 
                  primeiro commit.
                </p>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="about-stats" ref={statsRef}>
              <div className="stat-item parallax-element">
                <div className="stat-number" data-value="5">0</div>
                <div className="stat-label">Anos de Experiência</div>
              </div>
              <div className="stat-item parallax-element">
                <div className="stat-number" data-value="50">0</div>
                <div className="stat-label">Projetos Concluídos</div>
              </div>
              <div className="stat-item parallax-element">
                <div className="stat-number" data-value="15">0</div>
                <div className="stat-label">Tecnologias Dominadas</div>
              </div>
              <div className="stat-item parallax-element">
                <div className="stat-number" data-value="100">0</div>
                <div className="stat-label">% Satisfação do Cliente</div>
              </div>
            </div>
          </div>

          {/* Valores e princípios */}
          <div className="about-values">
            <div className="value-item parallax-element">
              <div className="value-icon">🔒</div>
              <h3 className="value-title">Segurança</h3>
              <p className="value-description">
                Priorizo a segurança em todos os projetos, implementando as melhores práticas 
                e padrões da indústria.
              </p>
            </div>
            <div className="value-item parallax-element">
              <div className="value-icon">💡</div>
              <h3 className="value-title">Inovação</h3>
              <p className="value-description">
                Busco constantemente novas tecnologias e abordagens para criar soluções 
                mais eficientes e impactantes.
              </p>
            </div>
            <div className="value-item parallax-element">
              <div className="value-icon">🎯</div>
              <h3 className="value-title">Qualidade</h3>
              <p className="value-description">
                Comprometido com a excelência técnica e a entrega de produtos de alta 
                qualidade que superam as expectativas.
              </p>
            </div>
          </div>

          {/* Botão de ação */}
          <div className="about-cta">
            <button className="about-button">
              <span className="button-text">Baixar CV</span>
              <span className="button-icon">📄</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
