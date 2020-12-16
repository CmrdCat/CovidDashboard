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

const getData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка о адресу ${url}, 
		статус ошибки ${response.status}!`);
  }
  return response.json();
};

async function init() {
  const url = `https://api.covid19api.com/summary`;
  // const res = await fetch(url);
  // const globalData = await res.json();
  getData(url).then((data) => {
    globalCasesTotal(data);
    casesByCountry(data, configaration);
    dateInfo(data);
  });
}

init();
