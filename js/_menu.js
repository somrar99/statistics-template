import createMenu from './libs/createMenu.js';

createMenu('Hälsa rökare/icke-rökare', [
  { name: 'Överblick', script: 'overview.js' },
  { name: 'Normalfördelning & histogram', script: 'normal-dist.js' },
  { name: 'Tvåsidigt T-test', script: 'two-sample-t-test.js' },
  { name: 'Om datasetet', script: 'about-the-dataset.js' }
]);