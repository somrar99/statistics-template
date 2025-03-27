import jload from './libs/jload.js';
import addToPage from './libs/addToPage.js'
import drawGoogleChart from './libs/drawGoogleChart.js';
import makeChartFriendly from './libs/makeChartFriendly.js';
import * as s from './libs/simple-statistics.js';

let data = await jload('./barometer-data.json');
addToPage(`<h2>Väljarbarometern februari 2025</h2>`);
addToPage(`<p>Diagram i liknande stil, från samma data, som i <a target="_blank" href="https://demoskop.se/valjarbarometer-februari-2025">denna artikel</a>.`)

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
data = data.map(x =>
  ({ ...x, percentVisible: x.percent ? x.percent.toFixed(1) + '%' : '' }));

// Draw the chart
drawGoogleChart({
  type: 'ColumnChart',
  data: makeChartFriendly(
    data,
    'Parti',
    'Procent',
    { role: "style" },
    { role: 'annotation' }
  ),
  options: {
    title: 'Partisympatier (%)',
    height: 500,
    // hide the legend (the small box telling us the unit of the hAxis)
    legend: { position: 'none' },
    // show perctange on y-axis
    vAxis: { format: '#\'%\'' },
    // set vertical text below columns
    hAxis: {
      slantedTextAngle: 90,
      slantedText: true
    },
    // left align chart
    chartArea: { left: '10%' },
  }
});

let changeData = await jload('barometer-change-data.json');

// Add percentages once more as annotations - which shows them above each bar/column
changeData = changeData.map(({
  party, sinceLastMonth, sinceElection, color
}) => ({
  party,
  sinceLastMonth,
  slmVisible: sinceLastMonth ? sinceLastMonth.toFixed(1) : '',
  sinceElection,
  color,
  seVisible: sinceElection ? sinceElection.toFixed(1) : '',
}));

drawGoogleChart({
  type: 'ColumnChart',
  data: makeChartFriendly(
    changeData,
    'Parti',
    'Förändring sedan förra månaden (%)',
    { type: 'string', role: 'annotation' },
    'Förändring sedan valet (%)',
    { role: "style" },
    { role: 'annotation' }
  ),
  options: {
    title: 'Förändring i partisympatier (%), jfr. med förra månad, samt jfr. senaste riksdagsval',
    height: 500,
    // color of series 0 (series 1 get it's color from the data)
    series: { 0: { color: '#dedede' } },
    // hide the legend (the small box telling us the unit of the hAxis)
    legend: { position: 'none' },
    // show perctange on y-axis
    vAxis: { format: '#\'%\'' },
    // set vertical text below columns
    hAxis: {
      slantedTextAngle: 90,
      slantedText: true
    },
    // left align chart
    chartArea: { left: '10%' },
    // look of annotations
    annotations: {
      alwaysOutside: true,
      stem: {
        color: 'transparent'
      },
      textStyle: {
        color: '#000000',
        fontSize: 11,
        bold: true
      }
    }
  }
});