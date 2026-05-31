const express = require('express')
const mysql = require('mysql2/promise')
const app = express()
const PORT = 3000

app.use(express.json())

let db

async function iniciar() {
    // Conecta ao banco
    db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'api_tarefas'
    })

    console.log('Conectado ao banco de dados!')

    // Só sobe o servidor depois que conectar
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`)
    })
}

// Suas rotas vão aqui

app.post('/tarefas', async (req, res) => {
    const titulo = req.body.titulo
    const descricao = req.body.descricao

    if (!titulo) {
        return res.status(400).json({ mensagem: 'O título é obrigatório' })
    }

    const [resultado] = await db.execute(
        'INSERT INTO tarefas (titulo, descricao) VALUES (?,?)',
        [titulo, descricao]
    )

    // depois do INSERT, busca a tarefa pelo id gerado
    const [tarefas] = await db.execute(
        'SELECT * FROM tarefas WHERE id = ?',
        [resultado.insertId]
    )

    res.status(201).json(tarefas[0])
})

app.get('/tarefas', async (req, res) => {

    const [tarefas] = await db.execute(
        'SELECT * FROM tarefas'
    )
    res.json(tarefas)
})

app.get('/tarefas/:id', async (req, res) => {
    const id = Number(req.params.id)


    const [tarefas] = await db.execute(
        'SELECT * FROM tarefas WHERE id=?',
        [id]
    )

    if (tarefas.length === 0) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' })
    }

    res.json(tarefas[0])
})

app.delete('/tarefas/:id', async (req, res) => {
    const id = Number(req.params.id)

    const [verificar] = await db.execute(
        'SELECT * FROM tarefas WHERE id=?',
        [id]
    )

    if (verificar.length === 0) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' })
    }

    await db.execute(
        'DELETE FROM tarefas WHERE id=?',
        [id]
    )

    res.json({ mensagem: 'Tarefa deletada com sucesso!' })
})

app.put('/tarefas/:id', async (req, res) => {
    const id = Number(req.params.id)
    const titulo = req.body.titulo
    const descricao = req.body.descricao

    const [verificar] = await db.execute(
        'SELECT * FROM tarefas WHERE id=?',
        [id]
    )

    if (verificar.length === 0) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' })
    }

    const [tarefas] = await db.execute(
        'UPDATE tarefas SET titulo = ?, descricao = ? WHERE id = ?',
        [titulo, descricao, id]
    )

    const [buscar] = await db.execute(
        'SELECT * FROM tarefas WHERE id=?',
        [id]

    )

    res.json(buscar[0])
})

iniciar()