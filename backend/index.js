const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 4000;

// In-memory store (starter)
let issues = [];

app.get('/api/issues', (req, res) => {
  res.json(issues);
});

app.post('/api/issues', (req, res) => {
  const { title, description, priority='medium', status='open' } = req.body;
  const newIssue = { id: uuidv4(), title, description, priority, status, createdAt: new Date().toISOString() };
  issues.push(newIssue);
  res.status(201).json(newIssue);
});

app.put('/api/issues/:id', (req, res) => {
  const id = req.params.id;
  const idx = issues.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  issues[idx] = { ...issues[idx], ...req.body, updatedAt: new Date().toISOString() };
  res.json(issues[idx]);
});

app.delete('/api/issues/:id', (req, res) => {
  const id = req.params.id;
  issues = issues.filter(i => i.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => console.log(`Bug Tracker API running on http://localhost:${PORT}`));
