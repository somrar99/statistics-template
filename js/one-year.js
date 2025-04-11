import addMdToPage from './libs/addMdToPage.js';
import addDropdown from './libs/addDropdown.js';
import dbQuery from "./libs/dbQuery.js";
import tableFromData from './libs/tableFromData.js';
import drawGoogleChart from './libs/drawGoogleChart.js';
import makeChartFriendly from './libs/makeChartFriendly.js';


//let yeardata = await dbQuery(
//  'SELECT DISTINCT year FROM dataWithMonths'
//)
//console.log(yeardata)

let years = (await dbQuery(
  'SELECT DISTINCT year FROM dataWithMonths'
)).map(x => x.year);

//console.log(years)


let currentYear = addDropdown('År', years, 2024);

addMdToPage(`
  ## Medeltemperaturer i Malmö ${currentYear}
`);

let dataForChart = await dbQuery(
  `SELECT monthNameShort, temperatureC FROM dataWithMonths WHERE year = '${currentYear}'`
);

drawGoogleChart({
  type: 'LineChart',
  data: makeChartFriendly(dataForChart, 'månad', '°C'),
  options: {
    height: 500,
    width: 1250,
    chartArea: { left: 50 },
    curveType: 'function',
    pointSize: 5,
    pointShape: 'circle',
    vAxis: { format: '# °C' },
    title: `Medeltemperatur per månad i Malmö ${currentYear} (°C)`
  }
});

// the same db query as before, but with the long month names
let dataForTable = await dbQuery(
  `SELECT monthName, temperatureC FROM dataWithMonths WHERE year = '${currentYear}'`
);

tableFromData({
  data: dataForTable,
  columnNames: ['Månad', 'Medeltemperatur (°C)']
});