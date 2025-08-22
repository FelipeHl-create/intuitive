import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import Navigation from './Navigation'
import './Portfolio.css'

// Registrar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const Portfolio = () => {
  const portfolioRef = useRef(null)
  const sectionsRef = useRef([])

  useEffect(() => {
    // Configuração inicial das animações parallax
    const portfolio = portfolioRef.current
    const sections = sectionsRef.current

    // Efeito parallax para o fundo
    gsap.to('.parallax-bg', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: portfolio,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    // Animações para cada seção
    sections.forEach((section, index) => {
      if (section) {
        // Entrada da seção
        gsap.fromTo(section, 
          { 
            opacity: 0, 
            y: 100,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        )

        // Efeito parallax para elementos internos
        const parallaxElements = section.querySelectorAll('.parallax-element')
        parallaxElements.forEach((element, elementIndex) => {
          const speed = 0.5 + (elementIndex * 0.1)
          gsap.to(element, {
            yPercent: -50 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          })
        })
      }
    })

    // Smooth scrolling
    gsap.set('html, body', { scrollBehavior: 'smooth' })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const addSectionRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

  return (
    <div className="portfolio" ref={portfolioRef}>
      {/* Fundo parallax */}
      <div className="parallax-bg">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="bg-pattern"></div>
      </div>

      {/* Navegação */}
      <Navigation />

      {/* Seção Hero */}
      <section ref={addSectionRef} className="section hero-section">
        <Hero />
      </section>

      {/* Seção Sobre */}
      <section ref={addSectionRef} className="section about-section">
        <About />
      </section>

      {/* Seção Projetos */}
      <section ref={addSectionRef} className="section projects-section">
        <Projects />
      </section>

      {/* Seção Habilidades */}
      <section ref={addSectionRef} className="section skills-section">
        <Skills />
      </section>

      {/* Seção Contato */}
      <section ref={addSectionRef} className="section contact-section">
        <Contact />
      </section>

      {/* Indicador de progresso */}
      <div className="scroll-progress">
        <div className="progress-bar"></div>
      </div>
    </div>
  )
}

export default Portfolio
