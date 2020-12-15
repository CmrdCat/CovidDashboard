import 'bootstrap';
import globalCasesTotal from './modules/globalCasesTotal/globalCasesTotal';

async function init() {
  const url = `https://api.covid19api.com/summary`;
  const res = await fetch(url);
  const globalData = await res.json();
  globalCasesTotal(globalData);
}

init();

// let properties = {
//   country: 'all' || 'Belarus',
//   type: 'recovered' || 'cases' || 'death',
//   duration: 'all' || 'lastDay',
//   count: 'absolute' || 'on100',
// }
