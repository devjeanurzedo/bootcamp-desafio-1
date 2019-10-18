const express = require('express');

const app = express();

app.use(express.json());

const projects = [];
let numberOfRequests = 0;

app.use((req, res, next) => {
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url};`);

  next();

  console.timeEnd('Request');
});

function checkProjectsExists(req, res, next) {
  const id = req.params;
  const project = projects.find[p => p.id == id];

  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }

  return next();
};

function countRequests(req, res, next) {
  numberOfRequests++;
  console.log(`Número de requisições: ${numberOfRequests}`);

  return next();
}

app.use(countRequests);

app.post('/projects', (req, res) => {
  const project = req.body;
  projects.push(project);
  return res.json(projects);
});

app.get('/projects', (req, res) => {
  return res.json(projects);
});

app.put('/projects/:id', checkProjectsExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

app.delete('/projects/:id', checkProjectsExists, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(p => p.id == id);

  projects.splice(index, 1);

  return res.send();
});

app.post('/projects/:id/tasks', checkProjectsExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

app.listen(3000);
