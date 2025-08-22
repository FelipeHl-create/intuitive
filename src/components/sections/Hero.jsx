import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Hero.css'

const Hero = () => {
  const heroRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const image = imageRef.current
    const text = textRef.current
    const subtitle = subtitleRef.current

    // Timeline de animação de entrada
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    tl.fromTo(image, 
      { 
        opacity: 0, 
        scale: 0.8, 
        y: 50 
      },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 1.2 
      }
    )
    .fromTo(text, 
      { 
        opacity: 0, 
        y: 30 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8 
      }, 
      '-=0.5'
    )
    .fromTo(subtitle, 
      { 
        opacity: 0, 
        y: 20 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8 
      }, 
      '-=0.3'
    )

    // Efeito parallax para a imagem
    gsap.to(image, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })

    // Efeito de movimento sutil no mouse
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      const x = (clientX / innerWidth - 0.5) * 20
      const y = (clientY / innerHeight - 0.5) * 20
      
      gsap.to(image, {
        x: x,
        y: y,
        duration: 1,
        ease: 'power2.out'
      })
    }

    hero.addEventListener('mousemove', handleMouseMove)

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="hero" ref={heroRef} id="hero">
      <div className="hero-container">
        <div className="hero-content">
          {/* Imagem principal */}
          <div className="hero-image-container" ref={imageRef}>
            <div className="hero-image-wrapper">
              <img 
                src="/profile-image.jpg" 
                alt="Desenvolvedor de Software" 
                className="hero-image"
              />
              <div className="image-overlay"></div>
              <div className="image-glow"></div>
            </div>
          </div>

          {/* Texto principal */}
          <div className="hero-text" ref={textRef}>
            <h1 className="hero-title">
              <span className="title-line">Desenvolvedor de</span>
              <span className="title-line highlight">Software</span>
            </h1>
          </div>

          {/* Subtítulo */}
          <div className="hero-subtitle" ref={subtitleRef}>
            <p className="subtitle-text">
              Construindo experiências digitais que são
              <span className="highlight-text"> seguras</span> e
              <span className="highlight-text"> intuitivas</span>
            </p>
          </div>

          {/* Botão de ação */}
          <div className="hero-cta">
            <button className="cta-button">
              <span className="button-text">Ver Projetos</span>
              <span className="button-icon">→</span>
            </button>
          </div>

          {/* Indicador de scroll */}
          <div className="scroll-indicator">
            <div className="scroll-arrow"></div>
            <span className="scroll-text">Role para explorar</span>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div className="hero-decoration">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
      </div>
    </div>
  )
}

export default Hero
