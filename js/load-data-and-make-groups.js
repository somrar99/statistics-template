import csvLoad from "./libs/csvLoad.js";
import * as s from './libs/simple-statistics.js';

// Load the dataset from csv and sort on id
let data = (await csvLoad('smokinghealth.csv'));
data.sort((a, b) => a.ID > b.ID ? 1 : -1);

// Copy data before remove non-answers to smoking_status
export let rawData = data.slice();

// Remove respondents that haven't answered smoking_status
data = data.filter(x => x.smoking_status != 0);

// How people responded?
export let basicGroups = [
  { label: 'har ej besvarat frågan', data: rawData.filter(x => x.smoking_status == 0) },
  { label: 'rökare (för närvarande)', data: data.filter(x => x.smoking_status == 'currently smokes') },
  { label: 'före detta rökare', data: data.filter(x => x.smoking_status == 'previously smoked') },
  { label: 'icke rökare (aldrig rökt)', data: data.filter(x => x.smoking_status == 'never smoked') },
]

// Basic groups count (for pie chart)
export let basicGroupSums = basicGroups.map(x => ({ label: x.label, sum: x.data.length }));

// Divide the data into groups
export let groups = [
  { label: 'alla', data: rawData },
  { label: 'alla som svarat kring rökstatus', data },
  ...basicGroups,
  { label: 'rökare (nu eller tidigare)', data: data.filter(x => x.smoking_status == 'currently smokes' || x.smoking_status == 'previously smoked') },
  { label: 'icke-rökare (för närvarande)', data: data.filter(x => x.smoking_status == 'never smoked' || x.smoking_status != 'currently smokes') }
];

// Sum groups (how many in each?)
export let groupSums = groups.map(x => (
  {
    label: x.label,
    sum: x.data.length,
    percent: (x.data.length * 100 / rawData.length).toFixed(1) + '%',
    healthMean: s.mean(x.data.map(x => x.general_health)).toFixed(1)
  }
)).sort((a, b) => a.sum > b.sum ? 1 : -1);