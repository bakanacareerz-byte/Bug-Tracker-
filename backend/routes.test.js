const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());
// Minimal import of the route logic would be better when split into modules.
app.get('/ping', (req, res) => res.json({ pong: true }));

describe('smoke tests', () => {
  test('ping works', async () => {
    const res = await request(app).get('/ping');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('pong', true);
  });
});
