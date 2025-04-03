// Imports from libs
import drawGoogleChart from './libs/drawGoogleChart.js';
import makeChartFriendly from './libs/makeChartFriendly.js';
import addMdToPage from './libs/addMdToPage.js';
import tableFromData from './libs/tableFromData.js';
import addDropdown from './libs/addDropdown.js'
import { groups } from './load-data-and-make-groups.js';

// Imports our own helper functions
// which help us write less code
import * as helpers from './helpers.js'

// Wrap drawing a histogram in a function
function drawHistogram(title = 'General health', data) {
  drawGoogleChart({
    type: 'Histogram',
    data: makeChartFriendly(
      data.map(x => ({ x })),
      'Allmänhälsa'
    ),
    options: {
      title,
      height: 400,
      histogram: { bucketSize: 10 }
    }
  });
}

// Wrap calculating Shapiro-Wilk in a function
// where we interpret the values in text as well
function shapiroWilkReport(data) {
  let result = helpers.shapiroWilk(data);
  addMdToPage(
    '### Shapiro-Wilk-test av normalfördelning\n' +
    `Notera: Shapiro-Wilk för större urval är mycket känsligt för avvikelser även om datan är ganska nära normalfördelning! [Se denna länk](https://math.stackexchange.com/questions/3124839/interpretation-of-the-p-value-and-the-test-statistic-w-of-the-shapiro-test-in-r)\n` +
    `* w-värdet *${result.w.toFixed(2)}* indikerar  ${result.w > 0.8 ? '' : 'inte'}  en normalfördelning\n` +
    `* ${result > 0.8 && result.p >= 0.05 ? 'och' : 'men'} p-värdet *${result.p.toFixed(2)}* 
    ${result.p >= 0.05 ? 'bekräftar' : 'förkastar'} att detta är en normalfördelning (α = 0.05)`
  );
  tableFromData({ data: [result] });
}

// PRESENT THE DATA

// Headline and explanation
addMdToPage(`## Histogram och normalfördelning`);

// Ask the user to make a choice of group
addMdToPage('### Välj en grupp:');
let chosenGroupLabel = addDropdown('Grupp', groups.map(x => x.label));
let chosenGroup = groups.find(x => x.label == chosenGroupLabel);

// Get the general health data for the chosen group
let generalHealth = chosenGroup.data.map(x => x.general_health);

// Draw a histogram
addMdToPage('## Histogram');
drawHistogram('Histogram', generalHealth);

// Check if Shapiro Wilk thinks we have a normal distribution
shapiroWilkReport(generalHealth);