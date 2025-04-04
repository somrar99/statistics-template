export default new Proxy({}, {
  get() {
    throw new Error('Jerzy has been removed as an import from the libraries! This is because its T-test can not calculate correct p-values!');
  }
});