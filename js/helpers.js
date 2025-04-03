import * as s from './libs/simple-statistics.js';
import jerzy from './libs/jerzy.js';

// Trim by standard deviation

export function trimByStdDev(data, stdDevDistance = 3, isSample = true, show = false) {
  let mean = s.mean(data);
  let stdDev = isSample ? s.sampleStandardDeviation(data) : s.standardDeviation(data);
  let lowerBound = mean - stdDev * stdDevDistance;
  let upperBound = mean + stdDev * stdDevDistance;
  let outliers = data.filter(x => x < lowerBound || x > upperBound);
  let filtered = data.filter(x => x >= lowerBound && x <= upperBound);
  return show ? outliers : filtered;
}

export function showTrimByStdDev(data, stdDevDistance = 3, isSample = true) {
  return trimByStdDev(data, stdDevDistance = 3, isSample = true, true);
}

// Trim by percentiles

export function trimByPercentiles(data, percentileLow = 5, percentileHigh = percentileLow, show) {
  let lowerBound = s.quantile(data, percentileLow / 100);
  let upperBound = s.quantile(data, 1 - (percentileHigh / 100));
  let outliers = data.filter(x => x < lowerBound || x > upperBound);
  let filtered = data.filter(x => x >= lowerBound && x <= upperBound);
  return show ? outliers : filtered;
}

export function showTrimByPercentiles(data, percentileLow = 5, percentileHigh = percentileLow) {
  return trimByPercentiles(data, percentileLow, percentileHigh, true);
}

// Calculate Shapiro-Wilk W and p values

export function shapiroWilk(data) {
  let vector = new jerzy.Vector(data);
  let result = jerzy.Normality.shapiroWilk(vector);
  // remove - values from p value (they only point to the direction of the relationship)
  result.p = Math.abs(result.p);
  return result;
}
