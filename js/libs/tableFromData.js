import addToPage from './addToPage.js'

// note: expecting data to be an array of objects
export default function tableFromData({
  data,
  fixedHeader = false,
  numberFormatLocale = 'sv-SE',
  numberFormatOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  },
  columnNames = [],
}) {
  let nFormat = Intl.NumberFormat(numberFormatLocale, numberFormatOptions);
  // expect all objects to have the same keys, 
  // so read the keys from the first element
  let entries = Object.entries(data[0]);
  let count = 0;
  columnNames = columnNames.slice();
  while (columnNames.length) {
    entries[count++][0] = columnNames.shift();
  }
  entries.forEach(x => x[0] = x[0].replaceAll('-', '&#8209;'));
  let id = (Math.random() + '').replace('0.', 't');
  let html = `<div class="table-responsive"><table id=${id} class="table table-striped"><thead><tr>`;
  html += entries.map(x => `<th class="align-top `
    + (isNaN(parseFloat(x[1])) ? '' : 'right') + `">${x[0]}</th>`).join('');
  html += '</tr><tbody>';
  for (let row of data) {
    html += '<tr>';
    for (let columnValue of Object.values(row)) {
      html += `<td class="`
        + (isNaN(parseFloat(columnValue)) ? '' : 'right') + `">${isNaN(columnValue) ? columnValue : columnValue === null ? null : nFormat.format(columnValue)}</td>`;
    }
    html += '</tr>';
  }
  html += '</tbody></table></div>'
  addToPage(html);
  if (fixedHeader) {
    let element = document.querySelector(`#${id} thead`);
    let parentElement = element.parentElement;
    let timeout;
    let listener = () => {
      timeout && (element.style.visibility = 'hidden');
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        let coordinates = parentElement.getBoundingClientRect();
        if (coordinates.width === 0) {
          window.removeEventListener('scroll', listener);
        }
        if (coordinates.y < 0) {
          element.style.transform = 'translate3d(0, ' + (-coordinates.y + 55) + 'px, 0)';
        } else {
          element.style.transform = 'translate3d(0,0,0)';
        }
        element.style.visibility = 'visible';
        timeout = 0;
      }, 100);
    };
    window.addEventListener('scroll', listener);
  }
}