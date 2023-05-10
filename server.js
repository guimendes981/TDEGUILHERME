// const express = require("express");

// const server = express();

// server.listen(3000, () => {
//     console.log('Server running on port 3000')
// });

// server.get("/health", (req, res) => {
//     res.send("server is running")
// })


//////////// TDE 3 



const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const tasks = [
  {
    id: 1,
    name: 'Comprar leite',
    description: 'Ir no mercado da esquina e comprar leite',
    isDone: false,
  },
  {
    id: 2,
    name: 'Fazer exercícios',
    description: 'Fazer exercícios físicos por 30 minutos',
    isDone: true,
  },
  {
    id: 3,
    name: 'Estudar programação',
    description: 'Estudar programação por 1 hora',
    isDone: false,
  },
];

let nextTaskId = 4;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = req.body;
  newTask.id = nextTaskId;
  nextTaskId++;
  tasks.push(newTask);
  res.json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    tasks[index] = {
      id: taskId,
      name: updatedTask.name,
      description: updatedTask.description,
      isDone: updatedTask.isDone,
    };
    res.json(tasks[index]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    tasks.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.listen(8080, () => {
  console.log('Servidor iniciado na porta 8080');
});
