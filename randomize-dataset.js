import './js/libs/jerzy-loader.js';
import csvLoad from './js/libs/csvLoad.js';
import * as s from './js/libs/simple-statistics.js';
import * as helpers from './js/helpers.js';
import fs from 'fs';

// load data
let data = await csvLoad('http://localhost:3005/smokinghealth-org.csv');

// divide in categories by smoking_status
let byCat = {};
for (let x of data) {
  byCat[x.smoking_status] = byCat[x.smoking_status] || [];
  byCat[x.smoking_status].push(x);
}

// more symmetric normal distribution
for (let cat in byCat) {
  //sl,ol,min,max
  let data = byCat[cat];
  let paras = [data.length, data.length - Math.floor(data.length * 0.98)];
  cat === '0' && paras.push(10, 90);
  cat === 'currently smokes' && paras.push(10, 80);
  cat === 'previously smoked' && paras.push(15, 85);
  cat === 'never smoked' && paras.push(15, 90)
  let newHealthNums = makeNormalDist(...paras);
  for (let x of data) {
    x.general_health = newHealthNums.shift();
  }
}

// write new csv data
let csv = [];
csv.push(Object.keys(data[0]).join(','));
data.forEach(x => csv.push(Object.values(x).map(x => (x + '').includes(',') ? '"' + x + '"' : x).join(',')));
csv = csv.join('\n');
//fs.writeFileSync('./smokinghealth.csv', csv, 'utf-8');

// Fix a normal dist with som outliers
function makeNormalDist(seriesLength, numberOfOutliers, min, max, minP = 0.8) {
  seriesLength -= numberOfOutliers;
  let series = [];
  while (isNaN(helpers.shapiroWilk(series).p)) {
    function rand(min, max) {
      return Math.floor((Math.random() * (max - min + 1)) + min);
    }
    function avgOfMany(howMany = 5) {
      let s = [];
      while (s.length < howMany) { s.push(rand(min, max)); }
      return Math.round(s.reduce((a, c) => a + c) / howMany);
    }
    // normal dist
    do {
      series.length = 0;
      while (series.length < seriesLength) {
        series.push(avgOfMany());
      }
    } while (helpers.shapiroWilk(series).p < minP);
    let mean = s.mean(series);
    let stdDev = s.sampleStandardDeviation(series);
    // add outliers
    while (series.length < seriesLength + numberOfOutliers) {
      let up = Math.random() > 0.5 ? 1 : -1;
      let val = mean + up * (stdDev * rand(3, 5));
      val = up ? Math.ceil(val) : Math.floor(val);
      series.push(val);
    }
  }
  return series;
}