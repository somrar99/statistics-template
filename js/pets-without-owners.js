import addMdToPage from './libs/addMdToPage.js';
import dbQuery from "./libs/dbQuery.js";
import tableFromData from './libs/tableFromData.js'

addMdToPage(`
  ## Husdjur utan ägare
  Dessa husdjur saknar för närvarande ägare...
`);

let petownersWithoutPets = await dbQuery('SELECT * FROM pets WHERE ownerId IS NULL');
tableFromData({ data: petownersWithoutPets });