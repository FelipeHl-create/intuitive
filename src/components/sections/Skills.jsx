import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Skills.css'

const Skills = () => {
  const skillsRef = useRef(null)
  const skillsGridRef = useRef(null)

  const skillCategories = [
    {
      name: "Frontend",
      skills: [
        { name: "React", icon: "⚛️", level: 95 },
        { name: "Vue.js", icon: "💚", level: 90 },
        { name: "JavaScript", icon: "🟨", level: 95 },
        { name: "TypeScript", icon: "🔷", level: 85 },
        { name: "HTML/CSS", icon: "🎨", level: 90 },
        { name: "SASS", icon: "💎", level: 85 }
      ]
    },
    {
      name: "Backend",
      skills: [
        { name: "Node.js", icon: "🟢", level: 90 },
        { name: "Python", icon: "🐍", level: 85 },
        { name: "Express", icon: "🚀", level: 90 },
        { name: "Django", icon: "⚡", level: 80 },
        { name: "PostgreSQL", icon: "🐘", level: 85 },
        { name: "MongoDB", icon: "🍃", level: 80 }
      ]
    },
    {
      name: "DevOps & Segurança",
      skills: [
        { name: "Docker", icon: "🐳", level: 85 },
        { name: "Kubernetes", icon: "☸️", level: 75 },
        { name: "AWS", icon: "☁️", level: 80 },
        { name: "JWT", icon: "🔐", level: 90 },
        { name: "OAuth", icon: "🔑", level: 85 },
        { name: "Penetration Testing", icon: "🛡️", level: 80 }
      ]
    },
    {
      name: "Ferramentas",
      skills: [
        { name: "Git", icon: "📚", level: 90 },
        { name: "VS Code", icon: "💻", level: 95 },
        { name: "Figma", icon: "🎨", level: 75 },
        { name: "Postman", icon: "📮", level: 85 },
        { name: "Jest", icon: "🧪", level: 85 },
        { name: "Webpack", icon: "📦", level: 80 }
      ]
    }
  ]

  useEffect(() => {
    const skills = skillsRef.current
    const skillsGrid = skillsGridRef.current

    // Animação de entrada da seção
    gsap.fromTo(skills, 
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
          trigger: skills,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Animação das barras de progresso
    const progressBars = skills.querySelectorAll('.skill-progress-bar')
    progressBars.forEach((bar, index) => {
      const level = bar.getAttribute('data-level')
      
      gsap.fromTo(bar, 
        { width: '0%' },
        {
          width: `${level}%`,
          duration: 2,
          ease: 'power2.out',
          delay: index * 0.1,
          scrollTrigger: {
            trigger: skillsGrid,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    // Efeito parallax para elementos internos
    const parallaxElements = skills.querySelectorAll('.parallax-element')
    parallaxElements.forEach((element, index) => {
      const speed = 0.2 + (index * 0.03)
      gsap.to(element, {
        yPercent: -20 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: skills,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    })
  }, [])

  return (
    <div className="skills" ref={skillsRef} id="skills">
      <div className="skills-container">
        {/* Cabeçalho da seção */}
        <div className="section-header">
          <h2 className="section-title">Habilidades & Tecnologias</h2>
          <p className="section-subtitle">
            Domínio técnico em diversas tecnologias, com foco especial em segurança e performance
          </p>
        </div>

        {/* Grid de habilidades */}
        <div className="skills-grid" ref={skillsGridRef}>
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.name} className="skill-category parallax-element">
              <h3 className="category-title">{category.name}</h3>
              <div className="category-skills">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-header">
                      <div className="skill-icon">{skill.icon}</div>
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-progress">
                      <div 
                        className="skill-progress-bar" 
                        data-level={skill.level}
                        style={{ width: '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Estatísticas adicionais */}
        <div className="skills-stats">
          <div className="stat-item parallax-element">
            <div className="stat-number">15+</div>
            <div className="stat-label">Tecnologias Dominadas</div>
          </div>
          <div className="stat-item parallax-element">
            <div className="stat-number">2</div>
            <div className="stat-label">Anos de Experiência</div>
          </div>
          <div className="stat-item parallax-element">
            <div className="stat-number">5</div>
            <div className="stat-label">Projetos Concluídos</div>
          </div>
          <div className="stat-item parallax-element">
            <div className="stat-number">100%</div>
            <div className="stat-label">Compromisso com Qualidade</div>
          </div>
        </div>

        {/* Botão de ação */}
        <div className="skills-cta">
          <button className="skills-button">
            <span className="button-text">Ver Certificações</span>
            <span className="button-icon">🏆</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Skills
