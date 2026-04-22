# Glossário — TransRota

Este documento define os principais termos utilizados no sistema TransRota, garantindo consistência conceitual entre backend, frontend e documentação.

---

## Sistema

**TransRota**  
Sistema de gestão de frota responsável pelo controle de veículos, usuários e manutenções, com autenticação e regras por perfil.

---

## Veículo

Entidade que representa um item da frota.

### Atributos principais
- placa
- modelo
- marca
- ano
- categoria
- capacidadeKg
- status
- ativo

### Regras
- placa deve ser única entre veículos ativos
- apenas veículos ativos são listados
- exclusão é lógica (`ativo = false`)

---

## Usuário

Entidade que representa uma pessoa com acesso ao sistema.

### Atributos principais
- nome
- email
- senha
- perfil
- ativo

### Regras
- email deve ser único entre usuários ativos
- apenas usuários ativos são considerados no sistema
- controle de acesso baseado em perfil

---

## Manutenção

Entidade que representa um registro de manutenção de um veículo.

### Atributos principais
- veiculoId
- placaVeiculo
- descricao
- dataAbertura
- status
- observacao
- ativo

### Regras
- deve estar vinculada a um veículo válido
- apenas manutenções ativas são listadas
- exclusão é lógica (`ativo = false`)

---

## Perfil

Define o nível de acesso de um usuário no sistema.

### Tipos
- **CHEFE**
  - acesso total
  - pode gerenciar usuários, veículos e manutenções

- **COMERCIAL**
  - acesso operacional parcial
  - pode trabalhar com veículos

- **MANUTENCAO**
  - acesso operacional
  - focado em manutenções

---

## Autenticação

Processo de validação das credenciais do usuário.

### No sistema
- realizada via email e senha
- valida:
  - existência do usuário
  - status ativo
  - senha correta

---

## Autorização

Controle de acesso baseado no perfil do usuário.

### Exemplo
- apenas CHEFE pode gerenciar usuários
- backend valida acesso aos endpoints
- frontend controla visibilidade de telas

---

## DTO (Data Transfer Object)

Objeto utilizado para transferência de dados entre frontend e backend.

### Características
- não representa diretamente a entidade do banco
- usado para entrada e saída de dados
- evita exposição direta das entidades

---

## Entity

Classe que representa uma tabela do banco de dados.

### Características
- mapeada com JPA
- contém os dados persistidos
- não deve ser exposta diretamente ao frontend

---

## Exclusão Lógica

Estratégia onde o registro não é removido do banco, mas marcado como inativo.

### Implementação
- campo `ativo = false`
- registros inativos não aparecem nas listagens padrão

---

## Status

Representa o estado atual de uma entidade.

### Veículo
- DISPONIVEL
- EM_ROTA
- MANUTENCAO
- BAIXADO

### Manutenção
- ABERTA
- EM_ANDAMENTO
- CONCLUIDA

---

## Backend

Camada responsável pelas regras de negócio e persistência.

### Tecnologias
- Java
- Spring Boot
- MySQL

---

## Frontend

Camada responsável pela interface com o usuário.

### No projeto atual
- protótipo em HTML, CSS e JavaScript

### Evolução prevista
- implementação em React

---

## Dashboard

Tela inicial do sistema que apresenta visão geral dos dados:
- veículos ativos
- usuários ativos
- manutenções ativas

---

## Protótipo

Versão visual do sistema utilizada para validar:
- layout
- fluxo
- experiência do usuário

### Características
- não integrado ao backend real
- utiliza dados simulados (mock)
- comportamento próximo do sistema final

---

## SPA (Single Page Application)

Aplicação que troca conteúdo dinamicamente sem recarregar a página.

### No protótipo
- navegação via JavaScript
- troca de views
- estrutura preparada para React

---

## Validação

Processo de garantir que os dados estão corretos antes de serem processados.

### Tipos
- frontend: validação visual/formulários
- backend: Bean Validation

---

## ErrorResponseDTO

Objeto padrão para retorno de erros no backend.

### Estrutura
- code
- message
- details

---

## GlobalExceptionHandler

Classe responsável por centralizar o tratamento de exceções no backend.

---

## Migration Tool

Ferramenta para versionamento do banco de dados.

### Exemplos
- Flyway
- Liquibase

---

## OpenAPI / Swagger

Ferramenta para documentação dos endpoints da API.

---

## React

Biblioteca JavaScript para construção de interfaces modernas.

### No projeto
- prevista como evolução do protótipo