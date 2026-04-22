# Entidade Principal do Sistema

## Nome da Entidade
Veículo

## Descrição
A entidade Veículo representa os veículos da frota da empresa, armazenando informações de identificação, características básicas e situação operacional no sistema.

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

## Observações
- O campo `id` será a chave primária da entidade.
- O campo `placa` será único no sistema, não podendo haver duplicidade.
- O campo `ativo` será usado para exclusão lógica.
- O campo `capacidadeKg` foi incluído por ser relevante ao controle da frota.

## Escopo Inicial da Entidade
O escopo inicial da implementação contempla apenas os dados essenciais para o CRUD de veículos, permitindo cadastro, alteração, consulta, listagem e exclusão lógica.

## Requisitos Fora do Escopo Inicial
- controle detalhado de vistoria
- alertas de vencimento de vistoria
- controle avançado de manutenção
- gestão de rotas
- relatórios gerenciais