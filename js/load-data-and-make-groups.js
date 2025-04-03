import csvLoad from "./libs/csvLoad.js";

// Load the dataset from csv
let data = await csvLoad('smokinghealth.csv');

// copy data before remiove non-answers to smoking_status
let rawData = data.slice();

// Remove respondents that haven't answered smoking_status
data = data.filter(x => x.smoking_status != 0);

// Check unique values
console.log([...new Set(data.map(x => x.smoking_status))])

// Divide the data into groups
export let groups = [
  { label: 'alla', data: rawData },
  { label: 'alla som svarat kring rökstatus', data },
  { label: 'icke rökare (aldrig rökt)', data: data.filter(x => x.smoking_status == 'never smoked') },
  { label: 'icke-rökare (för närvarande)', data: data.filter(x => x.smoking_status == 'never smoked' || x.smoking_status != 'currently smokes') },
  { label: 'rökare (för närvarande)', data: data.filter(x => x.smoking_status == 'currently smokes') },
  { label: 'rökare (nu eller tidigare)', data: data.filter(x => x.smoking_status == 'currently smokes' || x.smoking_status == 'previously smoked') }
];

// Sum groups (how many in each?)
export let groupSums = groups.map(x => ({ label: x.label, sum: x.data.length }));