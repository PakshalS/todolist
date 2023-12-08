// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB (make sure you have MongoDB installed locally or provide a remote connection string)
mongoose.connect('mongodb://localhost:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Todo schema
const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

// API endpoint to get all todos
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// API endpoint to add a new todo
app.post('/api/todos', async (req, res) => {
  const { text } = req.body;
  const todo = new Todo({ text, completed: false });
  await todo.save();
  res.json(todo);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
