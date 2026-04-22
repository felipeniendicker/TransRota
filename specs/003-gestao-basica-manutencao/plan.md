# SPEC-003 — GESTÃO BÁSICA DE MANUTENÇÃO

## 🎯 Objetivo

Permitir o registro, acompanhamento, atualização e desativação lógica de manutenções vinculadas aos veículos da frota.

Inclui:
- cadastro de manutenção
- visualização de manutenções
- edição de manutenção
- exclusão lógica
- controle de acesso por perfil

---

## 👥 Perfis e Permissões

### CHEFE
- pode visualizar todas as manutenções
- pode cadastrar manutenção
- pode editar manutenção
- pode desativar manutenção

### MANUTENCAO
- pode visualizar manutenções
- pode cadastrar manutenção
- pode editar manutenção
- pode acompanhar status de manutenção

### COMERCIAL
- pode apenas visualizar, se essa visualização fizer sentido no fluxo operacional
- não pode cadastrar manutenção
- não pode editar manutenção
- não pode desativar manutenção

---

## 🖥️ Telas do Módulo

### 1. Tela de Listagem de Manutenções

#### Objetivo
Exibir todas as manutenções ativas cadastradas no sistema.

#### Elementos
- tabela/lista de manutenções
- botão "Cadastrar Manutenção" (visível apenas para CHEFE e MANUTENCAO)
- filtro por status
- filtro por veículo
- campo de busca por placa/descrição

#### Colunas
- Veículo (placa)
- Descrição
- Data de Abertura
- Status
- Observação

#### Ações por linha
- Editar (CHEFE e MANUTENCAO)
- Desativar (somente CHEFE)
- Visualizar detalhes

---

### 2. Tela de Cadastro de Manutenção

#### Objetivo
Registrar uma nova manutenção vinculada a um veículo existente.

#### Campos
- Veículo
- Descrição
- Data de Abertura
- Status
- Observação
- Ativo (default true)

#### Validações
- veículo obrigatório
- descrição obrigatória
- data obrigatória
- status obrigatório

#### Comportamento
- botão "Salvar"
- botão "Cancelar"
- feedback visual de sucesso ou erro

---

### 3. Tela de Edição de Manutenção

#### Objetivo
Alterar dados de uma manutenção já cadastrada.

#### Comportamento
- carregar dados existentes
- permitir alteração
- manter vínculo com veículo válido
- aplicar as mesmas validações do cadastro

---

### 4. Tela de Detalhes da Manutenção

#### Objetivo
Exibir informações completas da manutenção selecionada.

#### Informações exibidas
- Placa do veículo
- Descrição
- Data de abertura
- Status
- Observação
- Situação ativa/inativa

---

## 🔄 Fluxos de Uso

### Fluxo 1 — Cadastro de Manutenção
1. usuário acessa listagem
2. clica em "Cadastrar Manutenção"
3. seleciona veículo
4. preenche dados obrigatórios
5. sistema valida
6. envia para backend
7. backend associa a manutenção ao veículo
8. retorna sucesso
9. lista atualizada

---

### Fluxo 2 — Edição de Manutenção
1. usuário seleciona manutenção
2. sistema abre formulário com dados existentes
3. usuário altera informações
4. sistema valida
5. backend atualiza
6. retorna sucesso

---

### Fluxo 3 — Desativação
1. chefe seleciona manutenção
2. clica em "Desativar"
3. sistema altera ativo = false
4. item deixa de aparecer na listagem padrão

---

### Fluxo 4 — Consulta de Detalhes
1. usuário seleciona manutenção
2. sistema exibe detalhes completos
3. usuário analisa situação e histórico básico

---

## ⚠️ Tratamento de Erros

### Validação
Exibir mensagens como:
- "Veículo é obrigatório"
- "Descrição é obrigatória"
- "Data de abertura é obrigatória"
- "Status é obrigatório"

### Regra de negócio
- "Veículo inválido"
- "Acesso negado"

### Permissão
- bloquear visualmente ações não permitidas
- backend deve continuar validando o perfil

---

## 🔗 Integração com Backend

### Endpoints utilizados
- `POST /manutencoes`
- `GET /manutencoes`
- `GET /manutencoes/{id}`
- `PUT /manutencoes/{id}`
- `DELETE /manutencoes/{id}`

### Headers obrigatórios
- `perfil`

### Dados relevantes da resposta
- `veiculoId`
- `placaVeiculo`
- `descricao`
- `dataAbertura`
- `status`
- `observacao`
- `ativo`

---

## 🎨 Considerações de UX

- cadastro simples e direto
- seleção de veículo por lista/dropdown, evitando digitação manual de ID
- status com destaque visual
- ações rápidas por linha
- mensagens claras de erro e sucesso
- responsividade para desktop e mobile

---

## 📌 Observações

- toda manutenção deve estar vinculada a um veículo válido
- o frontend deve respeitar o perfil do usuário logado
- o backend continua como fonte final de autorização
- o protótipo deve transmitir sensação de controle operacional real