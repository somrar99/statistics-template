import csvLoad from './libs/csvLoad.js';
import jload from './libs/jload.js';
import * as s from './libs/simple-statistics.js';
import tableFromData from './libs/tableFromData.js';
import drawGoogleChart from './libs/drawGoogleChart.js';
import makeChartFriendly from './libs/makeChartFriendly.js';

// The chartType as a variable so we can easily change it
// to see how different types of charts look
// you can try changing it to ColumnChart and BarChart
let chartType = 'LineChart';

// Read data from csv-file (wher colimns are separated by ";"")
let data = await csvLoad('smhi-rainfall-and-temp-malmo-1961-to-2024.csv', ';');

// Read Swedish month names from a json file
let monthNames = await jload('swedishMonthNames.json');

// Add month names (short and long versions to data)
// Note: slice can be used to extract a substring 
//       from a longer string: slice(startPosition, endPosition)
data = data.map(x => (
  {
    ...x,
    monthName: monthNames[x.date.slice(5) - 1],
    monthNameShort: monthNames[x.date.slice(5) - 1].slice(0, 3)
  }
));

// Filter the so that we only have data from the year 1964
// Note: includes checks if a substring is part of a string
let year1964 = data.filter(x => x.date.includes('1964'));
// And do the same for the year 2024:
let year2024 = data.filter(x => x.date.includes('2024'));

// Map data for the first diagram and table - temperatures during 1964
let temps1964ForChart = year1964.map(({ monthNameShort, temperatureC }) =>
  ({ monthNameShort, temperatureC }));
let temps1964ForTable = year1964.map(({ monthName, temperatureC }) =>
  ({ monthName, temperatureC }));

// Options that we will reuse for several/all diagrams
let lineChartOptions = {
  height: 500,
  width: 1250,
  chartArea: { left: 50 },
  curveType: 'function', // smooth line
  pointSize: 5,
  pointShape: 'circle',
  vAxis: { format: '# °C' }
}

drawGoogleChart({
  type: chartType,
  data: makeChartFriendly(temps1964ForChart, 'månad', '°C'),
  options: {
    ...lineChartOptions,
    title: 'Medeltemperatur per månad i Malmö 1964 (°C)',
  }
});

tableFromData({
  columnNames: ['månad år 1964', 'medeltemperatur i Malmö (°C)'],
  data: temps1964ForTable
});

// Map data for the second diagram and table - rainfall during 1964
let rainfall1964ForChart = year1964.map(({ monthNameShort, rainfallMm }) =>
  ({ monthNameShort, rainfallMm }));
let rainfall1964ForTable = year1964.map(({ monthName, rainfallMm }) =>
  ({ monthName, rainfallMm }));

drawGoogleChart({
  type: chartType,
  data: makeChartFriendly(rainfall1964ForChart, 'månad', 'mm'),
  options: {
    ...lineChartOptions,
    vAxis: { format: '# mm' },
    title: 'Nederbörd per månad i Malmö 1964 (mm)'
  }
});

tableFromData({
  columnNames: ['månad år 1964', 'nederbörd i Malmö (mm)'],
  data: rainfall1964ForTable
});

// Combine/join temperature data from 1964 and 2024
let temps1964and2024 = year1964.map((x, i) => ({
  monthNameShort: x.monthNameShort,
  temperature1964: x.temperatureC,
  temperature2024: year2024[i].temperatureC
}));

drawGoogleChart({
  type: chartType,
  data: makeChartFriendly(temps1964and2024, 'månad', '°C 1964', '°C 2024'),
  options: {
    ...lineChartOptions,
    title: 'Jämförelse: Medeltemperatur per månad i Malmö 1964 och 2024 (°C)'
  }
});

// Calculate average/mean temperatures per year for all years!
// Also note that adding a + sign before a string converts it to a number
// (if we do not have the years as a continuous number series,
//  we can't ask Google Chart to create a trend line...)
let tempsGroupedByYear = [...new Set(data.map(x => +x.date.slice(0, 4)))]
  .map(year => ({
    year,
    temperatures: data.filter(x => x.date.includes(year)).map(x => x.temperatureC)
  }));
let meanTempsByYear = tempsGroupedByYear.map(x => ({ year: x.year, meanTemp: s.mean(x.temperatures) }))

drawGoogleChart({
  type: chartType,
  data: makeChartFriendly(meanTempsByYear, 'år', '°C'),
  options: {
    ...lineChartOptions,
    title: 'Medeltemperatur per år i Malmö mellan 1961 och 2024 (°C), med trendlinje'
    trendlines: { 0: { color: 'green', pointSize: 0 } },
    hAxis: { format: "#" } // prevents year to be displayed as numbers
  }
});

// Note: Convert the years to strings for a prettier display in the table
console.log(meanTempsByYear.map(x => ({ ...x, year: x.year + '' })))

tableFromData({
  columnNames: ['år', 'medeltemperatur i Malmö (°C)'],
  data: meanTempsByYear.map(x => ({ ...x, year: 'år ' + x.year }))
});