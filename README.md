# 🚗 TransRota

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Spring](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MySQL](https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white)

Sistema completo de gerenciamento de veículos, usuários e manutenções, desenvolvido com arquitetura moderna e integração fullstack.

---

## 📌 Sobre o projeto

O **TransRota** é uma aplicação web voltada para o gerenciamento de frotas, permitindo o controle de veículos, usuários e manutenções de forma organizada.

O projeto foi desenvolvido com foco em boas práticas de desenvolvimento, separação de responsabilidades e integração entre backend e frontend.

---

## ⚙️ Tecnologias utilizadas

### 🔹 Backend
- Java
- Spring Boot
- Spring Data JPA
- MySQL
- Flyway (migração de banco)
- Swagger/OpenAPI
- Logs estruturados

### 🔹 Frontend
- React
- Vite
- JavaScript
- CSS

---

## 🧠 Funcionalidades

### 🚗 Veículos
- Cadastro de veículos
- Listagem de veículos ativos
- Edição de dados
- Desativação (exclusão lógica)

### 👤 Usuários
- Cadastro de usuários
- Controle por perfil (CHEFE, COMERCIAL, MANUTENCAO)
- Edição e desativação
- Validação de email único

### 🔧 Manutenções
- Registro de manutenção vinculada a veículo
- Atualização de status
- Visualização detalhada
- Filtro e busca

### 🔐 Autenticação
- Login com validação de credenciais
- Controle de acesso por perfil
- Rotas protegidas no frontend

---

## 🏗️ Arquitetura

O projeto segue arquitetura em camadas:

- Controller
- Service
- Repository
- DTO (Data Transfer Object)

Além disso:
- Validação com Bean Validation
- Tratamento global de erros
- Exclusão lógica com campo `ativo`

---

## 🗄️ Banco de Dados

O sistema utiliza **MySQL local**.

### Como configurar:

1. Criar banco:
```sql
CREATE DATABASE transrota_db;

2.Configurar no application.properties:
spring.datasource.url=jdbc:mysql://localhost:3306/transrota_db
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA

3. Rodar o backend:
O Flyway criará automaticamente as tabelas.

▶️ Como executar o projeto
🔹 Backend
cd backend
mvnw.cmd spring-boot:run

🔹 Frontend
cd frontend
npm install
npm run dev

Acesse:
http://localhost:5173

📊 Documentação da API
Disponível em:
http://localhost:8080/swagger-ui.html

📁 Estrutura do projeto
backend/
frontend/
docs/
prototipo/

📌 Diagrama
O projeto contém um diagrama de atividades representando o fluxo principal do sistema, disponível na pasta docs.

👨‍💻 Autor
Desenvolvido por Felipe Rafael Niendicker

📎 Observações
Este projeto foi desenvolvido para fins acadêmicos, mas segue boas práticas que permitem evolução para uso real em produção.
