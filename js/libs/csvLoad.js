export default async function csvLoad(url, separator = ',', stringQuote = '"') {
  let text = (await (await fetch(url)).text()).split('\r\n').join('\n').split('\n').filter(x => x.trim());
  let regEx = new RegExp(`${stringQuote}[^${stringQuote}]+${stringQuote}`, 'g')
  text = text.map(x => x.replace(regEx, inQuotes =>
    inQuotes.replaceAll(separator, '____SEPE_RATOR____').slice(1, -1)
  ));
  let columnNames = text.splice(0, 1)[0].split(separator).map(x => x.trim()
    .replaceAll('____SEPE_RATOR____', separator));
  let data = [];
  for (let row of text) {
    let obj = {}, cnames = columnNames.slice();
    for (let columnValue of row.split(separator)) {
      columnValue = isNaN(columnValue) ? columnValue.replaceAll('____SEPE_RATOR____', separator) : +columnValue
      obj[cnames.shift()] = columnValue;
    }
    data.push(obj);
  }
  return data;
}