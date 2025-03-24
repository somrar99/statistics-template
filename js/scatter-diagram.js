import addMdToPage from './libs/addMdToPage.js';
import drawGoogleChart from './libs/drawGoogleChart.js';
import makeChartFriendly from './libs/makeChartFriendly.js';
import * as s from './libs/simple-statistics.js';
import jload from './libs/jload.js';

let data = await jload('salaries.json');

// create a new data set / array where we only have two properties left - age and salary
let agesAndSalaries = data.map(({ age, monthlySalarySEK }) => ({ age, monthlySalarySEK }));
let ages = data.map(x => x.age);
let salaries = data.map(x => x.monthlySalarySEK);

// c = correlation coefficient
let c = s.sampleCorrelation(ages, salaries); // -1 to 1
let absC = Math.abs(c); // 0 to 1

addMdToPage(`
  ## Spridningsdiagram: Ålder och lön
  Korrelationskoefficient: ${c.toFixed(2)} 
  (${absC < 0.1 ? 'ingen korrelation' : absC < 0.5 ?
    'svagt ' + (c > 0 ? 'positiv' : 'negativ') :
    'starkt ' + (c > 0 ? 'positiv' : 'negativ')})
`);

drawGoogleChart({
  type: 'ScatterChart',
  data: makeChartFriendly(
    agesAndSalaries
  ),
  options: {
    height: 500,
    trendlines: { 0: { type: 'linear', color: 'green' } },
    legend: { position: 'none' }
  }
});