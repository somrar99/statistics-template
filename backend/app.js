import express from 'express';
import path from 'path';

// Port to start the web server on
const port = 3005

// Create a web server 
const app = express();

// Serve the files in the main folder
app.use(express.static(path.join(import.meta.dirname, '..')));

// Route for live reload
app.get('/api/reload-if-closes', (_req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-control': 'no-cache'
  });
  setInterval(() => res.write('data: ping\n\n '), 20000);
});

// Start the web server
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));

