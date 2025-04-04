// Imports from libs
import drawGoogleChart from './libs/drawGoogleChart.js';
import makeChartFriendly from './libs/makeChartFriendly.js';
import addMdToPage from './libs/addMdToPage.js';
import tableFromData from './libs/tableFromData.js';

// Imports ouur group sums
import { basicGroupSums, groupSums } from './load-data-and-make-groups.js';

// Headline and explanation
addMdToPage(`
## Upplevd hälsa i ett stickprov av en population som går att dela in i rökare och icke-rökare
Detta är en egenskattning av allmänhälsa (svar på en skala 0-100) i ett dataset som är ett stickprov av en population
med rökare och icke-rökare.
`);

drawGoogleChart({
  type: 'PieChart',
  data: makeChartFriendly(
    basicGroupSums,
    'Gruppstorlek'
  ),
  options: {
    title: 'Icke-rökare, f.d. rökare och rökare',
    height: 500,
    histogram: { bucketSize: 10 },

    pieHole: 0.4
  }
});

tableFromData({ data: groupSums, columnNames: ['Grupp', 'Antal respondenter', 'Procent', 'Hälskoskattning (medel)'] });