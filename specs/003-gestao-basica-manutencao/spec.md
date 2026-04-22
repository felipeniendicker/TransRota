# SPEC-003 — Gestão Básica de Manutenção

## Objetivo
Definir o funcionamento do módulo de gestão básica de manutenção dos veículos, permitindo registrar, consultar e acompanhar manutenções realizadas na frota.

## Contexto
O sistema TransRota precisa controlar a manutenção dos veículos para garantir sua disponibilidade e segurança operacional. Este módulo permite registrar ocorrências de manutenção e acompanhar seu status.

## Entidade Principal
Manutenção

## Campos da Entidade
- id
- veiculoId
- descricao
- dataAbertura
- status
- observacao

## Descrição da Entidade
A entidade Manutenção representa registros de manutenção associados a veículos da frota, permitindo acompanhar o histórico de intervenções e o estado atual de cada manutenção.

## Requisitos Funcionais

### RF-001 — Registrar manutenção
O sistema deve permitir registrar uma nova manutenção vinculada a um veículo.

### RF-002 — Consultar manutenção
O sistema deve permitir consultar uma manutenção específica pelo seu identificador.

### RF-003 — Listar manutenções
O sistema deve permitir listar todas as manutenções cadastradas.

### RF-004 — Atualizar status da manutenção
O sistema deve permitir atualizar o status de uma manutenção.

### RF-005 — Vincular manutenção a veículo
Toda manutenção deve estar obrigatoriamente vinculada a um veículo existente.

### RF-006 — Restringir registro de manutenção por perfil
Apenas usuários com perfil MANUTENCAO ou CHEFE podem registrar manutenção.

## Regras de Negócio

### RN-001 — Manutenção obrigatoriamente vinculada a veículo
Não é permitido cadastrar manutenção sem um veículo válido.

### RN-002 — Descrição obrigatória
Toda manutenção deve possuir uma descrição informando o problema ou serviço realizado.

### RN-003 — Data de abertura obrigatória
Toda manutenção deve possuir uma data de abertura.

### RN-004 — Status obrigatório
Toda manutenção deve possuir um status definido.

### RN-005 — Status com valores permitidos
O status da manutenção deve respeitar apenas valores previstos pelo sistema.

Valores sugeridos:
- ABERTA
- EM_ANDAMENTO
- CONCLUIDA

### RN-006 — Controle por perfil
A criação e atualização de manutenção devem respeitar as permissões do perfil do usuário.

### RN-007 — Impacto no status do veículo
Um veículo em manutenção pode ter seu status alterado para "MANUTENCAO".

## Operações do Módulo

### Cadastro de Manutenção
Permitir o registro de uma nova manutenção associada a um veículo.

### Consulta de Manutenção
Permitir buscar uma manutenção específica.

### Listagem de Manutenções
Permitir visualizar todas as manutenções registradas.

### Atualização de Manutenção
Permitir atualizar o status e observações da manutenção.

## Critérios de Aceite

### Cadastro
- Deve permitir registrar manutenção com dados válidos
- Deve impedir cadastro sem veículo vinculado
- Deve validar campos obrigatórios

### Consulta
- Deve retornar corretamente os dados da manutenção

### Listagem
- Deve listar todas as manutenções registradas

### Atualização
- Deve permitir alterar status da manutenção
- Deve manter consistência dos dados

### Permissões
- Apenas usuários autorizados devem registrar manutenção
- Deve respeitar regras de acesso por perfil

## Endpoints Planejados

- POST /manutencoes
- GET /manutencoes
- GET /manutencoes/{id}
- PUT /manutencoes/{id}

## Dependências

- Backend em Spring Boot
- Frontend em React
- Banco de dados relacional
- Módulo de veículos (SPEC-001)
- Módulo de autenticação (SPEC-002)

## Fora do Escopo desta SPEC

- manutenção preventiva automática
- alertas de manutenção
- controle de peças e custos
- integração com fornecedores
- histórico avançado de auditoria