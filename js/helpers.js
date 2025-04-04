import * as s from './libs/simple-statistics.js';
import addMdToPage from './libs/addMdToPage.js';
import addDropdown from './libs/addDropdown.js';
import addToPage from './libs/addToPage.js';
import stdLib from './libs/stdLib.js';

// Trim by standard deviation
export function trimByStdDev(data, stdDevDistance = 3, isSample = true) {
  let mean = s.mean(data);
  let stdDev = isSample ? s.sampleStandardDeviation(data) : s.standardDeviation(data);
  let lowerBound = mean - stdDev * stdDevDistance;
  let upperBound = mean + stdDev * stdDevDistance;
  let outliers = data.filter(x => x < lowerBound || x > upperBound);
  let keep = data.filter(x => x >= lowerBound && x <= upperBound);
  return { outliers, data: keep };
}

// Trim by percentiles
export function trimByPercentiles(data, percentileLow = 5, percentileHigh = percentileLow) {
  let lowerBound = s.quantile(data, percentileLow / 100);
  let upperBound = s.quantile(data, 1 - (percentileHigh / 100));
  let outliers = data.filter(x => x < lowerBound || x > upperBound);
  let keep = data.filter(x => x >= lowerBound && x <= upperBound);
  return { outliers, data: keep };
}

// User interface for choosing a group and filter out outliers
export function chooseGroupPlusOutlierFiltering(dropdownLabel, groups, chosen1, chosen2) {
  // Dropdowns for choice of group + filtering of outliers
  let chosenGroupLabel = addDropdown(dropdownLabel, groups.map(x => x.label), chosen1);
  let filterOutliers = addDropdown('Extremvärden', [
    'Ja, ingen filtrering', 'Nej, ta bort mer än ± 3 x standardavvikelse',
    'Nej, ta bort lägsta och högsta 5% percentiler', 'Nej, ta bort lägsta och högsta 10% percentiler'], chosen2);

  // Get the general health data for the chosen group
  let chosenGroup = groups.find(x => x.label == chosenGroupLabel);
  let generalHealth = chosenGroup.data.map(x => x.general_health);

  // Filter outliers according to dropdown choice
  let filtered =
    filterOutliers.includes('standardavvikelse') ? trimByStdDev(generalHealth) :
      filterOutliers.includes('5% percentiler') ? trimByPercentiles(generalHealth) :
        filterOutliers.includes('10% percentiler') ? trimByPercentiles(generalHealth, 10) :
          { data: generalHealth, outliers: [] };

  // Perform Shapiro-Wilk-test and give a text warning if not normal distribution
  let judge = stdLib.stats.shapiroWilkTest(filtered.data).p < 0.05 ? '*&ndash; ej normalfördelning*' : '';

  // Show how many outliers the filtering removed
  addMdToPage(`Antal: **${filtered.data.length}** ${generalHealth.length === filtered.data.length ? ''
    : `(Ursprungligen **${generalHealth.length}**, antal borttagna extremvärden: **${filtered.outliers.length}**)`}
   ${judge}`);

  return filtered;
}