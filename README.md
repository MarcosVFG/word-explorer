# Word Explorer

Um aplicativo simples que exibe palavras em inglês com suas definições. A cada carregamento da página ou clique no botão "Next Word", uma nova palavra aleatória é exibida sem repetições até que todas as palavras da lista sejam mostradas.

## Funcionalidades

- Exibe palavras em inglês com suas definições
- Botão de áudio para ouvir a pronúncia da palavra em inglês
- Ao clicar na palavra, o card vira e mostra a tradução em português-BR
- Navegação entre palavras anteriores e próximas
- Seleção aleatória de palavras sem repetição
- Interface responsiva e minimalista usando Tailwind CSS
- Mensagem quando todas as palavras forem exibidas
- Suporte a modo escuro (dark mode) com botão para alternar entre os temas

## Tecnologias Utilizadas

- React
- Next.js
- Tailwind CSS

## Como Executar Localmente

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```
   npm run dev
   ```
4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## Deploy na Vercel

1. Faça o push do código para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) e faça login
3. Clique em "New Project" e importe o repositório
4. Mantenha as configurações padrão e clique em "Deploy"
5. Após o deploy, a Vercel fornecerá uma URL para acessar o aplicativo

## Estrutura do Projeto

- `/components` - Componentes React reutilizáveis
- `/data` - Dados mockados (lista de palavras)
- `/pages` - Páginas do Next.js
- `/styles` - Arquivos CSS e configuração do Tailwind