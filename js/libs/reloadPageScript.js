export default function reloadPageScript(scriptSrc) {
  let scriptToReload = document.querySelector('script.page-script') || { remove: () => { } };
  let src = scriptSrc || scriptToReload.getAttribute('src');
  src = src.split('?')[0] + '?' + Math.random();
  scriptToReload.remove();
  let newScript = document.createElement('script');
  newScript.setAttribute('type', 'module');
  newScript.classList.add('page-script');
  newScript.setAttribute('src', src);
  document.body.classList.add('bigBottomPad');
  newScript.onload = () => document.body.classList.remove('bigBottomPad');
  document.querySelector('main').innerHTML = '';
  document.body.append(newScript);
}