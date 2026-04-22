# Produto — Sistema de Gestão de Veículos e Manutenção

## Visão Geral

O sistema tem como objetivo gerenciar veículos, usuários e manutenções, permitindo controle operacional básico com foco em organização, rastreabilidade e manutenção preventiva/corretiva.

O sistema foi desenvolvido seguindo arquitetura em camadas (Spring Boot) e está estruturado para futura evolução com autenticação, frontend e recursos avançados.

---

## Objetivo do Sistema

Fornecer uma solução para:

- Cadastro e gerenciamento de veículos
- Controle de usuários com perfis distintos
- Registro e acompanhamento de manutenções
- Organização das operações de forma estruturada e escalável

---

## Módulos do Sistema

### 1. Gestão de Veículos
Permite:
- Cadastro de veículos
- Atualização de dados
- Consulta por ID
- Listagem de veículos ativos
- Exclusão lógica (inativação)

Regras:
- Placa deve ser única
- Veículos inativos não aparecem na listagem padrão

---

### 2. Gestão de Usuários
Permite:
- Cadastro de usuários
- Atualização de dados
- Consulta por ID
- Listagem de usuários ativos
- Exclusão lógica (inativação)

Perfis:
- CHEFE
- COMERCIAL
- MANUTENCAO

Regras:
- Email deve ser único
- Senha não é exposta nas respostas da API
- Apenas usuários ativos devem ser considerados válidos para acesso

---

### 3. Gestão de Manutenção
Permite:
- Registro de manutenção vinculada a um veículo
- Atualização de dados da manutenção
- Consulta por ID
- Listagem de manutenções ativas
- Exclusão lógica (inativação)

Regras:
- Toda manutenção deve estar vinculada a um veículo válido
- Manutenção não pode existir sem veículo
- Apenas manutenções ativas aparecem na listagem padrão

---

## Arquitetura Técnica

### Backend
- Java + Spring Boot
- Arquitetura em camadas:
  - Controller
  - Service
  - Repository
  - Database

### Banco de Dados
- MySQL
- Relacionamento entre entidades (Manutenção → Veículo)

### Padrões adotados
- Uso de DTO para entrada e saída (Usuário e Manutenção)
- Separação entre entity e DTO
- Exclusão lógica (campo `ativo`)
- Validação de regras de negócio no Service
- Uso de `ResponseEntity` para respostas HTTP

---

## Estado Atual do Produto

O sistema atualmente possui:

- Backend funcional completo para os três módulos principais
- Integração com banco de dados
- Regras de negócio básicas implementadas
- Estrutura pronta para autenticação
- Preparação para frontend e prototipação
- Autenticação básica implementada com login por email e senha

---

## Próximas Evoluções

- Evolução da autenticação básica já implementada
- Implementação de regras de acesso por perfil
- Evolução futura para controle de sessão/token
- Controle de acesso por perfil
- Implementação de validação com Bean Validation
- Padronização de erros da API
- Documentação com Swagger/OpenAPI
- Versionamento de banco com Flyway
- Desenvolvimento de frontend (React ou protótipo HTML/CSS/JS)
- Evolução para arquitetura mais robusta (Spring Security, JWT)

---

## Observações

O sistema foi desenvolvido com foco em aprendizado e evolução incremental, permitindo expansão futura para um projeto mais completo, como um PFC ou aplicação real.