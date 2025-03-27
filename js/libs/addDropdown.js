import addToPage from "./addToPage.js";
window.dropdownValues = window.dropdownValues || {};

export default function addDropdown(name, label, data, initialValue = '') {
  initialValue = window.dropdownValues[name] || initialValue;
  addToPage(`
    <label class="my-3">
      ${label}: 
      <select name="${name}" class="form-select">
        ${data.map(x => `<option ${initialValue == x ? 'selected' : ''}>${x}</option>`)}
      </select>
    </label>
  `);
  return initialValue || data[0];
}

document.body.addEventListener('change', e => {
  let select = e.target.closest('select');
  if (!select) { return; }
  window.dropdownValues[select.getAttribute('name')] = select.value;
  document.querySelector('main').innerHTML = '';
  let scriptToReload = document.querySelector('script.page-script');
  let src = scriptToReload.getAttribute('src');
  src = src.split('?')[0] + '?' + Math.random();
  scriptToReload.remove();
  let newScript = document.createElement('script');
  newScript.setAttribute('type', 'module');
  newScript.classList.add('page-script');
  newScript.setAttribute('src', src);
  document.body.append(newScript);
});