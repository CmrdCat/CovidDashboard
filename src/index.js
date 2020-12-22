import 'bootstrap';
import globalCasesTotal from './modules/globalCasesTotal/globalCasesTotal';
// eslint-disable-next-line import/no-cycle
import casesByCountry from './modules/casesByCountry/casesByCountry';
import dateInfo from './modules/dateInfo/dateInfo';
import createGraph from './modules/graphs/createGraph';
// eslint-disable-next-line import/no-cycle
import getSelectorChange from './modules/graphs/getSelectorChange';
import fullScreen from './modules/fullScreenButton/fullScreen';
import createMap from './modules/map/createMap';
import inputFindCountry from './modules/findCountry/inputFindCountry';
import findCountry from './modules/createCountryProperty/createCountryProperty';
import btnCooseCountry from './modules/btnCooseCountry/btnCooseCountry';
// const configuration = {
//   country: 'all' || 'Belarus',
//   type: 'recovered' || 'confirmed' || 'deaths',
//   duration: 'all' || 'lastDay',
//   count: 'absolute' || 'on100',
// };

const configuration = {
  country: 'all',
  type: 'confirmed',
  duration: 'all',
  count: 'absolute',
};

async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка о адресу ${url}, 
		статус ошибки ${response.status}!`);
  }
  return response.json();
}
async function getDataForGraphs(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка о адресу ${url}, 
		статус ошибки ${response.status}!`);
  }
  return response.json();
}

// eslint-disable-next-line no-unused-vars
async function getDataForMap2() {
  // eslint-disable-next-line no-unused-vars
  const request = await fetch(`https://api.covid19api.com/premium/summary`, {
    headers: {
      'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
    },
  })
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log('error', error));
}
fullScreen();
btnCooseCountry();
export default async function init() {
  const covidSummary = `https://api.covid19api.com/summary`;
  getData(covidSummary).then((data) => {
    if (data.Message) {
      // eslint-disable-next-line
      alert(data.Message);
    } else {
      const populationData = `https://restcountries.eu/rest/v2/all?fields=name;population`;
      getData(populationData).then((population) => {
        globalCasesTotal(data);
        casesByCountry(data, population, configuration);
        dateInfo(data);
        getDataForMap2();
        inputFindCountry();
        createMap(data, configuration, population);
      });
    }
    // eslint-disable-next-line no-unused-vars
    getDataForGraphs(
      configuration.country === 'all'
        ? `https://corona-api.com/timeline`
        : `https://api.covid19api.com/dayone/country/${configuration.country}`
    ).then((data1) => {
      createGraph(data1, configuration);
      getSelectorChange(data1, configuration);
    });
  });
  findCountry();
}

init();
