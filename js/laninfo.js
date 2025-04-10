
addMdToPage(`
  ## Medel- och medianårsinkomst i tusentals kronor (år 2018 - 2022)
`);


let info =['landytaKm2','folkmangd2024','invanarePerKm2'];

let  visaInfo = addDropdown('info', info, 'invanarePerKm2');


let dataForChart = (await dbQuery(
   `SELECT lan,landytaKm2 FROM countyInfo`
)).map(x => x.lan, x.landytaKm2);

console.log(dataForChart);


drawGoogleChart({
  type: 'LineChart',
  data: makeChartFriendly(dataForChart, 'lan', `landytaKm2`),
  options: {
    height: 500,
    width: 1250,
    chartArea: { left: 50 },
    curveType: 'function',
    pointSize: 5,
    pointShape: 'circle',
    vAxis: { format: '# °C' },
    title: `Medeltemperatur per år i Malmö`,
    trendlines: { 0: { color: 'green', pointSize: 0 } },
    hAxis: { format: "#" } // prevents years to be displayed as numbers
  }
});

