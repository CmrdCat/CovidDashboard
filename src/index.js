/* eslint-disable import/no-cycle */
import 'bootstrap';
import $ from 'jquery';
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
// eslint-disable-next-line
import btnCooseCountry from './modules/btnCooseCountry/btnCooseCountry';
import Keyboard from './modules/keyboard/keyboard';
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
  count: 'on100',
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

fullScreen();
btnCooseCountry(configuration);

export default async function init() {
  console.log('инит');
  const covidSummary = `https://api.covid19api.com/summary`;
  getData(covidSummary)
    .catch(() => {
      $('#myModal').modal('show');
    })
    .then((data) => {
      if (data.Message) {
        $('#myModal').modal('show');
      } else {
        const populationData = `https://restcountries.eu/rest/v2/all?fields=name;population`;
        getData(populationData).then((population) => {
          globalCasesTotal(data);
          casesByCountry(data, population, configuration);
          dateInfo(data);
          inputFindCountry();
          createMap(data, configuration, population);
          getDataForGraphs(
            configuration.country === 'all'
              ? `https://corona-api.com/timeline`
              : `https://api.covid19api.com/dayone/country/${configuration.country}`
          ).then((data1) => {
            createGraph(data1, configuration, population);
            getSelectorChange(data1, configuration, population);
          });
        });
      }
      // eslint-disable-next-line no-unused-vars
    });
  findCountry();
}

init();
Keyboard.initKeyboard();
