// There is an import of 'datasets' that leads to stack overflow!
// Also the dataset is large (> 60 MB) so that it is another reason to not import
// The rest of the library is around 3 MB...
// So this a postinstall script (runs after npm install)
// that fixes this by removing the datasets parts of stdLib.js!
// ALSO: See https://stdlib.io for more on what stdLib.js is!

import fs from 'fs';
import path from 'path';

let indexFile = path.join(import.meta.dirname, '..', '..', 'node_modules', '@stdlib', 'esm', 'index.js');
if (!fs.existsSync(indexFile)) { process.exit(); }

let indexContent = fs.readFileSync(indexFile, 'utf-8');
indexContent = indexContent.replaceAll(';import a from"./datasets.js";', ';');
indexContent = indexContent.replaceAll('J={}', 'J={},a={}');
fs.writeFileSync(indexFile, indexContent, 'utf-8');