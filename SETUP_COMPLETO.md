# 📚 Documentação Completa - Setup do Projeto SaaS Financeiro

**Data:** 05 de Novembro de 2025  
**Projeto:** Sistema SaaS de Gestão Financeira com Stripe  
**Repositório:** https://github.com/fernandoiaiaia/saas-financeiro

---

## 📋 Índice

1. [Configuração do GitHub](#configuração-do-github)
2. [Configuração do Ambiente](#configuração-do-ambiente)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Dependências Instaladas](#dependências-instaladas)
5. [Banco de Dados (Prisma)](#banco-de-dados-prisma)
6. [Configurações](#configurações)
7. [Como Rodar o Projeto](#como-rodar-o-projeto)
8. [Próximos Passos](#próximos-passos)

---

## 1. Configuração do GitHub

### 1.1. Criar Repositório
- Acesse: https://github.com
- Crie um novo repositório: `saas-financeiro`
- Adicione README, .gitignore (Node), e Licença (MIT)

### 1.2. Configurar Git Local
```bash
# Configurar usuário
git config --global user.name "fernandoiaiaia"
git config --global user.email "cumeweb@icloud.com"

# Verificar versão
git --version
```

### 1.3. Autenticar com GitHub CLI
```bash
# Instalar GitHub CLI
brew install gh

# Fazer login
gh auth login
# Escolher: GitHub.com → HTTPS → Login with web browser
```

### 1.4. Clonar Repositório
```bash
cd ~/Documents/"FYNIQ SAAS"
git clone https://github.com/fernandoiaiaia/saas-financeiro.git
cd saas-financeiro
```

---

## 2. Configuração do Ambiente

### 2.1. Verificar Node.js
```bash
node --version  # v24.11.0
npm --version   # 11.6.1
```

### 2.2. Criar Estrutura de Pastas
```bash
mkdir -p src/app
mkdir -p src/components
mkdir -p src/lib
mkdir -p src/hooks
mkdir -p src/services
mkdir -p src/types
mkdir -p src/utils
mkdir -p public/images
mkdir -p prisma
```

### 2.3. Inicializar Projeto
```bash
npm init -y
```

---

## 3. Estrutura do Projeto
```
saas-financeiro/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── react-query.tsx
│   │   └── utils.ts
│   ├── hooks/
│   ├── services/
│   ├── types/
│   └── utils/
├── public/
│   └── images/
├── prisma/
│   └── schema.prisma
├── .env
├── .env.local
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.mjs
└── postcss.config.mjs
```

---

## 4. Dependências Instaladas

### 4.1. Dependências Principais
```bash
npm install next@latest react@latest react-dom@latest
npm install stripe @stripe/stripe-js
npm install @prisma/client
npm install next-auth@beta bcryptjs zod
npm install date-fns lucide-react
npm install @tanstack/react-query axios
npm install recharts
npm install clsx tailwind-merge class-variance-authority
npm install react-input-mask
npm install react-hook-form @hookform/resolvers
```

### 4.2. Dependências de Desenvolvimento
```bash
npm install -D typescript @types/react @types/node @types/react-dom
npm install -D tailwindcss @tailwindcss/postcss postcss autoprefixer
npm install -D eslint eslint-config-next
npm install -D prisma
npm install -D @types/bcryptjs
npm install -D @types/react-input-mask
```

### 4.3. Componentes UI (Radix UI)
```bash
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-select
npm install @radix-ui/react-tabs
npm install @radix-ui/react-toast
npm install @radix-ui/react-label
npm install @radix-ui/react-slot
```

---

## 5. Banco de Dados (Prisma)

### 5.1. Inicializar Prisma
```bash
npx prisma init --datasource-provider sqlite
```

### 5.2. Schema Completo
Arquivo: `prisma/schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  password      String?
  image         String?
  role          String    @default("USER")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  accounts      Account[]
  sessions      Session[]
  subscriptions Subscription[]
  transactions  Transaction[]
  companies     Company[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  
  @@unique([identifier, token])
}

model Company {
  id        String   @id @default(cuid())
  name      String
  document  String   @unique
  userId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  user         User          @relation(fields: [userId], references: [id])
  transactions Transaction[]
}

model Subscription {
  id                String   @id @default(cuid())
  userId            String
  stripeCustomerId  String   @unique
  stripeSubscriptionId String? @unique
  stripePriceId     String?
  stripeCurrentPeriodEnd DateTime?
  status            String
  plan              String
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id])
}

model Transaction {
  id          String   @id @default(cuid())
  userId      String
  companyId   String?
  type        String
  category    String
  amount      Float
  description String?
  date        DateTime
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user    User     @relation(fields: [userId], references: [id])
  company Company? @relation(fields: [companyId], references: [id])
}
```

### 5.3. Gerar e Aplicar Migrações
```bash
npx prisma generate
npx prisma db push
```

---

## 6. Configurações

### 6.1. Arquivo .env
```env
DATABASE_URL="file:./dev.db"
```

### 6.2. Arquivo .env.local
```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sua-chave-secreta-muito-forte-aqui"

# Stripe (configurar depois)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

### 6.3. tsconfig.json
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 6.4. tailwind.config.mjs
```javascript
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 6.5. postcss.config.mjs
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### 6.6. package.json (scripts)
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

## 7. Como Rodar o Projeto

### 7.1. Instalação Inicial
```bash
# Clonar repositório
git clone https://github.com/fernandoiaiaia/saas-financeiro.git
cd saas-financeiro

# Instalar dependências
npm install

# Configurar banco de dados
npx prisma generate
npx prisma db push

# Criar arquivo .env e .env.local (ver seção 6)
```

### 7.2. Desenvolvimento
```bash
# Rodar servidor de desenvolvimento
npm run dev

# Acessar: http://localhost:3000
```

### 7.3. Comandos Úteis
```bash
# Ver banco de dados
npx prisma studio

# Limpar cache do Next.js
rm -rf .next

# Atualizar Prisma Client
npx prisma generate

# Ver logs do Git
git log --oneline
```

---

## 8. Próximos Passos

### 8.1. Autenticação (Prioridade Alta)
- [ ] Configurar NextAuth.js
- [ ] Criar página de Login (`/login`)
- [ ] Criar página de Registro (`/register`)
- [ ] Implementar proteção de rotas
- [ ] Criar middleware de autenticação

### 8.2. Integração Stripe (Prioridade Alta)
- [ ] Criar conta no Stripe
- [ ] Configurar chaves de API
- [ ] Implementar checkout de assinatura
- [ ] Criar webhooks do Stripe
- [ ] Testar planos (Basic, Pro, Enterprise)

### 8.3. Dashboard (Prioridade Média)
- [ ] Criar layout do dashboard
- [ ] Implementar sidebar de navegação
- [ ] Página de visão geral
- [ ] Cards de estatísticas
- [ ] Gráficos com Recharts

### 8.4. Gestão de Empresas (Prioridade Média)
- [ ] CRUD de empresas
- [ ] Validação de CNPJ
- [ ] Listagem de empresas
- [ ] Seletor de empresa ativa

### 8.5. Transações Financeiras (Prioridade Média)
- [ ] CRUD de transações
- [ ] Filtros e busca
- [ ] Categorização
- [ ] Importação de dados (CSV/Excel)
- [ ] Exportação de relatórios

### 8.6. Relatórios e Análises (Prioridade Baixa)
- [ ] Relatório de receitas x despesas
- [ ] Gráfico de fluxo de caixa
- [ ] Projeções financeiras
- [ ] Comparativos mensais/anuais

### 8.7. Mobile (React Native) (Prioridade Baixa)
- [ ] Criar projeto React Native
- [ ] Configurar navegação
- [ ] Implementar telas principais
- [ ] Compartilhar lógica com web
- [ ] Publicar nas lojas

### 8.8. Deploy (Última etapa)
- [ ] Deploy Next.js na Vercel
- [ ] Configurar PostgreSQL (produção)
- [ ] Configurar variáveis de ambiente
- [ ] Configurar domínio customizado
- [ ] Testes em produção

---

## 9. Comandos Git Úteis
```bash
# Ver status
git status

# Adicionar arquivos
git add .

# Fazer commit
git commit -m "feat: descrição da mudança"

# Enviar para GitHub
git push origin main

# Ver histórico
git log --oneline

# Criar nova branch
git checkout -b feature/nome-da-feature

# Voltar para main
git checkout main
```

---

## 10. Tecnologias Utilizadas

### Frontend
- **Next.js 16** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones

### Backend
- **Next.js API Routes** - Endpoints
- **Prisma** - ORM
- **SQLite** (dev) / **PostgreSQL** (prod) - Banco de dados

### Autenticação
- **NextAuth.js** - Autenticação
- **bcryptjs** - Hash de senhas

### Pagamentos
- **Stripe** - Processamento de pagamentos
- **@stripe/stripe-js** - SDK JavaScript

### Utilitários
- **Zod** - Validação de schemas
- **React Hook Form** - Formulários
- **React Query** - Cache e requisições
- **Axios** - Cliente HTTP
- **date-fns** - Manipulação de datas
- **Recharts** - Gráficos

---

## 11. Estrutura de Dados

### Usuário (User)
- id, name, email, password, role
- Relações: accounts, sessions, subscriptions, transactions, companies

### Empresa (Company)
- id, name, document (CNPJ), userId
- Relações: user, transactions

### Assinatura (Subscription)
- id, userId, stripeCustomerId, status, plan
- Planos: Basic, Pro, Enterprise

### Transação (Transaction)
- id, userId, companyId, type, category, amount, description, date
- Tipos: INCOME (receita), EXPENSE (despesa)

---

## 12. Padrões de Código

### Nomenclatura
- **Componentes:** PascalCase (`UserCard.tsx`)
- **Arquivos:** kebab-case (`user-card.tsx`)
- **Funções:** camelCase (`getUserData`)
- **Constantes:** UPPER_SNAKE_CASE (`API_URL`)

### Estrutura de Componentes
```typescript
// Imports
import { useState } from 'react'

// Types
interface Props {
  title: string
}

// Component
export function MyComponent({ title }: Props) {
  const [state, setState] = useState()
  
  return <div>{title}</div>
}
```

### Commits (Conventional Commits)
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

---

## 13. Contatos e Recursos

- **GitHub:** https://github.com/fernandoiaiaia/saas-financeiro
- **Documentação Next.js:** https://nextjs.org/docs
- **Documentação Stripe:** https://stripe.com/docs
- **Documentação Prisma:** https://www.prisma.io/docs

---

**Documentação criada em:** 05/11/2025  
**Última atualização:** 05/11/2025  
**Versão:** 1.0.0

---

✨ **Projeto criado com sucesso!** ✨
