# ✈️ TripControl — Frontend

> **Viagens em grupo sem estresse, planilhas confusas ou cobranças desconfortáveis.**

O **TripControl** nasceu para resolver uma dor que quase todo mundo já passou: organizar uma viagem com amigos ou família e se perder no meio de notas fiscais, prints no WhatsApp, quem pagou o quê e quem vai reservar a hospedagem.

Este repositório contém o frontend da plataforma — uma aplicação web moderna, rápida e pensada para ser fácil e agradável de usar, tanto no computador quanto no celular. 📱✨

---

## ✨ O que você encontra por aqui

- 🗺️ **Roteiro organizado:** Atividades do dia a dia com horários, status e locais.
- 💰 **Finanças e divisão justa:** Registro de despesas com cálculo automático de saldos e acertos entre participantes.
- 🏨 **Central de reservas:** Acomodações, voos, transfers e passeios reunidos em um só lugar.
- 👥 **Gestão de participantes:** Convide amigos com um link direto e acompanhe quem já confirmou presença.
- 🌓 **Tema claro e escuro:** Interface visual confortável para qualquer hora do dia.

---

## 🚀 Como rodar o projeto localmente

### 1. Pré-requisitos
- **Node.js** (versão 20 ou superior)
- **Yarn** instalado
- **Backend do TripControl** rodando (por padrão em `http://localhost:3001/api/v1`)

### 2. Configurando o ambiente
Crie um arquivo `.env.local` na raiz do projeto (você pode se basear no `.env.example`):

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
```

> 💡 *Dica:* O Google Client ID é opcional no ambiente local. Caso não configure agora, você ainda poderá navegar e fazer login normalmente com email e senha.

### 3. Instalando e rodando

```bash
# 1. Instale as dependências
yarn install

# 2. Inicie o servidor de desenvolvimento
yarn dev
```

Pronto! Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver o app funcionando. 🎉

---

## 🛠️ Tecnologias que usamos

- **[Next.js 16](https://nextjs.org/)** (App Router & Turbopack)
- **[React 19](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS 4](https://tailwindcss.com/)**
- **[TanStack Query v5](https://tanstack.com/query/latest)** (cache e gerenciamento de estado assíncrono)
- **[Axios](https://axios-http.com/)**
- **[Lucide Icons](https://lucide.dev/)**

---

## 📁 Estrutura das pastas

Para manter o código organizado e fácil de navegar:

```text
src/
├── app/             # Rotas, páginas e layouts da aplicação (Next.js App Router)
├── components/      # Componentes de interface organizados por contexto (dashboard, viagens, perfil, etc.)
├── contexts/        # Contextos globais (tema, usuário, toasts)
├── core/domain/     # Tipos e contratos de negócio da aplicação
├── hooks/           # Custom hooks para chamadas de API com React Query
├── infrastructure/  # Repositórios HTTP, cliente Axios e adaptadores de autenticação
├── lib/             # Formatadores (BRL, datas), avatares e funções utilitárias
└── types/           # Tipagens auxiliares para formulários e telas
```

---

## 📦 Comandos úteis

| Comando | O que faz |
| :--- | :--- |
| `yarn dev` | Inicia o projeto em modo de desenvolvimento |
| `yarn test` | Executa os testes automatizados |
| `yarn lint` | Roda a verificação de boas práticas e padronização de código |
| `yarn build` | Gera a versão otimizada para produção |
| `yarn start` | Roda a versão de produção localmente |

---

## 💬 Contribuindo & Feedback

Ideias, melhorias e correções são sempre bem-vindas! Sinta-se livre para abrir uma issue ou mandar um pull request.

Feito com 💙 para descomplicar viagens. Boas viagens e bom código! 🏖️🎒
