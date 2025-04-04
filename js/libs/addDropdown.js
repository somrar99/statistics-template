import addToPage from "./addToPage.js";
import reloadPageScript from "./reloadPageScript.js";

globalThis.dropdownValues = globalThis.dropdownValues || {};

export default function addDropdown(label, data, initialValue = '') {
  let name = 'sel' + (document.querySelectorAll('main select').length + 1);
  initialValue = window.dropdownValues[window.hash + '.' + name] || initialValue;
  addToPage(`
    <label class="my-3 me-4 dropdown">
      <table style="border:0">
      <tr>
      <td class="pe-3">
      ${label}: 
      </td>
      <td>
      <select name="${name}" class="form-select">
        ${data.map(x => `<option ${initialValue == x ? 'selected' : ''}>${x}</option>`)}
      </select>
      </td>
      </table>
    </label>
  `);
  return initialValue || data[0];
}

globalThis.document && document.body.addEventListener('change', e => {
  let select = e.target.closest('select');
  if (!select) { return; }
  globalThis.dropdownValues[window.hash + '.' + select.getAttribute('name')] = select.value;
  reloadPageScript();
});