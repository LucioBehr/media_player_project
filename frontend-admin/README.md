# Frontend Admin

Painel pra CRUD de mídias e playlists. Por enquanto roda com dados mockados, mas já está preparado pra consumir a API

## Tecnologias

- React + TypeScript
- Vite
- Ant Design
- Zustand
- Tailwind CSS
- React Router

## Requisitos

- Node.js 20+
- npm 10+

## Como rodar

```
npm install
npm run dev
```

Outros scripts:
- npm run dev - usa VITE_USE_MOCK de .env.development
- npm run dev:mock — força mock
- npm run dev:api — força API

## Variáveis de ambiente

Arquivos:
- .env.development — usado no dev (mock ligado)
- .env.production — build de produção
- .env.test — testes

Variáveis:
- VITE_USE_MOCK — true usa mock, false usa API
- VITE_API_BASE_URL — url da API (padrão http://localhost:5000/api)

## O que tem no admin

Mídias:
- listar, criar, editar, excluir
- upload de imagem/vídeo no cadastro
- busca na listagem
- preview de imagem/vídeo
- layout responsivo

Playlists:
- criar, editar, excluir
- adicionar/remover mídias
- opção "exibir no player" (showOnPlayer)

## Decisões técnicas

Separei a comunicação com backend em services (media-service e playlist-service). Tem versão mock e versão api, escolhida pelo VITE_USE_MOCK.

O Zustand guarda os dados em cache local. Na inicialização chama loadMedias() e loadPlaylists() pelos services.

Separei os tipos: entidade, formulário e DTO da API (MediaResponse, CreateMediaRequest, etc).

O upload de mídia usa arquivo (FormData). No mock, gera uma URL local pra exibição. Com a API, o backend salva o arquivo e devolve a URL.

Os mocks ficam só na camada de services, componentes não importam mock direto.

## Integração com API

Quando a API estiver rodando:
```
npm run dev:api
```