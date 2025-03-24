import addMdToPage from './libs/addMdToPage.js';
import dbQuery from "./libs/dbQuery.js";
import tableFromData from './libs/tableFromData.js'

addMdToPage(`
  ## Husdjur
  En tabell över husdjur.
`);

let pets = await dbQuery('SELECT * FROM pets');
tableFromData({ data: pets });