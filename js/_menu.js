import createMenu from './libs/createMenu.js';

createMenu('Malmö-temperaturer', [
  { name: 'Visa ett år', script: 'temps-during-one-year.js' },
  { name: 'Jämför två år', script: 'temps-compare-two-years.js' }
]);