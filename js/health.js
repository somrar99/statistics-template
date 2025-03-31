import csvLoad from './libs/csvLoad.js';
import drawGoogleChart from './libs/drawGoogleChart.js';
import makeChartFriendly from './libs/makeChartFriendly.js';
import addMdToPage from './libs/addMdToPage.js';
import tableFromData from './libs/tableFromData.js';
import jerzy from './libs/jerzy.js';
import * as s from './libs/simple-statistics.js';

// Load the dataset from csv
let data = await csvLoad('smokinghealth.csv');

console.log('data', data);

// Check distinct/unique values of smoking_status
// equivalent query in SQL: SELECT DISTINCT smoking_status FROM data
let smokingStatuses = [...new Set(data.map(x => x.smoking_status))];

console.log('Values of smoking_status', smokingStatuses);

// Check how many of each answer to smoking_status
// equivalent query in SQL: 
// SELECT smoking_status, COUNT(*) FROM data GROUP BY smoking_status
let countAnswers = smokingStatuses.map(
  status => ({
    status,
    count: data.filter(x => x.smoking_status == status).length
  })
);

console.log('Counting answers for smoking_status', countAnswers);

// We will ignore respondents with the answer 0 since it's unclear
// if that means 'never smoked' or 'did not answer the question'

// Collecting all non-smokers (never smoked in one starta - nonSmokers)
let nonSmokers = data.filter(x => x.smoking_status == 'never smoked');
// Collecting all smokers (previous or current in one starta - smokers)
let smokers = data.filter(
  x => x.smoking_status == 'currently smokes' || x.smoking_status == 'previously smoked'
);

// Check max and min values for general_health
let healthValues = data.map(x => x.general_health);
console.log('healthValues', healthValues);
console.log('General health min value, all respondents', s.min(healthValues));
console.log('General health max value, all respondents', s.max(healthValues));

console.log('nonSmokers', nonSmokers.length, nonSmokers);
console.log('smokers', smokers.length, smokers);

drawGoogleChart({
  type: 'Histogram',
  data: makeChartFriendly(
    nonSmokers.map(({ general_health }) => ({ general_health })),
    'General health'
  ),
  options: {
    title: 'General health, non-smokers',
    height: 500,
    width: 1250,
    histogram: {
      bucketSize: 10
    }
  }
});

let nonSmokerHealthVector = new jerzy.Vector(nonSmokers.map(x => x.general_health));
let shapiroPValueNonSmokerHealth = jerzy.Normality.shapiroWilk(nonSmokerHealthVector).p;
addMdToPage(`Shapiro/Wilk-test, P value ${shapiroPValueNonSmokerHealth}`);

drawGoogleChart({
  type: 'Histogram',
  data: makeChartFriendly(
    smokers.map(({ general_health }) => ({ general_health })),
    'General health'
  ),
  options: {
    title: 'General health, smokers',
    height: 500,
    width: 1250,
    histogram: {
      bucketSize: 10
    }
  }
});

let smokerHealthVector = new jerzy.Vector(smokers.map(x => x.general_health));
let shapiroPValueSmokerHealth = jerzy.Normality.shapiroWilk(smokerHealthVector).p;
addMdToPage(`Shapiro/Wilk-test, P value ${shapiroPValueSmokerHealth}`);