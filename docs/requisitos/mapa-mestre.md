# Mapa Mestre de Requisitos

## Fontes Consolidadas

1. `docs/requisitos/00-originais/p1-java.txt`
2. `docs/requisitos/01-normalizados/transrota-frota.md`
3. Instruções de governança fornecidas pelo solicitante na sessão atual

## Estado Atual do Repositório

- Não há código React identificado.
- Não há código Spring Boot identificado.
- Não há scripts de banco MySQL identificados.
- Não há pasta `specs/`.
- Não havia pasta `.specify/memory/` antes desta organização inicial.
- Não há `plan.md` ou `tasks.md`.

## Escopo de Negócio Identificado

1. Gestão de disponibilidade da frota
2. Gestão de manutenção e conformidade legal
3. Gestão de capacidade dos veículos
4. Gestão de ciclo de vida dos ativos
5. Visão operacional única da frota

## Impacto Esperado por Camada

### Frontend (React)

- Telas para consulta de disponibilidade
- Tela simples para alteração de status do veículo
- Formulários com validação de dados operacionais e de manutenção
- Tratamento padronizado de erros

### Backend (Spring Boot)

- APIs para consulta e atualização do status do veículo
- Serviços com regras de bloqueio operacional
- DTOs para disponibilidade, manutenção, capacidade e ativos
- Validação com Bean Validation
- Logs estruturados nas camadas obrigatórias

### Banco (MySQL)

- Estruturas para veículo, status, manutenção e histórico
- Versionamento de mudanças com Flyway ou Liquibase
- Definição futura de constraints, procedures, functions ou triggers apenas quando especificadas

## Decisões Pendentes

1. `Decisão Pendente`: confirmar se o projeto efetivamente migrará de Java simples para a stack React + Spring Boot + MySQL ou se isso ainda é diretriz futura.
   - Origem: instruções da sessão atual

2. `Decisão Pendente`: definir se o cadastro de veículo terá exclusão lógica, desativação ou exclusão física.
   - Origem: `docs/requisitos/00-originais/p1-java.txt`

3. `Decisão Pendente`: definir quais perfis de usuário existirão e seus níveis de permissão.
   - Origem: `docs/requisitos/00-originais/p1-java.txt`

4. `Decisão Pendente`: definir se existe módulo de rotas neste escopo ou apenas bloqueio de disponibilidade para uso futuro por outro processo.
   - Origem: `docs/requisitos/00-originais/p1-java.txt`

5. `Decisão Pendente`: definir quais documentos originais adicionais existem em DOCX, MD ou PDF e ainda não foram incorporados à trilha oficial.
   - Origem: instruções da sessão atual

6. `Decisão Pendente`: definir contrato oficial de erro da API além da estrutura mínima `code`, `message`, `details`.
   - Origem: instruções da sessão atual

7. `Decisão Pendente`: definir estratégia de autenticação e o comportamento do interceptor no frontend.
   - Origem: instruções da sessão atual

8. `Decisão Pendente`: definir se logs com `correlation-id` serão mandatórios em todas as requisições ou somente em fluxos críticos.
   - Origem: instruções da sessão atual

## Bloqueios para Próxima Fase

1. Não é seguro gerar SPEC detalhada sem incorporar todos os documentos de requisitos prometidos no contexto.
2. Não é seguro gerar PLAN sem uma SPEC aprovada por fluxo.
3. Não é permitido implementar código, pois `tasks.md` ainda não existe.
