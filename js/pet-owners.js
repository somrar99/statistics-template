import addMdToPage from './libs/addMdToPage.js';
import dbQuery from "./libs/dbQuery.js";
import tableFromData from './libs/tableFromData.js';
import addDropdown from './libs/addDropdown.js';

addMdToPage(`
  ## Ägare
  En tabell över husdjursägare.
`);

let data = await dbQuery('SELECT * FROM data');
let years = [...new Set(data.map(x => +x.date.slice(0, 4)))];
let currentYear = addDropdown('years', 'År', years, 2024);
let dataForYear = data.filter(x => x.date.includes(currentYear));

tableFromData({ data: dataForYear });