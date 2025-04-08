import express from 'express';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

// Port to start the web server on
const port = 3005;

// Create a web server
const app = express();

// Path to this folder
const dirname = import.meta.dirname;

// make all libs exports global
const libsFolder = path.join(dirname, '..', 'js', 'libs');
let files = fs.readdirSync(libsFolder)
  .filter(x => x.endsWith('.js') && !x.includes('jerzy') && !x.includes('liveReload') && !x.includes('-'));
let imports = files.map(x => `import ${x.split('.')[0]} from '/js/libs/${x}';`).join('\n');
let names = files.map(x => `  ${x.split('.')[0]}`).join(',\n');
let globalize = `Object.assign(globalThis,{\n${names}\n});`;
globalize += '\n\nglobalThis.s = simpleStatistics';
let globalizerContent = imports + '\n\n' + globalize;
app.get('/globalizer.js', (_req, res) => {
  res.type('application/javascript');
  res.send(globalizerContent);
});

// Serve the README-file using the showDocs mini-site
app.get('/docs/README.md', (_req, res) => res.sendFile(path.join(dirname, '..', 'README.md')));
app.use('/docs', express.static(path.join(dirname, 'showDocs')));

// Serve the files in the main folder
app.use(express.static(path.join(dirname, '..')));

// Start the web server
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));

// Routes for live reload
app.get('/api/is-real-backend', (_req, res) => res.send(true));
app.get('/api/reload-if-closes', (_req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-control': 'no-cache'
  });
  setInterval(() => res.write('data: ping\n\n'), 20000);
});


// app get script to start with
// check for scripts in this order
// js/_menu.js, js/main.js, main.js
app.get('/api/getMainScript', (_req, res) => {
  let mainFolder = path.join(dirname, '..');
  let whichScriptsExists = [
    { name: '/js/_menu.js', exists: fs.existsSync(path.join(mainFolder, 'js', '_menu.js')) },
    { name: '/js/main.js', exists: fs.existsSync(path.join(mainFolder, 'js', 'main.js')) },
    { name: '/main.js', exists: fs.existsSync(path.join(mainFolder, 'main.js')) }
  ];
  res.set({ 'Content-Type': 'application/javascript' });
  res.send(
    `let whichScriptsExists = ${JSON.stringify(whichScriptsExists, '', '  ')};\n\n` +
    `let scriptToLoad = whichScriptsExists.find(x => x.exists);\n` +
    `scriptToLoad.name.includes('menu') && document.body.classList.add('with-menu');\n` +
    `scriptToLoad && import(scriptToLoad.name);`
  );
});

// Only if dbFolder exists
let dbFolder = path.join(dirname, '..', 'sqlite-databases');
if (fs.existsSync(dbFolder)) {

  // Read settings for which SQLite-database to use
  let databaseToUse = fs.readFileSync(path.join(dbFolder, 'database-in-use.json'), 'utf-8').slice(1, -1);
  databaseToUse = path.join(path.join(dbFolder, databaseToUse));
  // database connection
  let db;
  if (fs.existsSync(databaseToUse)) {
    db = new Database(databaseToUse);
  }

  // route for database query (SELECT:s only)
  app.get('/api/dbquery/:select', (req, res) => {
    let select = req.params.select.trim();
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
      result = db.prepare(select).all();
    }
    catch (e) {
      result = [{ error: e + '' }];
    }
    res.json(result);
  });

}