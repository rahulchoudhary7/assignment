const express = require('express');

function createRouter(client) {
  const router = express.Router();

  router.get('/banner', async (req, res) => {
    try {
      const result = await client.query('SELECT * FROM banner');
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch banner data', details: error.message });
    }
  });

  router.put('/banner', async (req, res) => {
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

  return router;
}

module.exports = createRouter;