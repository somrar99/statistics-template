import csvLoad from './libs/csvLoad.js';

let data = await csvLoad('smoking-health.csv');

let smokingStatuses = [...new Set(data.map(x => x.smoking_status))];

console.log(smokingStatuses);

let smokingStatusCount = smokingStatuses.map(status => ({
  status,
  count: data.filter(x => x.smoking_status == status).length
}));

console.log(smokingStatusCount);

let smokers = data.filter(x => x.smoking_status == 'currently smokes' || x.smoking_status == 'previously smoked');
let nonSmokers = data.filter(x => x.smoking_status == 'never smoked');
let unclear = data.filter(x => x.smoking_status == '0');

console.log('smokers - how many?', smokers.length);
console.log('non smokers - how many?', nonSmokers.length);
console.log('unclear - how many?', unclear.length);

