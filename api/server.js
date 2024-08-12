const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const createApiRouter = require('./routes/apiRoutes.js');
require('dotenv').config()

const app = express();

// CORS configuration (remove duplicate)
app.use(cors({
  origin: ['http://localhost:3000', 'https://assignment-2-eezd.onrender.com']
}));
app.use(express.json());

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10), 
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('./ca.pem').toString(),
    },
    connectionTimeoutMillis: 20000, 
};

const client = new Client(config);

client.connect(err => {
  if (err) {
    console.error('Connection error:', err.stack);
    return;
  }
  console.log('Connected to PostgreSQL');
});

// Use API routes with client passed as an argument
const apiRouter = createApiRouter(client);
app.use('/api', apiRouter);

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// Catch-all route for the front-end
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

process.on('SIGINT', () => {
  client.end(err => {
    if (err) {
      console.error('Error closing the client:', err.stack);
    } else {
      console.log('Client connection closed');
    }
    process.exit(0);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});