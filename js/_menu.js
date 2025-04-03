import createMenu from './libs/createMenu.js';

createMenu('Hälsa rökare/icke-rökare', [
  { name: 'Överblick', script: 'overview.js' },
  { name: 'Histogram och normalfördelning', script: 'normalDist.js' }
]);