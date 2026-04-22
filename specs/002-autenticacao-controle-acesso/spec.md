# SPEC-002 — Autenticação e Controle de Acesso

## Objetivo
Definir o funcionamento do módulo de autenticação e controle de acesso do sistema, garantindo que apenas usuários autorizados possam acessar e utilizar as funcionalidades disponíveis, de acordo com seu perfil.

## Contexto
O sistema TransRota necessita de um mecanismo de controle de acesso para proteger suas funcionalidades e garantir que cada usuário tenha acesso apenas às operações permitidas conforme seu papel na organização.

## Entidade Principal
Usuário

## Campos da Entidade
- id
- nome
- email
- senha
- perfil
- ativo

## Descrição da Entidade
A entidade Usuário representa os indivíduos que acessam o sistema, permitindo autenticação e controle de permissões conforme o perfil atribuído.

## Perfis de Acesso

- CHEFE
- COMERCIAL
- MANUTENCAO

## Requisitos Funcionais

### RF-001 — Realizar login
O sistema deve permitir que o usuário realize login utilizando e-mail e senha válidos.

### RF-002 — Validar credenciais
O sistema deve validar se o e-mail e a senha informados correspondem a um usuário cadastrado e ativo.

### RF-003 — Realizar logout
O sistema deve permitir que o usuário encerre sua sessão no sistema.

### RF-004 — Restringir acesso a usuários autenticados
O sistema deve impedir o acesso às funcionalidades internas sem autenticação prévia.

### RF-005 — Controlar acesso por perfil
O sistema deve controlar o acesso às funcionalidades com base no perfil do usuário.

### RF-006 — Permitir redefinição de senha (versão simplificada)
O sistema deve permitir que o usuário redefina sua senha de forma simplificada, sem necessidade de fluxo avançado com e-mail ou token.

### RF-007 — Gerenciar usuários
O sistema deve permitir que usuários com perfil CHEFE realizem o gerenciamento de usuários (criar, editar, ativar e desativar).

## Regras de Negócio

### RN-001 — Usuário deve ser ativo
Apenas usuários com `ativo = true` podem acessar o sistema.

### RN-002 — E-mail obrigatório
Todo usuário deve possuir um e-mail válido informado.

### RN-003 — E-mail único
Não pode existir mais de um usuário com o mesmo e-mail no sistema.

### RN-004 — Senha obrigatória
Todo usuário deve possuir uma senha cadastrada.

### RN-005 — Perfil obrigatório
Todo usuário deve possuir um perfil definido.

### RN-006 — Acesso baseado em perfil
As funcionalidades do sistema devem respeitar as permissões definidas para cada perfil.

## Matriz de Permissões

### Perfil: CHEFE
- cadastrar veículo
- editar veículo
- consultar veículo
- listar veículos
- desativar veículo
- visualizar manutenção
- registrar manutenção
- gerenciar usuários

### Perfil: COMERCIAL
- consultar veículo
- listar veículos
- visualizar disponibilidade
- não pode excluir veículo
- não pode gerenciar usuários
- não pode registrar manutenção técnica

### Perfil: MANUTENCAO
- consultar veículo
- listar veículos
- registrar manutenção
- atualizar status de manutenção
- não pode gerenciar usuários
- não pode excluir veículo

## Operações do Módulo

### Login
Permitir que o usuário acesse o sistema mediante credenciais válidas.

### Logout
Permitir que o usuário encerre sua sessão.

### Gerenciamento de Usuários
Permitir que usuários com perfil CHEFE cadastrem, editem e controlem o status de outros usuários.

### Recuperação de Senha
Permitir redefinição simples da senha pelo usuário.

## Critérios de Aceite

### Login
- Deve permitir acesso com credenciais válidas
- Deve negar acesso com credenciais inválidas
- Deve impedir login de usuários inativos

### Logout
- Deve encerrar a sessão do usuário corretamente

### Controle de Acesso
- Usuários não autenticados não devem acessar o sistema
- Usuários devem visualizar apenas funcionalidades permitidas pelo seu perfil

### Gerenciamento de Usuários
- Apenas perfil CHEFE pode gerenciar usuários
- Deve permitir ativar e desativar usuários

### Recuperação de Senha
- Deve permitir redefinir a senha de forma simples
- Deve atualizar a senha corretamente no sistema

## Endpoints Planejados

- POST /auth/login
- POST /auth/logout
- PUT /auth/redefinir-senha

- POST /usuarios
- GET /usuarios
- GET /usuarios/{id}
- PUT /usuarios/{id}
- DELETE /usuarios/{id}

## Dependências

- Backend em Spring Boot
- Frontend em React
- Banco de dados relacional

## Fora do Escopo desta SPEC

- autenticação com múltiplos fatores
- envio de e-mail automático
- tokens avançados de recuperação de senha
- controle avançado de sessões