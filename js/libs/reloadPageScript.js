let importMem = {};
let currentPage;

export default async function reloadPageScript(scriptSrc) {
  let src = scriptSrc || currentPage;
  currentPage = src;
  src = src.split('?')[0];
  if (!importMem[src]) {
    console.log(src);
    importMem[src] = (await import(src + '?wrap')).default;
  }
  document.body.classList.add('bigBottomPad');
  document.querySelector('main').innerHTML = '';
  importMem[src]();
  document.body.classList.remove('bigBottomPad');
}