import addMdToPage from './libs/addMdToPage.js';
import dbQuery from "./libs/dbQuery.js";
import tableFromData from './libs/tableFromData.js'

addMdToPage(`
  ## Ägare & husdjur
  En vy över vilka husdjursägare som äger vilka husdjur.
  * Här kan man se vilka husdjursägare som äger vilka husdjur.
  * Men: Husdjursägare utan husdjur visas inte.
  * Och: Husdjur ägare utan ägare visas inte heller.
`);

let petOwnersAndPets = await dbQuery('SELECT * FROM petOwnersAndPets');
tableFromData({ data: petOwnersAndPets });
