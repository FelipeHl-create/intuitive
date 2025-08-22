# Portfolio Website

Um site de portfólio pessoal interativo com efeitos de parallax e painel administrativo.

## Características

- Design responsivo e moderno
- Efeitos de parallax suaves
- Animações fluidas
- Painel administrativo para gerenciar conteúdo
- Navegação intuitiva
- Seções: Hero, Sobre, Projetos, Habilidades e Contato

## Tecnologias Utilizadas

- **Frontend**: React.js, Vite, GSAP
- **Estilização**: CSS3, SASS
- **Roteamento**: React Router DOM
- **Animações**: GreenSock Animation Platform

## Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```

## Uso

### Desenvolvimento
```bash
npm run dev
```

### Build para Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

## Estrutura do Projeto

```
src/
├── components/
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   └── Contact.jsx
│   ├── Navigation.jsx
│   ├── Portfolio.jsx
│   └── Admin.jsx
├── contexts/
│   └── AuthContext.jsx
├── App.jsx
└── main.jsx
```

## Personalização

- Edite o conteúdo nas seções correspondentes
- Ajuste as cores e estilos no CSS
- Modifique as animações no GSAP
- Configure as imagens e links

## Deploy

O projeto pode ser deployado em qualquer serviço de hospedagem estática como:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

## Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

## Licença

Este projeto está sob a licença MIT.
