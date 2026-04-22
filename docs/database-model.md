# Modelagem de Banco de Dados

## Tabela: VEICULO

### Campos
- id (PK, BIGINT)
- placa (VARCHAR, UNIQUE)
- modelo (VARCHAR)
- marca (VARCHAR)
- ano (INT)
- categoria (VARCHAR)
- capacidade_kg (DOUBLE)
- status (VARCHAR)
- ativo (BOOLEAN)

## Tabela: USUARIO

### Campos
- id (PK, BIGINT)
- nome (VARCHAR)
- email (VARCHAR, UNIQUE)
- senha (VARCHAR)
- perfil (VARCHAR)
- ativo (BOOLEAN)

## Tabela: MANUTENCAO

### Campos
- id (PK, BIGINT)
- veiculo_id (FK, BIGINT)
- descricao (VARCHAR)
- data_abertura (DATE)
- status (VARCHAR)
- observacao (VARCHAR)

## Relacionamentos

- Um veículo pode possuir várias manutenções
- A tabela MANUTENCAO possui chave estrangeira para VEICULO através do campo `veiculo_id`

## Regras Estruturais

- `placa` deve ser única na tabela VEICULO
- `email` deve ser único na tabela USUARIO
- `veiculo_id` deve referenciar um veículo existente