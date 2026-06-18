# Lista de Tarefas 
# API de Tarefas

API REST para gerenciamento de tarefas com banco de dados MySQL.

## Tecnologias

- Node.js
- Express
- MySQL

## Funcionalidades

- CRUD completo de tarefas
- Dados persistidos no banco de dados
- Validação de campos obrigatórios

## Como rodar

### Instalação

```bash
npm install
```

### Configurar o banco

Crie o banco de dados no MySQL:

```sql
CREATE DATABASE api_tarefas;
USE api_tarefas;
CREATE TABLE tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    concluida BOOLEAN DEFAULT FALSE
);
```

### Rodar o servidor

```bash
node server.js
```

## Rotas

| Método | Rota         | Descrição               |
| ------ | ------------ | ----------------------- |
| GET    | /tarefas     | Listar todas as tarefas |
| GET    | /tarefas/:id | Buscar tarefa por id    |
| POST   | /tarefas     | Criar tarefa            |
| PUT    | /tarefas/:id | Atualizar tarefa        |
| DELETE | /tarefas/:id | Deletar tarefa          |
