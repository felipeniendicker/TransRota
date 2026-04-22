# SPEC-002 — USUÁRIOS E AUTENTICAÇÃO

## 🎯 Objetivo

Gerenciar os usuários do sistema e controlar o acesso com base em perfil.

Inclui:
- cadastro de usuários
- login no sistema
- controle de permissões por perfil

---

## 👥 Perfis do Sistema

### CHEFE
- acesso total ao sistema
- pode cadastrar usuários
- pode visualizar usuários
- pode editar usuários
- pode desativar usuários

### COMERCIAL
- acesso parcial
- não pode cadastrar usuários
- não pode editar usuários
- pode utilizar funcionalidades operacionais

### MANUTENCAO
- acesso operacional
- não pode cadastrar usuários
- não pode editar usuários
- pode acessar manutenção e visualizar veículos

---

## 🔐 Autenticação

### Tela de Login

#### Objetivo
Permitir que o usuário acesse o sistema com email e senha.

#### Campos
- Email
- Senha

#### Validações
- email obrigatório
- email válido
- senha obrigatória

#### Comportamento
- botão "Entrar"
- validação antes de enviar
- chamada ao backend (`POST /auth/login`)
- em caso de sucesso:
  - armazenar dados do usuário (simulado no front)
  - redirecionar para dashboard
- em caso de erro:
  - exibir mensagem "Credenciais inválidas"

---

## 🖥️ Telas do Módulo

### 1. Tela de Login

#### Elementos
- input de email
- input de senha
- botão de login
- mensagem de erro

---

### 2. Tela de Listagem de Usuários (apenas CHEFE)

#### Objetivo
Permitir visualização e gestão de usuários.

#### Elementos
- tabela de usuários
- botão "Cadastrar Usuário"
- busca por nome/email

#### Colunas
- Nome
- Email
- Perfil
- Status (ativo/inativo)

#### Ações
- Editar
- Desativar

---

### 3. Tela de Cadastro de Usuário

#### Campos
- Nome
- Email
- Senha
- Perfil (CHEFE, COMERCIAL, MANUTENCAO)
- Ativo

#### Validações
- todos obrigatórios
- email válido
- senha obrigatória
- perfil obrigatório

---

### 4. Tela de Edição de Usuário

#### Comportamento
- carregar dados existentes
- permitir alteração
- validar antes de salvar

---

## 🔄 Fluxos de Uso

### Fluxo 1 — Login
1. usuário acessa tela de login
2. preenche email e senha
3. sistema valida
4. envia para backend
5. backend valida credenciais
6. retorna sucesso ou erro
7. usuário entra no sistema

---

### Fluxo 2 — Cadastro de Usuário (CHEFE)
1. acessa listagem
2. clica em "Cadastrar"
3. preenche dados
4. sistema valida
5. envia ao backend
6. backend salva
7. retorna sucesso

---

### Fluxo 3 — Edição
1. chefe seleciona usuário
2. edita dados
3. salva
4. sistema valida
5. backend atualiza

---

### Fluxo 4 — Desativação
1. chefe clica em desativar
2. sistema altera ativo = false
3. usuário não aparece mais na lista

---

## ⚠️ Tratamento de Erros

### Login
- "Credenciais inválidas"

### Validação
- "Email inválido"
- "Senha é obrigatória"
- etc.

### Permissão
- "Acesso negado"

---

## 🔗 Integração com Backend

### Endpoints

- `POST /auth/login`
- `POST /usuarios`
- `GET /usuarios`
- `PUT /usuarios/{id}`
- `DELETE /usuarios/{id}`

### Headers
- `perfil`

---

## 🎨 Considerações de UX

- login simples e direto
- mensagens de erro claras
- controle de acesso no frontend baseado no perfil
- esconder funcionalidades não permitidas
- manter consistência visual com outros módulos

---

## 📌 Observações

- sistema deve respeitar perfis no backend e frontend
- dados do usuário logado devem ser mantidos na sessão (simulado no protótipo)