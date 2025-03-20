import express from 'express';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

// Port to start the web server on
const port = 3005

// Create a web server 
const app = express();

// Serve the files in the main folder
app.use(express.static(path.join(import.meta.dirname, '..')));

// Start the web server
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));

// Routes for live reload
app.get('/api/is-real-backend', (_req, res) => res.send(true));
app.get('/api/reload-if-closes', (_req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-control': 'no-cache'
  });
  setInterval(() => res.write('data: ping\n\n '), 20000);
});

// Read settings for which SQLite-database to use
let dbFolder = path.join(import.meta.dirname, '..', 'sqlite-databases');
let databaseToUse = fs.readFileSync(path.join(dbFolder, 'database-in-use.json'), 'utf-8').slice(1, -1);
databaseToUse = path.join(path.join(dbFolder, databaseToUse));
// databse connection
let db;
if (fs.existsSync(databaseToUse)) {
  db = new Database(databaseToUse);
}

// route for database query (SELECT:s only)
app.get('/api/dbquery/:select', (req, res) => {
  let select = req.params.select;
  if (!db) {
    res.json([{ error: 'No database connected!' }]);
    return;
  }
  if ((select + '').toLowerCase().indexOf('select ') !== 0) {
    res.json([{ error: 'Only SELECT queries can be run!' }]);
    return;
  }
  let result;
  try {
    result = db.prepare(select).all()
  }
  catch (e) {
    result = [{ error: e + '' }]
  }
  res.json(result);
});