# Media Player Project

Projeto do desafio técnico. São 3 partes separadas que se integram pela API:

- backend-api/ — API .NET
- frontend-admin/ — painel pra cadastrar mídias e playlists
- web-player/ — player que exibe a playlist

## Tecnologias utilizadas

### Backend
- .NET 8
- ASP.NET Core Web API

### Frontend Admin
- React + TypeScript
- Vite
- Ant Design
- Zustand
- Tailwind CSS

### Frontend Player
- React + TypeScript
- Vite

---

## Requisitos

### Backend
- .NET SDK 8+

### Frontend
- Node.js 20+
- npm 10+

---

## Como rodar

Backend:
```
cd backend-api
dotnet run
```

Admin (detalhes no README dele):
```
cd frontend-admin
npm install
npm run dev
```

Player:
```
cd web-player
npm install
npm run dev
```

---

## Fases concluídas

- Fase 1 (CRUD mídias): admin ok com mock, API ainda não
- Fase 2 (playlists): admin ok com mock, API ainda não
- Fase 3 (player): preview no admin, player separado ainda não
- Fase 4 (extras): não feito

## O que faria com mais tempo

- Terminar a API .NET
- Integrar o admin de fato com a API
- Fazer o web-player
- Upload real de arquivo
- Testes automatizados
- Polling ou websocket pra atualizar playlist
- Autenticação
