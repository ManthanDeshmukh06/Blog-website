const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const NEWS_API_KEY = 'ec140e102f37434690d63f8e19c8382e';  // replace with your actual key

app.use(cors()); // Allow cross-origin requests (optional if frontend and backend on different ports)

app.get('/news', async (req, res) => {
  const query = req.query.q || 'tesla';
  const from = req.query.from || '2025-05-08';

  const url = `https://newsapi.org/v2/everything?q=${query}&from=${from}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch news from NewsAPI' });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
