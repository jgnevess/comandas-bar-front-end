# 📟 Sistema de Gestão de Vendas - Frontend

Este é o frontend de um sistema completo para gerenciamento de pedidos, vendas e produtos. A interface é totalmente responsiva, com tema escuro e feita com **React**, **TypeScript** e **Bootstrap**.

---

## ⚙️ Tecnologias

* React
* TypeScript
* React Router
* Bootstrap 5 (tema escuro)
* Axios
* JWT (Autenticação)
* React-PDF (emissão de cupons fiscais)

---

## 🔐 Autenticação

O sistema utiliza **JWT** para autenticação. Após o login, o token é armazenado no `localStorage` e é validado automaticamente nas rotas protegidas.

---

## 🧠 Funcionalidades

* Login com redirecionamento por papel (admin, vendedor, super)
* Cadastro de usuários (apenas super)
* Dashboard para administradores e vendedores
* CRUD de produtos
* Gestão de pedidos e vendas
* Emissão de cupom fiscal (PDF)
* Relatórios por período

---

## 🚀 Executando localmente

```bash
# Instale as dependências
npm install

# Inicie o servidor local
npm run dev
```

A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## 📦 Estrutura de pastas

```bash
src/
│
├── components/         # Componentes reutilizáveis (Navbar, Container, etc)
├── pages/              # Páginas da aplicação
├── services/           # Serviços de requisições HTTP
├── routes/             # Configuração de rotas privadas e públicas
├── models/             # Interfaces e tipos do TypeScript
├── theme-dark-bootstrap.css # Tema customizado do Bootstrap
└── App.tsx             # Componente principal
```

---

## 🛡️ Controle de Acesso

As rotas são protegidas com base no papel do usuário:

| Página    | ADMIN | SELLER | SUPER |
| --------- | :---: | :----: | :---: |
| /admin    |   ✅   |    ❌   |   ❌   |
| /seller   |   ✅   |    ✅   |   ❌   |
| /products |   ✅   |    ❌   |   ❌   |
| /register |   ❌   |    ❌   |   ✅   |
| /sales    |   ✅   |    ❌   |   ❌   |
| /pdf/\:id |   ✅   |    ✅   |   ❌   |

---

## 🎨 Tema Escuro

A interface utiliza Bootstrap com tema escuro customizado para uma experiência visual moderna e confortável.

---

## 📄 Licença

Este projeto é privado e não possui uma licença pública.
Entre em contato com o autor para mais informações.

---

## 👨‍💻 Desenvolvedor

Feito com 💻 por [João Gabriel Neves](https://github.com/jgnevess)
