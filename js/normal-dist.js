// Imports from libs
import stdLib from './libs/stdLib.js';
import drawGoogleChart from './libs/drawGoogleChart.js';
import makeChartFriendly from './libs/makeChartFriendly.js';
import addMdToPage from './libs/addMdToPage.js';
import addDropdown from './libs/addDropdown.js';
import tableFromData from './libs/tableFromData.js';

// Imports our own helper functions and groupings
import * as helpers from './helpers.js'
import { groups } from './load-data-and-make-groups.js';

// Headline and explanation
addMdToPage(`## Normalfördelning och histogram`);

// Choose group + filtering
addMdToPage('### Välj en grupp:');
let showExplanation = addDropdown('Visa förklaring?', ['Ja', 'Nej'], 'Nej');
let data = helpers.chooseGroupPlusOutlierFiltering('Grupp', groups).data;

// Check if Shapiro Wilk thinks we have a normal distribution
let result = stdLib.stats.shapiroWilkTest(data);
result['Normalfördelning?'] = result.p >= 0.05 ? 'Ja' : 'Nej';
if (showExplanation === 'Ja') {
  addMdToPage(`### Shapiro-Wilk-test av normalfördelning
  **Nollhyptotesen** är att datan är normalfördelad! **Alternativhypotesen** är att den inte är det.
  * **w-värdet** *${result.w.toFixed(2)}* indikerar  ${result.w > 0.8 ? '' : 'inte'}  en normalfördelning
  * ${result.w > 0.8 && result.p >= 0.05 ? 'och' : 'men'} **p-värdet** *${result.p.toFixed(2)}* 
  ${result.p >= 0.05 ? 'bekräftar' : 'förkastar'} att detta är en normalfördelning (p ${result.p >= 0.05 ? '>=' : '<'} α,  α = 0.05)
  **Notera**: Shapiro-Wilk för större urval är mycket känsligt för avvikelser även om datan är ganska nära normalfördelning! [Se denna länk](https://math.stackexchange.com/questions/3124839/interpretation-of-the-p-value-and-the-test-statistic-w-of-the-shapiro-test-in-r).
  `);
}

tableFromData({ data: [result], columnNames: ['Shapiro-Wilk,&nbsp;w', 'p-värde'] });

// Draw a histogram
drawGoogleChart({
  type: 'Histogram',
  data: makeChartFriendly(
    data.map(x => ({ x })),
    'Allmänhälsa'
  ),
  options: {
    height: 400,
    histogram: { bucketSize: 10 }
  }
});