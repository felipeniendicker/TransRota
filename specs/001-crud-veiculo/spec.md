# SPEC-001 — CRUD de Veículo

## Objetivo
Definir o funcionamento do módulo de gerenciamento de veículos da frota, permitindo cadastro, alteração, consulta, listagem e exclusão lógica de veículos.

## Contexto
O sistema TransRota tem como objetivo melhorar o controle da frota da empresa, centralizando informações dos veículos e permitindo seu gerenciamento de forma organizada, segura e rastreável.

## Entidade Principal
Veículo

## Campos da Entidade
- id
- placa
- modelo
- marca
- ano
- categoria
- capacidadeKg
- status
- ativo

## Descrição da Entidade
A entidade Veículo representa os veículos da frota da empresa, armazenando informações de identificação, características básicas, capacidade operacional e situação no sistema.

## Requisitos Funcionais

### RF-001 — Cadastrar veículo
O sistema deve permitir o cadastro de um novo veículo informando placa, modelo, marca, ano, categoria, capacidadeKg, status e ativo.

### RF-002 — Alterar veículo
O sistema deve permitir a atualização dos dados de um veículo já cadastrado.

### RF-003 — Consultar veículo por identificador
O sistema deve permitir a consulta de um veículo específico por id.

### RF-004 — Consultar veículo por placa
O sistema deve permitir a consulta de um veículo pela placa.

### RF-005 — Listar veículos
O sistema deve permitir a listagem dos veículos cadastrados.

### RF-006 — Listar apenas veículos ativos por padrão
O sistema deve listar apenas os veículos ativos por padrão, podendo futuramente permitir filtros adicionais.

### RF-007 — Realizar exclusão lógica de veículo
O sistema deve permitir a exclusão lógica de um veículo, alterando o campo `ativo` para `false`, sem removê-lo fisicamente do banco de dados.

## Regras de Negócio Aplicadas

### RN-001 — Placa obrigatória
Todo veículo deve possuir uma placa informada no momento do cadastro.

### RN-002 — Placa única
Não pode existir mais de um veículo com a mesma placa no sistema.

### RN-003 — Modelo obrigatório
Todo veículo deve possuir modelo informado.

### RN-004 — Marca obrigatória
Todo veículo deve possuir marca informada.

### RN-005 — Ano válido
O ano do veículo deve ser um valor numérico válido e compatível com a realidade.

### RN-006 — Categoria obrigatória
Todo veículo deve possuir uma categoria informada.

### RN-007 — Capacidade obrigatória e válida
O campo `capacidadeKg` deve ser informado e deve possuir valor maior que zero.

### RN-008 — Status obrigatório
Todo veículo deve possuir um status definido.

### RN-009 — Status com valores permitidos
O status do veículo deve respeitar apenas valores previstos pelo sistema.

Valores sugeridos:
- DISPONIVEL
- EM_ROTA
- MANUTENCAO
- BAIXADO

### RN-010 — Exclusão lógica
A exclusão de um veículo não será física. O sistema deverá apenas alterar o campo `ativo` para indicar que o veículo não está mais ativo.

## Operações do Módulo

### Cadastro de Veículo
Permitir que um novo veículo seja cadastrado no sistema.

### Alteração de Veículo
Permitir que um veículo já cadastrado tenha seus dados atualizados.

### Consulta de Veículo
Permitir buscar um veículo específico por id ou placa.

### Listagem de Veículos
Permitir visualizar os veículos cadastrados no sistema.

### Exclusão de Veículo
Permitir a desativação lógica do veículo no sistema.

## Critérios de Aceite

### Cadastro
- Deve permitir cadastrar veículo com todos os campos válidos.
- Deve impedir cadastro com placa duplicada.
- Deve validar os campos obrigatórios.

### Alteração
- Deve permitir editar os dados do veículo.
- Deve manter todas as regras de validação no momento da alteração.

### Consulta
- Deve retornar corretamente os dados do veículo consultado.
- Deve permitir consulta por id e por placa.

### Listagem
- Deve listar os veículos cadastrados.
- Deve exibir apenas veículos ativos por padrão.

### Exclusão lógica
- Deve alterar o campo `ativo` para `false`.
- O veículo não deve ser removido do banco de dados.

## Endpoints Planejados
- POST /veiculos
- GET /veiculos
- GET /veiculos/{id}
- GET /veiculos/placa/{placa}
- PUT /veiculos/{id}
- DELETE /veiculos/{id}

## Dependências
- Backend em Spring Boot
- Frontend em React
- Banco de dados relacional

## Fora do Escopo desta SPEC
- controle detalhado de vistoria
- alertas de vencimento
- relatórios gerenciais
- gestão de rotas
- manutenção avançada