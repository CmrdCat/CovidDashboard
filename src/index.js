import 'bootstrap';
import globalCasesTotal from './modules/globalCasesTotal/globalCasesTotal';
import casesByCountry from './modules/casesByCountry/casesByCountry';
import dateInfo from './modules/dateInfo/dateInfo';
import createGraph from './modules/graphs/createGraph';
import getSelectorChange from './modules/graphs/getSelectorChange';
import fullScreen from './modules/fullScreenButton/fullScreen';
import createMap from './modules/map/createMap';

import findCountry from './modules/createCountryProperty/createCountryProperty';
// const configuration = {
//   country: 'all' || 'Belarus',
//   type: 'recovered' || 'confirmed' || 'deaths',
//   duration: 'all' || 'lastDay',
//   count: 'absolute' || 'on100',
// };

const configuration = {
  country: 'all',
  type: 'recovered',
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

async function getDataForMap(url) {
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
  console.log(request.Countries);
}

async function init() {
  getDataForMap2();
  fullScreen();
  // eslint-disable-next-line no-unused-vars

  const url = `https://api.covid19api.com/summary`;
  getData(url).then((data) => {
    globalCasesTotal(data);
    casesByCountry(data, configuration);
    dateInfo(data);
    console.log(data);
  });

  getDataForGraphs(
    configuration.country === 'all'
      ? `https://corona-api.com/timeline`
      : `https://api.covid19api.com/dayone/country/${configuration.country}`
  ).then((data) => {
    createGraph(data, configuration);
    getSelectorChange(data, configuration);
  });

  getDataForMap('https://corona.lmao.ninja/v2/countries').then((data) => {
    createMap(data, configuration);
  });
}

init();
findCountry();
