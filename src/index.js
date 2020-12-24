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
import createCountryProperty from './modules/createCountryProperty/createCountryProperty';
// eslint-disable-next-line
import Keyboard from './modules/keyboard/keyboard';
// const CONFIGURATION = {
//   country: 'all' || 'Belarus',
//   type: 'recovered' || 'confirmed' || 'deaths',
//   duration: 'all' || 'lastDay',
//   count: 'absolute' || 'on100',
// };

const CONFIGURATION = {
  country: 'all',
  type: 'confirmed',
  duration: 'all',
  count: 'on100',
};

const SUMMARY_URL = `https://api.covid19api.com/summary`;
const POPULATION_URL = `https://restcountries.eu/rest/v2/all?fields=name;population`;

async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка о адресу ${url}, 
		статус ошибки ${response.status}!`);
  }
  return response.json();
}

fullScreen();

async function init() {
  try {
    const summaryData = await getData(SUMMARY_URL);

    if (summaryData.Message) {
      $('#myModal').modal('show');
    } else {
      const populationData = await getData(POPULATION_URL);

      globalCasesTotal(summaryData);
      casesByCountry(summaryData, populationData, CONFIGURATION);
      createCountryProperty(summaryData, CONFIGURATION);
      dateInfo(summaryData);
      inputFindCountry();
      createMap(summaryData, CONFIGURATION, populationData);
      Keyboard.elements.textarea = document.querySelector('#input');

      Keyboard.init();
      const GRAPH_URL =
        CONFIGURATION.country === 'all'
          ? `https://corona-api.com/timeline`
          : `https://api.covid19api.com/dayone/country/${CONFIGURATION.country}`;
      const graphData = await getData(GRAPH_URL);

      createGraph(graphData, CONFIGURATION, populationData);
      getSelectorChange(graphData, CONFIGURATION, populationData);
    }
  } catch (e) {
    $('#myModal').modal('show');
  }
}

(async () => {
  await init();
})();

export default init;
