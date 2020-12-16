import 'bootstrap';
import globalCasesTotal from './modules/globalCasesTotal/globalCasesTotal';
import casesByCountry from './modules/casesByCountry/casesByCountry';
import dateInfo from './modules/dateInfo/dateInfo';

const configaration = {
  country: 'all' || 'Belarus',
  type: 'recovered' || 'cases' || 'death',
  duration: 'all' || 'lastDay',
  count: 'absolute' || 'on100',
};

async function init() {
  const url = `https://api.covid19api.com/summary`;
  const res = await fetch(url);
  const globalData = await res.json();
  globalCasesTotal(globalData);
  casesByCountry(globalData, configaration);
  dateInfo(globalData);
}

init();
