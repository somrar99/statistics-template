import csvLoad from './libs/csvLoad.js';
import drawGoogleChart from './libs/drawGoogleChart.js';
import makeChartFriendly from './libs/makeChartFriendly.js';
import addMdToPage from './libs/addMdToPage.js';
import tableFromData from './libs/tableFromData.js';
import jerzy from './libs/jerzy.js';
import * as s from './libs/simple-statistics.js';

// Load the dataset from csv
let data = await csvLoad('smokinghealth.csv');

// Remove outliers (mean +/- std dev * 3) based on general_health
let health = data.map(x => x.general_health);
let healthMean = s.mean(health);
let healthStdDev = s.sampleStandardDeviation(health);
let outlierLowLimit = healthMean - healthStdDev * 3;
let outlierHighLimit = healthMean + healthStdDev * 3;
data = data.filter(x =>
  x.general_health >= outlierLowLimit && x.general_health <= outlierHighLimit
);

// We will ignore respondents with the answer 0 since it's unclear
data = data.filter(x => x.smoking_status != 0);

// Draw a histogram for the whole sample (smokers and non-smokers)
drawGoogleChart({
  type: 'Histogram',
  data: makeChartFriendly(
    data.map(({ general_health }) => ({ general_health })),
    'General health'
  ),
  options: {
    title: 'General health, all respondents',
    height: 500,
    width: 1250,
    histogram: {
      bucketSize: 10
    }
  }
});

// if that means 'never smoked' or 'did not answer the question'

// Collecting all non-smokers (never smoked in one strata - nonSmokers)
let nonSmokers = data.filter(x => x.smoking_status == 'never smoked');
// Collecting all smokers (previous or current in one strata - smokers)
let smokers = data.filter(
  x => x.smoking_status == 'currently smokes' || x.smoking_status == 'previously smoked'
);

addMdToPage(`
  **Please Note:** ${nonSmokers.length} non-smokers, but only ${smokers.length} smokers.
`);

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
addMdToPage(`
  Shapiro/Wilk-test, P value ${shapiroPValueNonSmokerHealth}.

  The test indicates that we ${shapiroPValueNonSmokerHealth < 0.05 ? 'do not' : 'do'} have an normal distribution.   
`);

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

let smokerHealthVector = new jerzy.Vector(smokers.map(x => x.general_health).slice(0, 50));
let shapiroPValueSmokerHealth = jerzy.Normality.shapiroWilk(smokerHealthVector).p;
addMdToPage(`
  Shapiro/Wilk-test, P value ${shapiroPValueSmokerHealth}.
  
  The test indicates that we ${shapiroPValueSmokerHealth < 0.05 ? 'do not' : 'do'} have an normal distribution.   
`);

// Why does Shapiro-Wilk give us so low p-values?
// Thomas will investigate further!

// For now: We decide to proceed with a null hypothesis test,
// using a two-sample T-test anyway

let pValueTtest = jerzy.StudentT.test(smokerHealthVector, 0.2);

console.log(pValueTtest);