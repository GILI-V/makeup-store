const express = require('express');
const app = express();

app.get('/api/test', (req, res) => {
  res.json({ message: 'server is alive (kind of)' });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
