/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import 'bootstrap';
import globalCasesTotal from './modules/globalCasesTotal/globalCasesTotal';
import casesByCountry from './modules/casesByCountry/casesByCountry';
import dateInfo from './modules/dateInfo/dateInfo';
import createGraph from './modules/graphs/createGraph';
import getSelectorChange from './modules/graphs/getSelectorChange';
import fullScreen from './modules/fullScreenButton/fullScreen';
import createMap from './modules/map/createMap';
import findCountry from './modules/createCountryProperty/createCountryProperty';
import inputFindCountry from './modules/findCountry/inputFindCountry';

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

async function init() {
  const covidSummary = `https://api.covid19api.com/summary`;
  // const res = await fetch(url);
  // const globalData = await res.json();
  getData(covidSummary).then((data) => {
    // console.log(data);
    // const countriesArr = data.Countries.map((item) => item.Country);
    // const arr = [];
    // const looool = countriesArr.map((item, index) => {
    //   // eslint-disable-next-line no-alert
    //   const temp1 = '';
    //   if (index < 240) {
    //     // eslint-disable-next-line no-alert
    //     alert(item);
    //     const temp = getData(`https://api.covid19api.com/live/country/${item}`).then((coord) => {
    //       arr[index] = `${item}, ${coord[0].Lat}, ${coord[0].Lon}`;
    //     });
    //     // eslint-disable-next-line no-param-reassign
    //     // eslint-disable-next-line no-return-assign
    //     // eslint-disable-next-line no-return-assign
    //     return temp;
    //   }
    //   return item;
    // });
    // console.log(arr);
    const populationData = `https://restcountries.eu/rest/v2/all?fields=name;population`;
    getData(populationData).then((population) => {
      globalCasesTotal(data);
      casesByCountry(data, population);
      dateInfo(data);
      fullScreen();
      createMap(data, configuration, population);
    });
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
