import jload from './libs/jload.js';
import addToPage from './libs/addToPage.js'
import drawGoogleChart from './libs/drawGoogleChart.js';
import makeChartFriendly from './libs/makeChartFriendly.js';
import * as s from './libs/simple-statistics.js';

let data = await jload('./barometer-data.json');
addToPage(`<h1>Väljarbarometern februari 2025</h1>`);

// Add summary of blocks
// -> empty column space
data.push({ party: '', percent: 0, color: 'white' });
// -> sum of M + KD + L + SD
data.push({
  party: 'M+KD+L+SD',
  percent: s.sum(data.filter(x => x.party == 'M' || x.party == 'KD' || x.party == 'L' || x.party == 'SD').map(x => x.percent)),
  color: "blue"
});
// -> sum of  S + V + MP + C
data.push({
  party: 'S+V+MP+C',
  percent: s.sum(data.filter(x => x.party == 'S' || x.party == 'V' || x.party == 'MP' || x.party == 'C').map(x => x.percent)),
  color: "red"
});


// Add percentages once more as annotations - which shows them above each bar/column
// Note: The expression with ? and : is a ternary operator! (Shorthand for if-else)
data = data.map(x => ({ ...x, percentVisible: x.percent ? x.percent.toFixed(1) + '%' : '' }));

// Draw the chart
drawGoogleChart({
  type: 'ColumnChart',
  data: makeChartFriendly(
    data,
    "Parti",
    "Procent",
    { role: "style" },
    {
      type: 'string',
      role: 'annotation',
    }
  ),
  options: {
    title: 'Partisympatier',
    height: 500,
    // Hide the legend (the small box telling us the unit of the hAxis)
    legend: { position: 'none' },
    // set vertical text below columns
    hAxis: {
      slantedTextAngle: 90,
      slantedText: true
    },

  }
});