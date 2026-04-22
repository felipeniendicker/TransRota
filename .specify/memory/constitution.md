# Constituição Técnica — TransRota

Este documento define as diretrizes, padrões e decisões técnicas do projeto TransRota.

Seu objetivo é garantir consistência, organização e qualidade ao longo do desenvolvimento.

---

# 🧭 Princípios Gerais

1. O sistema deve refletir fielmente as regras de negócio definidas nas SPECs.
2. A arquitetura deve priorizar clareza, separação de responsabilidades e manutenibilidade.
3. Alterações devem seguir o princípio de **mudança mínima segura**.
4. Nenhuma funcionalidade deve ser implementada sem alinhamento prévio com a documentação.
5. O sistema deve ser preparado para evolução futura (ex: React, JWT, integrações).

---

# 🧱 Arquitetura do Sistema

## Backend

Stack:
- Java
- Spring Boot
- MySQL

Arquitetura em camadas:
controller → service → repository → database


### Regras
- Controller não contém regra de negócio
- Service contém regras de negócio
- Repository apenas acessa dados
- Entity representa o banco
- DTO é usado na comunicação com o frontend

---

## Frontend

### Fase atual
- HTML
- CSS
- JavaScript (SPA simulada)

### Objetivo futuro
- migração para React

### Diretrizes
- manter separação por views
- evitar lógica excessiva no HTML
- centralizar comportamento em JS
- simular fluxo real do sistema

---

# 🔐 Segurança e Acesso

## Autenticação
- realizada via email e senha
- valida usuário ativo
- valida credenciais

## Autorização
- baseada em perfil:
  - CHEFE
  - COMERCIAL
  - MANUTENCAO

### Diretrizes
- backend é responsável pela validação final
- frontend controla visibilidade de telas
- regras de acesso devem ser consistentes entre as camadas

---

# 📦 Padrões de Dados

## DTO
- obrigatório para entrada e saída de dados
- não expor Entity diretamente

## Validação
- frontend: validação visual
- backend: Bean Validation

## Erros
- devem seguir padrão único via `ErrorResponseDTO`

Estrutura:
code
message
details


---

# 🗄️ Banco de Dados

## Regras
- não alterar diretamente em produção
- alterações devem ser versionadas (futuro: Flyway/Liquibase)
- manter integridade referencial

## Exclusão lógica
- todas as entidades utilizam `ativo`
- registros inativos não são exibidos por padrão

---

# 🔄 Integração Frontend ↔ Backend

## Diretrizes
- frontend deve consumir API via DTOs
- endpoints devem ser consistentes com as SPECs
- evitar dependência direta de estrutura interna das entidades

---

# 📋 Documentação

## Obrigatória
- product.md
- business-rules.md
- glossary.md
- constitution.md
- tasks.md
- methodology-status.md
- specs (plan.md)

## Regras
- toda mudança relevante deve ser refletida na documentação
- decisões pendentes devem ser registradas em `pending-decisions.md`

---

# ⚙️ Decisões Técnicas Atuais

## Implementado
- CRUD completo dos módulos
- DTO em todos os módulos
- Bean Validation
- autenticação básica
- controle por perfil
- ErrorResponseDTO
- GlobalExceptionHandler
- protótipo SPA funcional

## Não implementado (por decisão)
- Spring Security
- JWT
- integração real frontend-backend
- migration tool (Flyway/Liquibase)
- Swagger/OpenAPI

---

# 🧪 Qualidade e Testes

## Diretrizes
- validar comportamento manualmente no protótipo
- testar fluxos principais:
  - cadastro
  - edição
  - exclusão lógica
  - autenticação
  - navegação

---

# 🧩 Evolução do Projeto

## Próximos passos possíveis
- frontend em React
- integração real com backend
- autenticação com JWT
- documentação com Swagger
- versionamento de banco com Flyway

---

# 🚫 Restrições

1. Não inventar regras de negócio fora das SPECs.
2. Não alterar grandes áreas sem decisão documentada.
3. Não expor diretamente entidades do banco.
4. Não misturar responsabilidades entre camadas.
5. Não implementar funcionalidades sem validação.

---

# 🏁 Objetivo Final

Entregar um sistema que:

- represente corretamente o domínio do problema
- tenha arquitetura clara
- seja evolutivo
- seja consistente entre backend, frontend e documentação
- esteja preparado para expansão futura
