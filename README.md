# Media Player Project

Projeto desenvolvido como desafio técnico para gerenciamento e reprodução de mídias.

O sistema foi dividido em 3 aplicações independentes:

* backend-api — API .NET responsável pelo gerenciamento de mídias e playlists
* frontend-admin — painel React para cadastro e organização de mídias e playlists
* web-player — player React responsável pela reprodução da playlist selecionada

## Arquitetura

O projeto foi dividido em três aplicações com responsabilidades específicas.

Além da separação entre backend, painel administrativo e player, também busquei aplicar modularidade dentro de cada aplicação. A ideia foi manter responsabilidades isoladas sempre que possível, separando componentes, gerenciamento de estado, comunicação com API, tipos e regras de negócio em estruturas próprias.

O primeiro módulo desenvolvido foi o frontend-admin. A escolha foi intencional, pois além de representar a parte mais complexa do desafio, ele também ajudou a definir a estrutura dos dados, os fluxos de navegação e os endpoints que posteriormente seriam implementados no backend. Embora o backend seja o ponto central de comunicação do sistema, desenvolver o painel primeiro facilitou a visualização das necessidades do projeto.

Durante o desenvolvimento inicial, o frontend utilizava dados mockados. Para facilitar os testes de interface e gerenciamento de estado antes da existência da API, optei por trabalhar temporariamente com mídias acessadas por URL. A ideia era simular um comportamento próximo ao que seria utilizado posteriormente pela aplicação real.

Conforme o backend foi sendo implementado, percebi que essa abordagem se afastava dos requisitos do desafio, que exigiam upload de arquivos. Por isso, o fluxo foi revisado para trabalhar exclusivamente com upload. A mudança exigiu alterações tanto no frontend quanto no backend, mas resultou em uma implementação mais simples e alinhada ao objetivo do projeto.

No backend, o foco principal foi disponibilizar persistência de dados e endpoints para consumo pelos frontends.

Já o web-player possui uma responsabilidade bastante específica: reproduzir automaticamente as mídias da playlist ativa. Para atualização dos dados foi utilizado polling periódico, por ser uma solução simples e suficiente para o escopo do desafio. Havia a intenção de implementar atualização em tempo real via WebSocket, mas a limitação de tempo não permitiu sua conclusão.

## Escolha de Tecnologias

### Criação do projeto

Após uma breve pesquisa, optei por utilizar Vite para criação das aplicações React. Atualmente ele é amplamente utilizado pela comunidade e oferece uma experiência de desenvolvimento rápida e simples.

### Design, layout e responsividade

O Ant Design foi utilizado como biblioteca principal de componentes por ser a biblioteca mencionada na descrição do desafio e também utilizada pela empresa.

O Tailwind CSS foi utilizado como complemento para organização de layout, espaçamento e responsividade, permitindo adaptar as páginas para diferentes tamanhos de tela sem necessidade de criar muito CSS manualmente.

### Gerenciamento de estado

Após pesquisar as opções sugeridas pelo desafio, optei por utilizar Zustand. A escolha foi motivada principalmente pela simplicidade da biblioteca, curva de aprendizado reduzida e facilidade de integração com TypeScript. Para o tamanho do projeto, atendeu bem às necessidades sem adicionar complexidade desnecessária.

## Tecnologias Utilizadas

### Backend

* .NET 8
* ASP.NET Core Web API
* Entity Framework Core
* SQLite

### Frontend Admin

* React
* TypeScript
* Vite
* Ant Design
* Zustand
* Tailwind CSS

### Frontend Player

* React
* TypeScript
* Vite
* Zustand

## Requisitos

### Backend

* .NET SDK 8+

### Frontend

* Node.js 20+
* npm 10+

## Como Rodar

### Backend

```bash
cd backend-api
dotnet run
```

### Frontend Admin

```bash
cd frontend-admin
npm install
npm run dev
```

### Web Player

```bash
cd web-player
npm install
npm run dev
```

## Fases Concluídas

### Fase 1 - CRUD de Mídias

* Cadastro de mídias
* Listagem de mídias
* Edição de mídias
* Exclusão de mídias
* Upload de imagens e vídeos

### Fase 2 - Playlists

* Cadastro de playlists
* Listagem de playlists
* Edição de playlists
* Exclusão de playlists
* Associação e remoção de mídias
* Controle de exibição no player

### Fase 3 - Player Preview

* Reprodução de imagens
* Reprodução de vídeos
* Consumo da playlist ativa
* Atualização automática da visualização

### Fase 4 - Diferenciais Técnicos

* Polling automático para atualização da playlist
* Responsividade
* Transição simples entre mídias (fade-in)

## O Que Faria Com Mais Tempo

* Implementação de WebSocket para atualização em tempo real, com fallback para polling
* Testes unitários
* Testes de integração
* Testes end-to-end
* Estrutura de mocks para as três aplicações
* Melhor tratamento para arquivos corrompidos ou indisponíveis
* Melhor feedback visual para erros de upload
* Melhorias de design no painel administrativo e no player
* Implementação de autenticação via JWT
