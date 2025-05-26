// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for ToDo items
let todos = [];
let nextId = 1;

// Routes
// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/api/todos', (req, res) => {
  const { content, category } = req.body;
  
  if (!content || !category) {
    return res.status(400).json({ error: 'Content and category are required' });
  }
  
  if (!['home', 'work', 'hobbies'].includes(category)) {
    return res.status(400).json({ error: 'Category must be one of: home, work, hobbies' });
  }
  
  const newTodo = {
    id: nextId++,
    content,
    category,
    createdAt: new Date()
  };
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  
  todos = todos.filter(todo => todo.id !== id);
  
  if (todos.length === initialLength) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  res.json({ message: 'Todo deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('ToDo app is ready to use!');
});
