# 💰 Spentfy - Sistema de Finanças Pessoais

Uma aplicação moderna e profissional para gerenciamento de finanças pessoais, construída com Next.js 15, TypeScript, Prisma e PostgreSQL.

## ✨ Características Principais

- 🔐 **Autenticação GitHub** com NextAuth v5
- 💳 **Gerenciamento de Transações** (receitas e despesas)
- 📊 **Interface Moderna** com Tailwind CSS
- 🔄 **Cache Inteligente** com SWR para atualizações em tempo real
- 📱 **Design Responsivo**
- 🛡️ **Validação de Dados** com Zod
- 🗄️ **Banco de Dados** PostgreSQL com Prisma ORM

## 🚀 Como Executar

### Pré-requisitos

- Node.js 20+
- PostgreSQL
- Conta GitHub (para autenticação)

### 1. Clone o projeto

\`\`\`bash
git clone <seu-repositorio>
cd spentfy
\`\`\`

### 2. Instale as dependências

\`\`\`bash
npm install
\`\`\`

### 3. Configure as variáveis de ambiente

Crie um arquivo \`.env\` na raiz do projeto:

\`\`\`env

# Database

DATABASE_URL="postgresql://usuario:senha@localhost:5432/spentfy"

# NextAuth

AUTH_SECRET="seu-secret-super-seguro"
GITHUB_CLIENT_ID="seu-github-client-id"
GITHUB_CLIENT_SECRET="seu-github-client-secret"
\`\`\`

### 4. Configure o banco de dados

\`\`\`bash

# Gerar cliente Prisma

npx prisma generate

# Executar migrações

npx prisma migrate dev
\`\`\`

### 5. Execute a aplicação

\`\`\`bash
npm run dev
\`\`\`

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

## 🏗️ Estrutura do Projeto

\`\`\`
src/
├── app/ # App Router do Next.js
│ ├── (session)/ # Rotas protegidas
│ ├── api/ # API Routes
│ └── globals.css # Estilos globais
├── components/ # Componentes reutilizáveis
│ ├── forms/ # Formulários
│ └── transactions/ # Componentes de transações
├── common/ui/ # Componentes base de UI
├── hooks/ # Custom hooks
├── lib/ # Utilitários e configurações
│ ├── actions/ # Server Actions
│ ├── schemas/ # Schemas de validação
│ └── types/ # Tipos TypeScript
└── providers/ # Providers (SWR, etc.)
\`\`\`

## 🧪 Testes

\`\`\`bash

# Executar todos os testes

npm test

# Executar linting

npm run lint

# Build de produção

npm run build
\`\`\`

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **NextAuth v5** - Autenticação
- **SWR** - Cache e sincronização de dados
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Jest** - Framework de testes

## 📦 Funcionalidades

### ✅ Implementadas

- [x] Autenticação com GitHub
- [x] CRUD de transações
- [x] Cache automático com SWR
- [x] Validação de formulários
- [x] Interface responsiva
- [x] Organização profissional de código

### 🔄 Em Desenvolvimento

- [ ] Dashboard com gráficos
- [ ] Categorias de transações
- [ ] Relatórios financeiros
- [ ] Exportação de dados
- [ ] Modo escuro/claro

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit suas mudanças (\`git commit -m 'Add: amazing feature'\`)
4. Push para a branch (\`git push origin feature/AmazingFeature\`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com ❤️ por [Seu Nome]
