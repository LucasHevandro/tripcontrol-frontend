# ✈️ TripControl — Frontend

> Planejar viagens em grupo deveria ser tão divertido quanto o destino final. O **TripControl** nasceu para acabar com planilhas confusas, contas perdidas em bloquinhos de notas e o eterno "quem vai reservar o quê?". 

Aqui está o frontend da nossa aplicação, construído com foco em uma experiência fluida, rápida e responsiva. Se você quer colaborar com o desenvolvimento ou rodar o projeto localmente, este guia foi feito especialmente para você! 🚀

---

## 🛠️ Tecnologias que utilizamos (Nossa Stack)

Escolhemos ferramentas modernas para garantir performance, facilidade de manutenção e uma ótima experiência de desenvolvimento:

- **[Next.js 16 (App Router)](https://nextjs.org/)** — Nos dá o melhor dos dois mundos: renderização rápida no servidor e navegação instantânea no cliente.
- **[React 19](https://react.dev/)** — Levando a reatividade ao próximo nível.
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática para nos dar segurança ao refatorar e reduzir bugs em produção.
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Para criar interfaces lindas, modernas e consistentes de forma ultra-rápida.
- **[TanStack React Query (v5)](https://tanstack.com/query/latest)** — Nosso gerenciador de estado assíncrono para cachear requisições, evitar buscas repetidas e lidar com loadings/erros perfeitamente.
- **[Axios](https://axios-http.com/)** — Cliente HTTP robusto para chamadas de API.
- **[Google OAuth](https://developers.google.com/identity)** — Login simplificado e seguro em um clique.

---

## 📋 Pré-requisitos para Rodar o Projeto

Antes de começar, certifique-se de ter instalado em sua máquina:

1. **Node.js v24** ou superior.
2. **Yarn v1.x** (nosso gerenciador de pacotes principal).
3. **Backend do TripControl** rodando localmente (por padrão, ele escuta na porta `http://localhost:3001/api/v1`).

---

## 🚀 Primeiros Passos (Configurando o Ambiente)

### 1. Clonando e preparando as variáveis de ambiente
Crie um arquivo chamado `.env.local` na raiz do seu projeto. Você pode usar o `.env.example` como base:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
```

> 💡 **Nota sobre o Google Login:** O `NEXT_PUBLIC_GOOGLE_CLIENT_ID` é opcional. Se você não configurá-lo de início, o app continuará funcionando perfeitamente — o botão de login social apenas ficará desativado e você poderá logar com credenciais comuns.

### 2. Instalando as dependências
Execute o comando abaixo na sua linha de comando:

```bash
yarn install
```

### 3. Rodando o servidor de desenvolvimento
Para iniciar o projeto em modo de desenvolvimento, execute:

```bash
yarn dev
```

Abra o seu navegador em [http://localhost:3000](http://localhost:3000) e pronto! A aplicação estará rodando com hot reload ativo.

---

## 📦 Scripts Úteis no Dia a Dia

Aqui estão os principais comandos do projeto que você usará com frequência:

- `yarn dev` — Inicia o servidor local de desenvolvimento.
- `yarn build` — Compila a aplicação e gera a build de produção otimizada.
- `yarn start` — Roda a build de produção localmente (execute `yarn build` antes).
- `yarn lint` — Analisa o código em busca de problemas de formatação ou boas práticas usando ESLint.
- `yarn test` — Executa nossa suíte de testes rápidos integrados nativamente com o Node.js.

---

## 📂 Organização das Pastas (Estrutura do Projeto)

Nosso código é dividido de forma lógica para manter as responsabilidades separadas e fáceis de encontrar:

*   📂 `src/app/` — É o coração do Next.js. Contém as rotas, layouts compartilhados, páginas públicas/privadas e telas de erro e carregamento (loading).
*   📂 `src/components/` — Onde residem nossos componentes visuais. Eles são agrupados por domínio (ex: `dashboard`, `despesas`, `finanças`, `participantes`, `reservas`, `roteiro`, `viagens`) ou no diretório de UI genérica.
*   📂 `src/core/domain/` — O núcleo das regras de negócio. Aqui ficam os tipos e contratos puros da aplicação que definem o formato exato das respostas da API.
*   📂 `src/infrastructure/` — Camada que lida com o "mundo externo". Contém o cliente HTTP personalizado, adaptadores de armazenamento de tokens (`localStorage`) e repositórios de dados que conversam com a API.
*   📂 `src/hooks/` — Custom hooks focados na busca e mutação de dados usando React Query.
*   📂 `src/lib/` — Funções utilitárias puras, formatadores de dados (moeda, datas), helpers de roteamento e fluxos de onboarding.
*   📂 `src/types/` — Tipagem auxiliar específica para fluxos de formulários e estados internos da UI.
*   📂 `tests/` — Testes automatizados focados na integridade da lógica de domínio e nos mapeadores de payload da API.

---

## 🔐 Autenticação e Segurança

Atualmente, o TripControl utiliza um fluxo baseado em **Access Token** e **Refresh Token**. 

- **Como funciona:** O `LocalStorageTokenAdapter` gerencia a leitura e gravação dos tokens. Ele também escreve cookies legíveis para que os middlewares do Next.js consigam proteger as rotas diretamente no lado do servidor.
- **Rotas Públicas:** `/login` e `/join/[token]` (links de convites para viagens).
- **Rotas Protegidas:** `/trips` (suas viagens) e `/profile` (dados do usuário).

> ⚠️ **Espaço para Evolução:** Como mantemos o token acessível ao JavaScript no `localStorage`, nossa meta de segurança a médio prazo é migrar totalmente para cookies `HttpOnly` controlados diretamente pelo backend, aumentando a resiliência contra ataques XSS.

---

## 🧪 Rodando os Testes

Nossos testes cobrem regras críticas de negócio para garantir que nenhuma alteração quebre o fluxo básico dos usuários. A suíte atual valida:
- Persistência e limpeza de tokens na sessão local durante o logout.
- Redirecionamentos seguros após o login.
- Processamento e validação de links de convite por token.
- Geração correta de payloads para criação de viagens, despesas, divisão financeira, reservas detalhadas e atividades do roteiro.

Para rodar todos os testes em um segundo, basta executar:

```bash
yarn test
```

---

## 🤝 Padrões de Desenvolvimento (Como Colaborar)

Para mantermos a consistência e a qualidade do código à medida que o time cresce, seguimos algumas diretrizes amigáveis:

1. **Contratos como Verdade Absoluta:** Sempre use os tipos definidos em `src/core/domain` como a única fonte da verdade para contratos com o backend. Evite criar tipos duplicados.
2. **Componentes Leves:** Prefira utilizar funções utilitárias puras (em `src/lib`) para montar payloads e lidar com validações. Isso facilita os testes e mantém nossos componentes de tela enxutos.
3. **Invalidamento Inteligente:** Ao realizar mutações de dados com o React Query, lembre-se de invalidar apenas a menor chave de cache necessária. Isso economiza requisições e melhora a experiência do usuário.
4. **Segurança de Commit:** Antes de abrir um Pull Request, certifique-se de rodar localmente:
   ```bash
   yarn lint && yarn test && yarn build
   ```
   Isso garante que o código está limpo, os testes passam e o build de produção é gerado com sucesso.

---

Feito com 💙 pelo time **TripControl**. Se tiver dúvidas ou sugestões, sinta-se à vontade para abrir uma issue ou conversar com a equipe! 😉
