const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let todos = [];
let id = 1;

// GET all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// ADD new todo
app.post("/todos", (req, res) => {
  const todo = { id: id++, text: req.body.text };
  todos.push(todo);
  res.json(todo);
});

// UPDATE todo
app.put("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (todo) {
    todo.text = req.body.text;
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// DELETE todo
app.delete("/todos/:id", (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.json({ message: "Todo deleted" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
