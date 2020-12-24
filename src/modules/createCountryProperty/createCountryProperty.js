/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-cycle
import init from '../../index';

const wrapper = document.getElementById('custom-data');

function renderList(fields, configuration) {
  wrapper.innerHTML = `
    <div class="globalDataContainer localDataContainer">
      <p>Country: ${fields.Country}</p>
      <p>Population: ${fields.Population}</p>

      <div class="selection-wrapper pt-1 pb-2">
        <div class="selector-wrapper">
          <h3>Select reporting period:</h3>
          <select class="form-control form-control-sm ml-2 mr-2" id="list-select-duration">
            <option>Summary</option>
            <option>Сhanges per day</option>
          </select>
        </div>
        
        <div class="selector-wrapper">
          <h3>Choose calculation method:</h3>
          <select class="form-control form-control-sm ml-2 mr-2" id="list-select-count">
            <option>Absolute</option>
            <option>Per 100 thousand population</option>
          </select>
        </div>
      </div>

      <ul id="localList">
        <li>Confirmed: ${fields.Confirmed}</li>
        <li>Death: ${fields.Deaths}</li>
        <li>Recovered: ${fields.Recovered}</li>
      </u>

    </div>
  `;

  const selectorDuration = document.querySelector('#list-select-duration');
  selectorDuration.value = configuration.duration === 'all' ? 'Summary' : 'Сhanges per day';
  selectorDuration.addEventListener('change', () => {
    switch (selectorDuration.value) {
      case 'Summary':
        configuration.duration = 'all';
        break;
      case 'Сhanges per day':
        configuration.duration = 'lastDay';
        break;
      default:
        break;
    }
    init();
  });

  const selectorCount = document.querySelector('#list-select-count');
  selectorCount.value =
    configuration.count === 'absolute' ? 'Absolute' : 'Per 100 thousand population';

  selectorCount.addEventListener('change', () => {
    switch (selectorCount.value) {
      case 'Absolute':
        configuration.count = 'absolute';
        break;
      case 'Per 100 thousand population':
        configuration.count = 'on100';
        break;
      default:
        break;
    }
    init();
  });
}

const createCountryProperty = (summaryData, configuration) => {
  const selectedCountry = configuration.country;

  if (selectedCountry !== 'all') {
    const countryData = summaryData.Countries.find((item) => item.Country === selectedCountry);
    const to100 = countryData.Population / 100000;

    let countryFields = {};

    if (configuration.duration === 'all' && configuration.count === 'absolute') {
      countryFields = {
        Country: countryData.Country,
        Population: countryData.Population,
        Confirmed: countryData.TotalConfirmed,
        Deaths: countryData.TotalDeaths,
        Recovered: countryData.TotalRecovered,
      };
    } else if (configuration.duration === 'lastDay' && configuration.count === 'absolute') {
      countryFields = {
        Country: countryData.Country,
        Population: countryData.Population,
        Confirmed: countryData.NewConfirmed,
        Deaths: countryData.NewDeaths,
        Recovered: countryData.NewRecovered,
      };
    } else if (configuration.duration === 'all' && configuration.count === 'on100') {
      countryFields = {
        Country: countryData.Country,
        Population: countryData.Population,
        Confirmed: Math.round(countryData.NewConfirmed / to100),
        Deaths: Math.round(countryData.NewDeaths / to100),
        Recovered: Math.round(countryData.NewRecovered / to100),
      };
    } else if (configuration.duration === 'lastDay' && configuration.count === 'on100') {
      countryFields = {
        Country: countryData.Country,
        Population: countryData.Population,
        Confirmed: Math.round(countryData.NewConfirmed / to100),
        Deaths: Math.round(countryData.NewDeaths / to100),
        Recovered: Math.round(countryData.NewRecovered / to100),
      };
    }

    console.log('Country Fields', countryFields);

    renderList(countryFields, configuration);
  } else {
    const worldData = summaryData.Global;
    const worldPopulation = 7827000000;
    const to100 = worldPopulation / 100000;

    let worldFields = {};

    if (configuration.duration === 'all' && configuration.count === 'absolute') {
      worldFields = {
        Country: 'world',
        Population: worldPopulation,
        Confirmed: worldData.TotalConfirmed,
        Deaths: worldData.TotalDeaths,
        Recovered: worldData.TotalRecovered,
      };
    } else if (configuration.duration === 'lastDay' && configuration.count === 'absolute') {
      worldFields = {
        Country: 'world',
        Population: worldPopulation,
        Confirmed: worldData.NewConfirmed,
        Deaths: worldData.NewDeaths,
        Recovered: worldData.NewRecovered,
      };
    } else if (configuration.duration === 'all' && configuration.count === 'on100') {
      worldFields = {
        Country: 'world',
        Population: worldPopulation,
        Confirmed: Math.round(worldData.TotalConfirmed / to100),
        Deaths: Math.round(worldData.TotalDeaths / to100),
        Recovered: Math.round(worldData.TotalRecovered / to100),
      };
    } else if (configuration.duration === 'lastDay' && configuration.count === 'on100') {
      worldFields = {
        Country: 'world',
        Population: worldPopulation,
        Confirmed: Math.round(worldData.NewConfirmed / to100),
        Deaths: Math.round(worldData.NewDeaths / to100),
        Recovered: Math.round(worldData.NewRecovered / to100),
      };
    }

    renderList(worldFields, configuration);
  }
};

export default createCountryProperty;
