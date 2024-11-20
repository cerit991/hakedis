
const express = require('express');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const dataFilePath = path.join(__dirname, 'data.json');

app.prepare().then(() => {
  const server = express();

  // Middleware to parse JSON bodies
  server.use(express.json());

  // Endpoint to get personnel data
  server.get('/api/personnel', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to read data' });
      }
      res.json(JSON.parse(data));
    });
  });

  // Endpoint to update personnel data
  server.post('/api/personnel', (req, res) => {
    const personnelData = req.body;
    fs.writeFile(dataFilePath, JSON.stringify(personnelData, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to write data' });
      }
      res.status(200).json({ message: 'Data updated successfully' });
    });
  });

  // Handle all other routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});