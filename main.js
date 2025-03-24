import * as s from './libs/simple-statistics.js';
import jload from './libs/jload.js';
import addToPage from './libs/addToPage.js';
import drawGoogleChart from './libs/drawGoogleChart.js';
import makeChartFriendly from './libs/makeChartFriendly.js';

// Load the data
let data = await jload('salaries.json');

let ageAndSalary = data.map(({ age, monthlySalarySEK }) => ({ age, monthlySalarySEK }));
let age = data.map(({ age }) => age);
let salary = data.map(({ monthlySalarySEK }) => monthlySalarySEK);

drawGoogleChart({
  type: 'ScatterChart',
  data: makeChartFriendly(ageAndSalary),
  options: {
    height: 500,
    trendlines: { 0: { type: 'linear', color: 'green', } },
  },

});

let corr = s.sampleCorrelation(age, salary);
console.log(corr);