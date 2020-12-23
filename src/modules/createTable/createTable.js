/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */

export default function createTable(globalData, configuration, population, summary) {
  const container = document.querySelector('#custom-data');
  const popul = {};
  for (const item of population) {
    popul[item.name] = item.population;
  }
  const data = configuration.country === 'all' ? globalData.data : globalData;
  let confirmed;
  let deaths;
  let recovered;
  let newConfirmed;
  let newDeaths;
  let newRecovered;
  let confirmed100;
  let deaths100;
  let recovered100;
  let newConfirmed100;
  let newDeaths100;
  let newRecovered100;
  let element;
  let name;

  let to100 = 1;
  if (configuration.country === 'all') {
    to100 = 7827000000 / 100000;
    element = data[0];
    confirmed = element.confirmed;
    deaths = element.deaths;
    recovered = element.recovered;
    newConfirmed = element.new_confirmed;
    newDeaths = element.new_deaths;
    newRecovered = element.new_recovered;
    confirmed100 = confirmed / to100;
    deaths100 = deaths / to100;
    recovered100 = recovered / to100;
    newConfirmed100 = newConfirmed / to100;
    newDeaths100 = newDeaths / to100;
    newRecovered100 = newRecovered / to100;
  } else if (configuration.country !== 'all') {
    element = [data[data.length - 1], data[data.length - 2]];
    switch (element[0].Country) {
      case 'Bolivia':
        name = 'Bolivia (Plurinational State of)';
        break;
      case 'Cape Verde':
        name = 'Cabo Verde';
        break;
      case 'Congo (Kinshasa)':
        name = 'Congo (Democratic Republic of the)';
        break;
      case 'Congo (Brazzaville)':
        name = 'Congo';
        break;
      case 'Holy See (Vatican City State)':
        name = 'Holy See';
        break;
      case 'Iran, Islamic Republic of':
        name = 'Iran (Islamic Republic of)';
        break;
      case 'Korea (South)':
        name = 'Korea (Republic of)';
        break;
      case 'Lao PDR':
        name = `Lao People's Democratic Republic`;
        break;
      case 'Macao, SAR China':
        name = `Macao`;
        break;
      case 'Macedonia, Republic of':
        name = `Macedonia (the former Yugoslav Republic of)`;
        break;
      case 'Moldova':
        name = `Moldova (Republic of)`;
        break;
      case 'Palestinian Territory':
        name = `Palestine, State of`;
        break;
      case 'Saint Vincent and Grenadines':
        name = `Saint Vincent and the Grenadines`;
        break;
      case 'Syrian Arab Republic (Syria)':
        name = `Syrian Arab Republic`;
        break;
      case 'Taiwan, Republic of China':
        name = `Taiwan`;
        break;
      case 'United Kingdom':
        name = `United Kingdom of Great Britain and Northern Ireland`;
        break;
      case 'Venezuela (Bolivarian Republic)':
        name = `Venezuela (Bolivarian Republic of)`;
        break;

      default:
        name = element[0].Country;
        break;
    }
    console.log(name);
    to100 = popul[name] / 100000;
    confirmed = element[0].Confirmed;
    deaths = element[0].Deaths;
    recovered = element[0].Recovered;
    newConfirmed = element[0].Confirmed - element[1].Confirmed;
    newDeaths = element[0].Deaths - element[1].Deaths;
    newRecovered = element[0].Recovered - element[1].Recovered;
    confirmed100 = confirmed / to100;
    deaths100 = deaths / to100;
    recovered100 = recovered / to100;
    newConfirmed100 = newConfirmed / to100;
    newDeaths100 = newDeaths / to100;
    newRecovered100 = newRecovered / to100;
  }

  container.innerHTML = `
  <div class="country">Current territory: ${
    configuration.country === 'all' ? '<span>world</span>' : `<span>${configuration.country}`
  }</div>
  <div class="values">
  <div>
  <div class="green">Recovered: <span>${recovered}</span></div>
  <div class="green">New recovered: <span>${newRecovered}</span></div>
  <div class="green">Recovered on 100 th.: <span>${+recovered100.toFixed(2)}</span></div>
  <div class="green">New recovered on 100 th.: <span>${+newRecovered100.toFixed(2)}</span></div>
  </div>
  <div>
  <div class="yellow">Confirmed: <span>${confirmed}</span></div>
  <div class="yellow">New confirmed: <span>${newConfirmed}</span></div>
  <div class="yellow">Confirmed on 100 th.: <span>${+confirmed100.toFixed(2)}</span></div>
  <div class="yellow">New confirmed on 100 th.: <span>${+newConfirmed100.toFixed(2)}</span></div>
  </div>
<div>
  <div class="red">Deaths: <span>${deaths}</span></div>
  <div class="red">New deaths: <span>${newDeaths}</span></div>
  <div class="red">Deaths on 100 th.: <span>${+deaths100.toFixed(2)}</span></div>
  <div class="red">New deaths on 100 th.: <span>${+newDeaths100.toFixed(2)}</span></div>
</div>
  </div>`;
}
