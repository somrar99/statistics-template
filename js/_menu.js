import createMenu from './libs/createMenu.js';

createMenu('Husdjur & ägare', [
  { name: 'Ägare', script: 'pet-owners.js' },
  { name: 'Husdjur', script: 'pets.js' },
  { name: 'Ägare & husdjur', script: 'pet-owners-and-pets.js' },
  {
    name: 'Djurlösa & ägarlösa',
    sub: [
      { name: 'Husdjursägare utan husdjur', script: 'petowners-without-pets.js' },
      { name: 'Husdjur utan ägare', script: 'pets-without-owners.js' }
    ]
  },
  { name: 'Husdjursarter', script: 'pet-species-pie-chart.js' }
]);