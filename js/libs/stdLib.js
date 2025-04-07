import stdLib from '../../node_modules/@stdlib/esm/index.js';

// stdLib.js is a fantastic (and big!) JavaScript-library
// See https://stdlib.io for more on what stdLib.js is!

// Unfortunately it does not include the Shapiro-Wilk test for normality!
// And implementations of that particular algo seems hard to find for JavaScript!

// There is an implentation in Jerzy
// https://github.com/pieterprovoost/jerzy
// It's okayish but has a few problems - see fixes below
// There is also an old port from R:
// https://github.com/rniwa/js-shapiro-wilk
// but that one is missing calculation of p-values
// HAVEN'T FOUND ANY OTHER IMPLEMNTATION!

// So for now, for convenience, we just graft the jerzy
// implementation onto stdLib.stats, so it can be used from there
// (Jerzy is loaded as a global script from index.html as ___jerzy)

const jerzy = globalThis.___jerzy;
stdLib.stats.shapiroWilkTest = function shapiroWilkTest(data) {
  let vector = new jerzy.Vector(data);
  let result = jerzy.Normality.shapiroWilk(vector);
  // sometimes NaN for very small values - set those to 0!
  // + negative p values sometimes ! - bug or sign of skewness direction ?
  // after comparison with https://www.statskingdom.com/shapiro-wilk-test-calculator.html
  // probably a bug so set those to 0!
  result.p = isNaN(result.p) ? 0 : Math.max(0, result.p);
  return result;
}

export default stdLib;