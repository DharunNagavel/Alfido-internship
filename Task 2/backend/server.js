const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [
  { id: 1, name: "John", email: "john@gmail.com" },
  { id: 2, name: "Alice", email: "alice@gmail.com" }
];

let currentId = 3;

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// GET single user
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  res.json(user);
});

// CREATE user
app.post("/users", (req, res) => {
  const newUser = { id: currentId++, ...req.body };
  users.push(newUser);
  res.json(newUser);
});

// UPDATE user
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.map(u =>
    u.id === id ? { ...u, ...req.body } : u
  );
  res.json({ message: "Updated successfully" });
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: "Deleted successfully" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
