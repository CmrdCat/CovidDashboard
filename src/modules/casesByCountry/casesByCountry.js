/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */

// eslint-disable-next-line import/no-cycle
import init from '../../index';
// eslint-disable-next-line import/no-cycle
import Country from '../createCountry/createCountry';

export default async function casesByCountry(globalData, population, configuration) {
  console.log(configuration);
  document.getElementById('cases-by-country').innerHTML = '';
  const arrayOfCountryes = [];
  let flag = configuration.count;

  const container = document.getElementById('cases-by-country');

  const navBlock = document.createElement('div');
  navBlock.classList.add('navigation-in-cases');

  const selectCase = document.createElement('select');
  for (const key in globalData.Global) {
    if (typeof key !== 'object') {
      const property = key;
      const duration = configuration.duration === 'all' ? 'total' : 'new';
      console.log(configuration.type, duration);
      selectCase[selectCase.length] = new Option(key, key);
      if (
        property.toLowerCase().includes(configuration.type) &&
        property.toLowerCase().includes(duration)
      ) {
        selectCase[selectCase.length - 1].selected = true;
      }
    }
  }
  selectCase.onchange = () => {
    switch (true) {
      case selectCase.value.includes('Recovered'):
        // eslint-disable-next-line
        configuration.type = 'recovered';
        break;
      case selectCase.value.includes('Confirmed'):
        // eslint-disable-next-line
        configuration.type = 'confirmed';
        break;
      case selectCase.value.includes('Death'):
        // eslint-disable-next-line
        configuration.type = 'deaths';
        break;
      default:
        break;
    }
    if (selectCase.value.includes('Total')) {
      // eslint-disable-next-line
      configuration.duration = 'all';
    } else {
      // eslint-disable-next-line
      configuration.duration = 'LastDay';
    }
    // eslint-disable-next-line
    console.log(configuration);
    init();
  };
  navBlock.append(selectCase);

  const selectData = document.createElement('input');
  selectData.setAttribute('type', 'checkbox');
  selectData.classList.add('select');

  if (configuration.count === 'on100') {
    selectData.checked = true;
  }
  // eslint-disable-next-line no-unused-expressions

  selectData.onclick = () => {
    init();
    if (flag === 'absolute') {
      flag = 'on100';
      // eslint-disable-next-line
      configuration.count = 'on100';
    } else {
      flag = 'absolute';
      // eslint-disable-next-line
      configuration.count = 'absolute';
    }
  };
  navBlock.append(selectData);

  // eslint-disable-next-line no-unused-expressions
  const list = document.createElement('ul');
  const countries = globalData.Countries;
  for (const country of countries) {
    const countryReg = country.Country.replace(/[^A-Za-z]/g, '');
    const populationForCountry = population.find((el) => {
      const populationNameReg = el.name.replace(/[^A-Za-z]/g, '');
      if (el.name === 'Cabo Verde') {
        if (country.Country === 'Cape Verde') {
          return true;
        }
      }
      if (el.name === 'Korea (Republic of)') {
        if (country.Country === 'Korea (South)') {
          return true;
        }
      }
      if (el.name === "Lao People's Democratic Republic") {
        if (country.Country === 'Lao PDR') {
          return true;
        }
      }
      if (el.name === 'Macedonia (the former Yugoslav Republic of)') {
        if (country.Country === 'Macedonia, Republic of') {
          return true;
        }
      }
      if (el.name === 'Palestine, State of') {
        if (country.Country === 'Palestinian Territory') {
          return true;
        }
      }
      if (el.name === 'Saint Vincent and the Grenadines') {
        if (country.Country === 'Saint Vincent and Grenadines') {
          return true;
        }
      }
      if (countryReg.includes(populationNameReg) || populationNameReg.includes(countryReg)) {
        return true;
      }
      return false;
    });
    country.Population = populationForCountry.population;
    const listItem = new Country(list, country, flag, selectCase.value);
    const countryName = listItem.Country;

    if (configuration.country === listItem.Country) {
      listItem.el.setAttribute('id', 'active');
    }
    listItem.el.onclick = function () {
      // eslint-disable-next-line
      configuration.country = countryName;
      init();
    };
    arrayOfCountryes.push(listItem);
  }

  container.append(navBlock);
  container.append(list);

  if (configuration.country !== 'Global') {
    document.getElementById('active').scrollIntoView();
  }
}
