# Web Player

Player React separado do admin. Exibe a playlist marcada com `showOnPlayer` no painel.

## Tecnologias

- React + TypeScript
- Vite
- Zustand
- React Router

## Requisitos

- Node.js 20+
- npm 10+

## Como rodar

```
npm install
npm run dev
```

Scripts:
- `npm run dev` — usa `VITE_USE_MOCK` de `.env.development`
- `npm run dev:mock` — dados mockados (sem API)
- `npm run dev:api` — consome a API em `http://localhost:5000/api`

Porta padrão: **5174** (admin costuma ser 5173; ambos estão no CORS do backend).

## Variáveis de ambiente

- `VITE_USE_MOCK` — `true` mock, `false` API
- `VITE_API_BASE_URL` — padrão `http://localhost:5000/api`

## Estrutura (espelha o admin, escopo menor)

```
src/
  config/       env, endpoints, tempos do player
  types/        Media, PlaylistResponse, PlaybackSnapshot
  services/     http-client, player-service (mock + api)
  mock/         dados para dev sem backend
  store/        Zustand — playlist, índice atual, refresh
  hooks/        timer de imagem
  components/   tela, mídia, estado vazio
  pages/        PlayerPage (polling)
  routes/       rota única /
```

## Fluxo

1. `PlayerPage` chama `refresh()` e repete a cada 10s (polling).
2. `PlayerService` busca `GET /playlists/active` + `GET /medias` e monta a ordem.
3. `PlayerScreen` mostra imagem (timer 8s) ou vídeo (`onEnded`).
4. Transição simples com CSS `fade-in`.

## Integração

1. Subir API: `cd backend-api && dotnet run`
2. No admin, marcar uma playlist como “exibir no player” e adicionar mídias.
3. Subir player: `npm run dev:api`
