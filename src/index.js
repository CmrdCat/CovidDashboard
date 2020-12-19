import 'bootstrap';
import globalCasesTotal from './modules/globalCasesTotal/globalCasesTotal';
import casesByCountry from './modules/casesByCountry/casesByCountry';
import dateInfo from './modules/dateInfo/dateInfo';
import createGraph from './modules/graphs/createGraph';
import fullScreen from './modules/fullScreenButton/fullScreen';


// const configuration = {
//   country: 'all' || 'Belarus',
//   type: 'recovered' || 'confirmed' || 'deaths',
//   duration: 'all' || 'lastDay',
//   count: 'absolute' || 'on100',
// };

const configuration = {
  country: 'all',
  type: 'recovered',
  duration: 'lastDay',
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

async function init() {
  const url = `https://api.covid19api.com/summary`;
  // const res = await fetch(url);
  // const globalData = await res.json();
  getData(url).then((data) => {
    globalCasesTotal(data);
    casesByCountry(data, configuration);
    dateInfo(data);
    fullScreen();
  });

  getDataForGraphs(
    configuration.country === 'all'
      ? `https://corona-api.com/timeline`
      : `https://api.covid19api.com/dayone/country/${configuration.country}/status/${configuration.type}`
  ).then((data) => {
    createGraph(data, configuration);
  });
}

init();
