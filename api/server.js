const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { Client } = require('pg');
require('dotenv').config()

const app = express();
app.use(cors({
  origin : 'http://localhost:3000'
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

app.get('/api/banner', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM banner');
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch banner data', details: error.message });
  }
});

app.put('/api/banner', async (req, res) => {
    const { id, isvisible, description, link, endtime } = req.body;
    
  
    try {
      const result = await client.query(
        'UPDATE banner SET isVisible = $1, description = $2, link = $3, endTime = $4 WHERE id = $5',
        [isvisible, description, link, endtime, id]
      );
      
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Banner not found' });
      }
  
      res.json({ message: 'Banner updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to update banner data' });
    }
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
