const express = require("express");
const app = express();
const cors = require('cors');
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json);

// Routes

// C
app.post("/todos", async(req, res) => {
    try {
        const { desciption } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [desciption]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
// R
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todos");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})

app.get("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todos = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// U
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { desciption } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE id = $2", [desciption, id]);
        res.json("Todo was updated");
    } catch (err) {
        console.error(err.message);
    }
})

// D
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [id]);
        res.json("Todo was deleted!");
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5000, () => {
    console.log("hello world");
})