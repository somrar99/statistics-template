import addMdToPage from './libs/addMdToPage.js';
import dbQuery from "./libs/dbQuery.js";
import drawGoogleChart from './libs/drawGoogleChart.js';
import makeChartFriendly from './libs/makeChartFriendly.js';

addMdToPage(`
  ## Hussdjursarter
  Hur fördelar sig husdjuren på olika arter?
`);

let petownersWithoutPets = await dbQuery(
  'SELECT species AS art, COUNT(*) AS antal FROM pets GROUP BY species'
);

drawGoogleChart({
  type: 'PieChart',
  data: makeChartFriendly(petownersWithoutPets),
  options: {
    title: 'Husdjursarter',
    responsive: true,
    height: 400,
    is3D: true,
    chartArea: { left: "0%" }
  }
});

