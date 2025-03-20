import express from 'express';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import * as cheerio from 'cheerio';

// Read markdown content
let md = fs.readFileSync(path.join(import.meta.dirname, '..', 'markdown-content', 'content.md'), 'utf-8');

// Create cache folder
let cacheFolder = path.join(import.meta.dirname, 'cache');
fs.existsSync(cacheFolder) && fs.rmSync(cacheFolder, { recursive: true, force: true });
fs.mkdirSync(cacheFolder);

// Create js files for each js fragment in the markdown file
// and modify html generated from markdown
let $ = cheerio.load('<div class="cheerio-holder">' + marked.parse(md) + '</div>');
let i = 1;
$('code').each(function () {
  let codeEl = $(this);
  fs.writeFileSync(path.join(cacheFolder, i + '.js'),
    `window.divCodeCanvas = document.querySelector('#code-canvas-${i}');\n` +
    codeEl.text()
    , 'utf-8');
  let codeSnippet = codeEl.text();
  codeEl.parent().replaceWith('<div id="code-canvas-' + i++ + '"></div>');
});
let html = $('.cheerio-holder').html();
console.log(html);


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