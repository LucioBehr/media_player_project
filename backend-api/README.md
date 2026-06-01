# Backend API

API REST pra mídias e playlists. Integra com o frontend-admin e o web-player.

## Tecnologias

- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- SQLite

## Requisitos

- .NET SDK 8+

## Como rodar

```
dotnet run
```

Na primeira execução o banco SQLite (`media-player.db`) é criado sozinho — não precisa rodar migration manual.

- API: http://localhost:5000
- Swagger (dev): http://localhost:5000/swagger

## Configuração

Connection string em `appsettings.json`:

- `DefaultConnection` — aponta pro arquivo `media-player.db` na pasta do projeto

Uploads de mídia ficam em `Medias/` (pasta ignorada no git, só o `.gitkeep` vai pro repositório).

## O que tem na API

Mídias (`/api/medias`):
- listar, criar, atualizar, excluir
- upload via `multipart/form-data` ou URL via JSON
- arquivos em `Medias/`, servidos em `/medias/files/{nome}`

Playlists (`/api/playlists`):
- listar, criar, atualizar, excluir
- adicionar/remover mídia (`POST/DELETE .../medias`)
- playlist ativa pro player (`GET /api/playlists/active`)
- só uma playlist com `showOnPlayer` por vez

## Decisões técnicas

Usei SQLite pra simplificar o setup local — um arquivo `.db` sem instalar servidor.

O `Program.cs` chama `Migrate()` na inicialização. Quem clona o repo só precisa do `dotnet run`.

Arquivos de mídia não vão pro banco, só metadados (`FileName`, etc). O arquivo físico fica em `Medias/` e é servido em `/medias/files`.

JSON em camelCase pra bater com o TypeScript do admin (`showOnPlayer`, `mediaIds`, etc).

CORS liberado pra `localhost:5173` e `5174` (Vite do admin e do player).

Pra criar nova migration depois de mudar entidades: instalar `dotnet-ef` (`dotnet tool install --global dotnet-ef`) e rodar `dotnet ef migrations add Nome`.

## Integração com o admin

Com a API rodando:

```
cd ../frontend-admin
npm run dev:api
```

O admin usa `VITE_API_BASE_URL` (padrão `http://localhost:5000/api`).
