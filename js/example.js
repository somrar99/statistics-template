import addMdToPage from "./libs/addMdToPage.js";
import drawGoogleChart from "./libs/drawGoogleChart.js";
import jerzy from './libs/jerzy.js';
import jload from "./libs/jload.js";
import makeChartFriendly from "./libs/makeChartFriendly.js";
import * as s from './libs/simple-statistics.js';

// Load the example date
// (a JSON file with values from https://www.kaggle.com/code/turgutguvenc/one-sample-t-test-hypothesis-testing/notebook)
let data = (await jload('exam-times.json')).map(x => ({ examTimeMinutes: x }));

// Visual inspection as a histogram

addMdToPage(`
  ## Är datan normalfördelad?
`);

drawGoogleChart({
  type: 'Histogram',
  data: makeChartFriendly(data, 'Exam time (minutes)'),
  options: {
    height: 500,
    width: 1250,
    histogram: {
      bucketSize: 25
    }
  }
});

addMdToPage(`
  Vid en visuell inspektion av datan i historgram-form, ser den ganska normalfördelad, även om normaldelning inte är perfekt och det finns ett lågt extremvärde.
`);

// Transform the data back to a pure array of numbers
data = data.map(x => x.examTimeMinutes);

// Make a Shapiro-wilks test to get a p-value indication if 
// we have a normal distribution

// the jerzy library want us to transform arrays to "jerzy vectors"
// before we can perform calculations
let dataAsVector = new jerzy.Vector(data);
// calculate the Shapiro-Wilks p value
let shapiroPValue = jerzy.Normality.shapiroWilk(dataAsVector).p;

addMdToPage(`
  ### Shapiro Wilk-test
  Shapiro Wilk-test, **p-värde: ${shapiroPValue.toFixed(3)}** är betydligt större än signifikansnivån, α som vi har satt till 0.05 - dvs. det är troligt att det här är normalfördelad data.
`);

// Since we know now that the data seems to follow
// a normal distribution we can perform a T-test
// for our null hypothesis, that the mean time for writing he exam
// is around nullHypothesisValue

let nullHypothesisValue = 170;

let pValue = jerzy.StudentT.test(dataAsVector, nullHypothesisValue).p;

addMdToPage(`
  ### Nollhypotesprövning
  * Vår **nollhypotes** är att medelvärdet/snitttiden är ca ${nullHypothesisValue} minuter.
  * Vid ett t-test blir **p-värdet ${pValue.toFixed(3)}**.
`);

/*
  * Detta är lägre än signifikansnivån, α som vi har satt till 0.05.
  * Därmed kan vi förkasta vår nollhypotes och anse vår alernativhypotes, att medelvärdet inte är ca 170 minuter är sann.*/

// But what is the actual mean value?
addMdToPage(`
  ### Vad är det faktiska medelvärdet?
  Det faktiska medelvärdet är ${s.mean(data).toFixed(1)} minuter.  
`);