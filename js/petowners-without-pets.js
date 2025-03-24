import addMdToPage from './libs/addMdToPage.js';
import dbQuery from "./libs/dbQuery.js";
import tableFromData from './libs/tableFromData.js'

addMdToPage(`
  ## Husdjursägare utan husdjur
  Dessa husdjursägare saknar för närvarande husdjur...
`);

let petownersWithoutPets = await dbQuery(
  'SELECT petOwners.* FROM petOwners LEFT JOIN pets ON petOwners.id = pets.ownerId WHERE pets.id IS NULL'
);
tableFromData({ data: petownersWithoutPets });