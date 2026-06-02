# Web Player

Aplicação responsável pela reprodução da playlist marcada para exibição no painel administrativo.

O player consulta periodicamente a API para identificar alterações na playlist ativa e reproduz imagens e vídeos automaticamente.

Para informações gerais sobre arquitetura e decisões técnicas do projeto, consulte o README da raiz.

## Tecnologias

* React
* TypeScript
* Vite
* Zustand
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

## Funcionalidades

* Reprodução automática de imagens
* Reprodução automática de vídeos
* Atualização periódica da playlist ativa
* Estado vazio quando não existe playlist ativa
* Transição simples entre mídias

## Estrutura

```text
src/
├── components/
├── config/
├── hooks/
├── mock/
├── pages/
├── routes/
├── services/
├── store/
└── types/
```
