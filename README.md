# 🎬 Cineflix

Aplicação web de catálogo de filmes com sistema de autenticação (login e cadastro), desenvolvida com Next.js, React e TypeScript, consumindo dados de filmes da API pública do TMDB (The Movie Database).

## 🎯 Objetivo

Projeto desenvolvido para praticar e consolidar conceitos de desenvolvimento full-stack com o ecossistema moderno de React, incluindo:

- Criação de rotas de API (back-end) dentro do próprio Next.js (App Router)
- Autenticação de usuários com senha criptografada
- Persistência de dados com ORM e banco de dados relacional
- Componentização de interface em React com TypeScript
- Consumo de uma API externa (TMDB) para exibição de dados reais
- Estilização com Sass (SCSS) por componente

## ⚙️ O que a aplicação faz

- ✅ **Cadastro de usuário** — cria uma conta nova com e-mail e senha (senha armazenada com hash, nunca em texto puro)
- ✅ **Login** — autentica o usuário validando e-mail e senha no banco de dados
- ✅ **Catálogo de filmes** — após o login, exibe uma lista de filmes em cartaz, buscados em tempo real na API do TMDB
- ✅ **Card de filme** — cada filme mostra pôster, título, nota de avaliação (em estrelas) e uma sinopse resumida
- ✅ **Avaliação em estrelas** — converte a nota numérica do TMDB em um componente visual de estrelas cheias/vazias

## 🛠️ Tecnologias utilizadas

**Front-end:**
- [Next.js](https://nextjs.org/) 16 (App Router)
- React 19 + TypeScript
- Sass (SCSS) para estilização
- Tailwind CSS
- React Icons (ícones de estrela)
- Axios (requisições HTTP)

**Back-end:**
- Rotas de API do próprio Next.js (`app/api`)
- [Prisma](https://www.prisma.io/) como ORM
- SQLite como banco de dados
- bcryptjs para hash de senhas

**API externa:**
- [TMDB (The Movie Database)](https://www.themoviedb.org/documentation/api) — fonte dos dados dos filmes (pôsteres, sinopses, notas)

## 📁 Estrutura do projeto

```
Cineflix/
├── app/
│   ├── api/
│   │   ├── login/route.ts       # Rota de autenticação (POST)
│   │   └── cadastro/route.ts    # Rota de criação de usuário (POST)
│   ├── component/
│   │   ├── navbar/               # Barra de navegação
│   │   ├── move_list/            # Busca e lista os filmes (consome a API do TMDB)
│   │   ├── Moviecard/             # Card individual de cada filme
│   │   ├── starRatting/           # Componente de avaliação em estrelas
│   │   └── filmes/                # Componente adicional da página de filmes
│   ├── filmes/page.tsx           # Página do catálogo de filmes (pós-login)
│   └── page.tsx                  # Página de login/cadastro (rota inicial)
├── prisma/
│   ├── schema.prisma              # Modelo do banco (usuário)
│   └── migrations/                # Histórico de migrações do banco
├── types/movies.ts                # Tipagem TypeScript dos dados de filme
└── public/img/                     # Imagens estáticas (logo, banner de login)
```

## 🔌 Rotas de API

| Método | Rota             | Descrição                                             |
|--------|------------------|--------------------------------------------------------|
| POST   | `/api/cadastro`  | Cria um novo usuário (e-mail + senha, com hash)        |
| POST   | `/api/login`     | Autentica um usuário existente                         |

## 🗄️ Modelo de dados (Prisma)

```prisma
model User {
  id    Int    @id @default(autoincrement())
  nome  String
  email String @unique
  senha String
}
```

## ▶️ Como rodar o projeto

1. Instale as dependências:
   ```
   npm install
   ```
2. Configure o banco de dados (gera o `dev.db` a partir das migrações do Prisma):
   ```
   npx prisma migrate dev
   ```
3. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```
4. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 💡 Possíveis melhorias futuras

- Mover a chave da API do TMDB para uma variável de ambiente (`.env`), em vez de deixá-la fixa no código-fonte
- Adicionar sessão/autenticação persistente (ex: cookies ou JWT), já que hoje o login não mantém o usuário conectado entre acessos
- Criar uma página de detalhes para cada filme (o botão "ver mais" ainda não tem ação)
- Adicionar busca e filtros por gênero na listagem de filmes
- Implementar recuperação de senha (o link já existe na tela de login, mas ainda não é funcional)
- Tornar o campo "nome" do cadastro editável pelo usuário (hoje é fixo como "Usuário")

## 👤 Autor

Projeto desenvolvido como exercício prático de desenvolvimento full-stack com Next.js, React, TypeScript e Prisma, com foco em autenticação de usuários e consumo de API externa.
