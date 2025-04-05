import * as s from './libs/simple-statistics.js';
import jload from './libs/jload.js';
import drawGoogleChart from './libs/drawGoogleChart.js';
import addToPage from './libs/addToPage.js';

// Usage 
let data = await jload('test-data.json');
console.log("original data:", data)

s.shuffleInPlace(data);
console.log("after shuffle: ",data)



addToPage(`<pre>

  Data: ${data}

  Min (minsta värde): ${s.min(data)}
  Max (största värde): ${s.max(data)}
  Variationsbredd: ${s.max(data) - s.min(data)}
  Summa: ${s.sum(data)}

  Medelvärde: ${s.mean(data).toFixed(2)}
  Median: ${s.median(data)}
  Typvärde(mode): ${s.mode(data)}
  Typvärde(modefast): ${s.modeFast(data)}

  sorted data: ${data.sort()}
  Första kvartil: ${s.quantile(data, 0.25)}
  Andra kvartil: ${s.quantile(data, 0.5)} (samma som median)
  Tredje kvartil:  ${s.quantile(data, 0.75)}

  Varians: ${s.variance(data).toFixed(2)}
  Standardavvikelse: ${s.standardDeviation(data).toFixed(2)}

</pre>`);


// Draw a Google Charts
drawGoogleChart({
  type: 'PieChart',
  data: 'pie-chart-data.json',
  options: {
    title: 'My Daily Activities',
    height: 500
  }
});



