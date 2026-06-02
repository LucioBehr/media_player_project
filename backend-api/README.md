# Backend API

API REST responsável pelo gerenciamento de mídias e playlists.

A API é utilizada tanto pelo painel administrativo quanto pelo player.

Para informações gerais sobre arquitetura e decisões técnicas do projeto, consulte o README da raiz.

## Tecnologias

* .NET 8
* ASP.NET Core Web API
* Entity Framework Core
* SQLite

## Requisitos

* .NET SDK 8+

## Como rodar

```bash
dotnet run
```

## Endereços

```text
API: http://localhost:5000
Swagger: http://localhost:5000/swagger
```

## Funcionalidades

### Mídias

* Criar mídia
* Listar mídias
* Atualizar mídia
* Excluir mídia
* Upload de imagens e vídeos

### Playlists

* Criar playlist
* Listar playlists
* Atualizar playlist
* Excluir playlist
* Adicionar mídias
* Remover mídias
* Obter playlist ativa para reprodução

## Banco de dados

O projeto utiliza SQLite.

O banco é criado automaticamente durante a inicialização da aplicação.

Os arquivos enviados por upload são armazenados na pasta:

```text
Medias/
```

## Estrutura

```text
backend-api/
├── Controllers/
├── Data/
├── DTOs/
├── Entities/
├── Helpers/
├── Migrations/
├── Properties/
└── Services/
```

## Migrations

Criar nova migration:

```bash
dotnet ef migrations add NomeDaMigration
```
