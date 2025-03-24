import addMdToPage from './libs/addMdToPage.js';
import dbQuery from "./libs/dbQuery.js";
import tableFromData from './libs/tableFromData.js'

addMdToPage(`
  ## Ägare
  En tabell över husdjursägare.
`);

let petOwners = await dbQuery('SELECT * FROM petOwners');
tableFromData({ data: petOwners });