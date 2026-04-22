# SPEC-001 — VEÍCULOS

## 🎯 Objetivo

Permitir o gerenciamento completo da frota de veículos da empresa, incluindo:
- cadastro
- visualização
- edição
- exclusão lógica

Garantindo controle por perfil e integridade dos dados.

---

## 👥 Perfis e Permissões

### CHEFE
- pode cadastrar veículos
- pode editar veículos
- pode visualizar todos os veículos
- pode desativar veículos

### COMERCIAL
- pode cadastrar veículos
- pode editar veículos
- pode visualizar veículos

### MANUTENCAO
- pode apenas visualizar veículos
- não pode cadastrar
- não pode editar
- não pode excluir

---

## 🖥️ Telas do Módulo

### 1. Tela de Listagem de Veículos

#### Objetivo
Exibir todos os veículos ativos cadastrados.

#### Elementos
- tabela/lista de veículos
- botão "Cadastrar Veículo" (visível apenas para CHEFE e COMERCIAL)
- campo de busca (placa/modelo)
- filtro por status (DISPONIVEL, EM_USO, etc.)

#### Colunas da tabela
- Placa
- Modelo
- Marca
- Ano
- Categoria
- Capacidade (Kg)
- Status

#### Ações por linha
- Editar (CHEFE e COMERCIAL)
- Desativar (somente CHEFE)

---

### 2. Tela de Cadastro de Veículo

#### Objetivo
Cadastrar um novo veículo no sistema.

#### Campos
- Placa
- Modelo
- Marca
- Ano
- Categoria
- CapacidadeKg
- Status
- Ativo (default true)

#### Validações
- todos os campos obrigatórios (exceto ativo default)
- placa não pode ser duplicada
- validação visual em tempo real

#### Comportamento
- botão "Salvar"
- botão "Cancelar"
- feedback de sucesso ou erro

---

### 3. Tela de Edição de Veículo

#### Objetivo
Editar dados de um veículo existente.

#### Comportamento
- carregar dados existentes
- permitir alteração dos campos
- aplicar mesmas validações do cadastro

---

## 🔄 Fluxos de Uso

### Fluxo 1 — Cadastro de Veículo
1. usuário acessa listagem
2. clica em "Cadastrar Veículo"
3. preenche formulário
4. envia dados
5. sistema valida
6. salva no backend
7. retorna sucesso
8. lista atualizada

---

### Fluxo 2 — Edição
1. usuário clica em "Editar"
2. formulário abre com dados
3. usuário altera
4. salva
5. sistema valida
6. atualiza no backend

---

### Fluxo 3 — Exclusão Lógica
1. usuário clica em "Desativar"
2. sistema marca ativo = false
3. item some da listagem

---

## ⚠️ Tratamento de Erros

### Validação
Exibir mensagens:
- "Placa é obrigatória"
- "Modelo é obrigatório"
- etc.

### Regras de negócio
- "Placa já cadastrada"

### Permissão
- exibir mensagem: "Acesso negado"

---

## 🔗 Integração com Backend

### Endpoints utilizados

- `POST /veiculos`
- `GET /veiculos`
- `GET /veiculos/{id}`
- `PUT /veiculos/{id}`
- `DELETE /veiculos/{id}`

### Headers obrigatórios
- `perfil`

---

## 🎨 Considerações de UX

- interface limpa e moderna
- feedback visual claro
- botões desabilitados conforme perfil
- responsividade (mobile e desktop)
- loading states ao chamar API

---

## 📌 Observações

- dados devem refletir exatamente o backend
- perfis devem ser respeitados também no frontend
- evitar ações não permitidas mesmo que backend já valide