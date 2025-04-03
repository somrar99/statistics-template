// Imports from libs
import addMdToPage from './libs/addMdToPage.js';
import tableFromData from './libs/tableFromData.js';
import { groupSums } from './load-data-and-make-groups.js';

// Headline and explanation
addMdToPage(`
## Hälsa i ett stickprov av en population som går att dela in i rökare och icke-rökare
Detta är en egenskattning av allmänhälsa (svar på en skala 0-100) i ett dataset som är ett stickprov av en population
med rökare och icke-rökare.
`);
tableFromData({ data: groupSums, columnNames: ['Grupp', 'Antal respondenter'] });