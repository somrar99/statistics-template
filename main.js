import csvLoad from './libs/csvLoad.js';
import tableFromData from './libs/tableFromData.js';

let data = await csvLoad('smhi-rainfall-temperature-sthm.csv', ';');
tableFromData({ data, columnNames: ['Datum', 'Nederbörd (mm)', 'Temperatur (celsius)'] });