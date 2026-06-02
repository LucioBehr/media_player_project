# Frontend Admin

Painel administrativo responsável pelo gerenciamento de mídias e playlists.

A aplicação consome a API do projeto e permite:

* Criar, editar e excluir mídias
* Fazer upload de imagens e vídeos
* Criar, editar e excluir playlists
* Associar e remover mídias de playlists
* Definir qual playlist será exibida no player

Para informações gerais sobre arquitetura e decisões técnicas do projeto, consulte o README da raiz.

## Tecnologias

* React
* TypeScript
* Vite
* Ant Design
* Zustand
* Tailwind CSS
* React Router

## Requisitos

* Node.js 20+
* npm 10+

## Como rodar

```bash
npm install
npm run dev
```

## Variáveis de ambiente

```env
VITE_USE_MOCK=false
VITE_API_BASE_URL=http://localhost:5000/api
```

## Scripts

```bash
npm run dev
```

Utiliza a configuração definida em `.env.development`.

```bash
npm run dev:mock
```

Força utilização de dados mockados.

```bash
npm run dev:api
```

Força utilização da API.

## Estrutura

```text
src/
├── components/
├── config/
├── mock/
├── pages/
├── routes/
├── services/
├── store/
└── types/
```
