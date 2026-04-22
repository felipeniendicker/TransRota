# Regras de Negócio do Sistema

## Módulo Veículo

- RN-001 — A placa do veículo deve ser única no sistema
- RN-002 — Não é permitido cadastrar dois veículos com a mesma placa
- RN-003 — Apenas veículos ativos devem ser listados
- RN-004 — A exclusão deve ser lógica (ativo = false)
- RN-005 — Veículos excluídos não devem aparecer na listagem padrão


## Módulo Usuário

- RN-006 — O email do usuário deve ser único
- RN-007 — Não é permitido cadastrar usuários com o mesmo email
- RN-008 — Apenas usuários ativos devem ser listados
- RN-009 — A exclusão deve ser lógica (ativo = false)
- RN-010 — A senha do usuário não deve ser retornada na API
- RN-011 — Apenas usuários ativos podem realizar login


## Módulo Manutenção

- RN-012 — Toda manutenção deve estar vinculada a um veículo válido
- RN-013 — Não é permitido cadastrar manutenção com veículo inexistente
- RN-014 — Apenas manutenções ativas devem ser listadas
- RN-015 — A exclusão deve ser lógica (ativo = false)


## Autenticação (Planejada)

-## Autenticação

- RN-016 — O usuário deve informar email e senha para realizar login
- RN-017 — O sistema deve validar se o usuário existe
- RN-018 — O sistema deve validar se o usuário está ativo
- RN-019 — O sistema deve validar se a senha informada está correta
- RN-020 — O sistema deve retornar apenas dados básicos do usuário autenticado, sem expor a senha
- RN-021 — O sistema deve identificar o perfil do usuário autenticado
- RN-022 — O acesso às funcionalidades deverá ser controlado conforme perfil (evolução em andamento)