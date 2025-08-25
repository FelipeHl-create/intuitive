import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './Projects.css'

const Projects = () => {
  const projectsRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [filteredProjects, setFilteredProjects] = useState([])

  const projects = [
    {
      id: 1,
      title: "E-commerce Seguro",
      category: "web",
      description: "Plataforma de e-commerce com foco em segurança, implementando autenticação JWT, validação de entrada e proteção contra ataques comuns.",
      technologies: ["React", "Node.js", "PostgreSQL", "JWT"],
      image: "/project1.jpg",
      link: "#",
      github: "#"
    },
    {
      id: 2,
      title: "VectraDex",
      category: "web",
      description: "Sistema de gestão de produção e estoque com FastAPI + SQLite, interface server-rendered com Jinja2 e estilo moderno. Inclui cadastro e controle de produtos, monitoramento de máquinas, emissão de etiquetas e dashboards.",
      technologies: ["Python", "FastAPI", "SQLite", "Jinja2"],
      image: "/vectradeximage.jpg",
      link: "#",
      github: "https://github.com/FelipeHl-create/VectraDex"
    },
    {
      id: 3,
      title: "App Mobile Financeiro",
      category: "mobile",
      description: "Aplicativo mobile para gestão financeira pessoal com sincronização em nuvem e criptografia de dados sensíveis.",
      technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
      image: "/project3.jpg",
      link: "#",
      github: "#"
    },
    {
      id: 4,
      title: "API de Microserviços",
      category: "backend",
      description: "Arquitetura de microserviços com comunicação assíncrona, monitoramento em tempo real e escalabilidade horizontal.",
      technologies: ["Node.js", "Docker", "Kubernetes", "MongoDB"],
      image: "/project4.jpg",
      link: "#",
      github: "#"
    },
    {
      id: 5,
      title: "Dashboard Analytics",
      category: "web",
      description: "Dashboard de analytics com visualizações interativas, filtros avançados e exportação de dados em múltiplos formatos.",
      technologies: ["React", "D3.js", "Express", "MySQL"],
      image: "/project5.jpg",
      link: "#",
      github: "#"
    },
    {
      id: 6,
      title: "Sistema de Autenticação",
      category: "security",
      description: "Sistema robusto de autenticação com 2FA, rate limiting e proteção contra ataques de força bruta.",
      technologies: ["Node.js", "Redis", "JWT", "bcrypt"],
      image: "/project6.jpg",
      link: "#",
      github: "#"
    }
  ]

  const filters = [
    { key: 'all', label: 'Todos' },
    { key: 'web', label: 'Web' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'backend', label: 'Backend' },
    { key: 'security', label: 'Segurança' }
  ]

  useEffect(() => {
    filterProjects()
  }, [activeFilter])

  useEffect(() => {
    const projects = projectsRef.current

    // Animação de entrada da seção
    gsap.fromTo(projects, 
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
          trigger: projects,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Efeito parallax para elementos internos
    const parallaxElements = projects.querySelectorAll('.parallax-element')
    parallaxElements.forEach((element, index) => {
      const speed = 0.2 + (index * 0.05)
      gsap.to(element, {
        yPercent: -25 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: projects,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    })
  }, [])

  const filterProjects = () => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter))
    }
  }

  const handleFilterClick = (filterKey) => {
    setActiveFilter(filterKey)
  }

  return (
    <div className="projects" ref={projectsRef} id="projects">
      <div className="projects-container">
        {/* Cabeçalho da seção */}
        <div className="section-header">
          <h2 className="section-title">Projetos em Destaque</h2>
          <p className="section-subtitle">
            Uma seleção dos meus melhores trabalhos, focando em inovação e segurança
          </p>
        </div>

        {/* Filtros */}
        <div className="projects-filters">
          {filters.map((filter) => (
            <button
              key={filter.key}
              className={`filter-button ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => handleFilterClick(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Grid de projetos */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className={`project-card parallax-element`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                      <span className="link-icon">🔗</span>
                    </a>
                    <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                      <span className="link-icon">📁</span>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="technology-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão de ação */}
        <div className="projects-cta">
          <button className="projects-button">
            <span className="button-text">Ver Todos os Projetos</span>
            <span className="button-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Projects
