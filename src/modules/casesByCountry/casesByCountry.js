/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */

// eslint-disable-next-line import/no-cycle
import init from '../../index';
// eslint-disable-next-line import/no-cycle
import Country from '../createCountry/createCountry';

export default async function casesByCountry(globalData, population, configuration) {
  document.getElementById('cases-by-country').innerHTML = '';
  const arrayOfCountryes = [];
  let flag = configuration.count;

  const container = document.getElementById('cases-by-country');

  const navBlock = document.createElement('div');
  navBlock.classList.add('navigation-in-cases');
  const selectCaseWrapper = document.createElement('div');
  selectCaseWrapper.classList.add('selectCaseWrapper');
  const selectCaseText = document.createElement('p');
  selectCaseText.textContent = 'Show Data:';
  const selectCase = document.createElement('select');
  for (const key in globalData.Global) {
    if (typeof key !== 'object') {
      const property = key;
      const duration = configuration.duration === 'all' ? 'total' : 'new';
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
    init();
  };
  selectCaseWrapper.append(selectCaseText);
  selectCaseWrapper.append(selectCase);
  navBlock.append(selectCaseWrapper);

  const selectDataWrapper = document.createElement('div');
  selectDataWrapper.classList.add('selectDataWrapper');
  const selectDataText = document.createElement('p');
  selectDataText.textContent = 'Calculation Method:';
  const checkboxSpan = document.createElement('span');
  checkboxSpan.classList.add('checkbox');
  checkboxSpan.innerHTML = '<label data-on="Population" data-off="Absolute"></label>';
  const selectData = document.createElement('input');
  selectData.setAttribute('type', 'checkbox');
  selectData.classList.add('select');

  if (configuration.count === 'on100') {
    selectData.checked = true;
  }
  // eslint-disable-next-line no-unused-expressions

  selectData.onclick = () => {
    if (flag === 'absolute') {
      flag = 'on100';
      // eslint-disable-next-line
      configuration.count = 'on100';
    } else {
      flag = 'absolute';
      // eslint-disable-next-line
      configuration.count = 'absolute';
    }
    init();
  };
  selectDataWrapper.append(selectDataText);
  checkboxSpan.insertAdjacentElement('afterbegin', selectData);
  selectDataWrapper.append(checkboxSpan);

  navBlock.append(selectDataWrapper);

  const list = document.createElement('ul');

  const sortSelectWrapper = document.createElement('div');
  sortSelectWrapper.classList.add('sortSelectWrapper');
  const sortSelectText = document.createElement('p');
  sortSelectText.textContent = 'Sort By:';
  const sortSelect = document.createElement('select');
  sortSelect[sortSelect.length] = new Option('A-Z', 'A-Z');
  sortSelect[sortSelect.length] = new Option('Z-A', 'Z-A');
  sortSelect[sortSelect.length] = new Option('0-9', '0-9');
  sortSelect[sortSelect.length] = new Option('9-0', '9-0');

  function selectCurrentCountry() {
    if (configuration.country !== 'all') {
      document.getElementById('active').scrollIntoView();
    }
  }
  function updateCasesOfCountryes() {
    list.textContent = '';
    arrayOfCountryes.forEach((el) => {
      list.appendChild(el.el);
    });
    selectCurrentCountry();
  }

  sortSelect.onchange = () => {
    switch (true) {
      case sortSelect.value === 'A-Z':
        arrayOfCountryes.sort((a, b) => {
          if (a.Country < b.Country) {
            return -1;
          }
          if (a.Country > b.Country) {
            return 1;
          }
          return 0;
        });
        updateCasesOfCountryes();
        break;
      case sortSelect.value === 'Z-A':
        arrayOfCountryes.sort((a, b) => {
          if (b.Country < a.Country) {
            return -1;
          }
          if (b.Country > a.Country) {
            return 1;
          }
          return 0;
        });
        updateCasesOfCountryes();
        break;
      case sortSelect.value === '0-9':
        arrayOfCountryes.sort((a, b) => a.currentData - b.currentData);
        updateCasesOfCountryes();
        break;
      case sortSelect.value === '9-0':
        arrayOfCountryes.sort((a, b) => b.currentData - a.currentData);
        updateCasesOfCountryes();
        break;
      default:
        break;
    }
  };
  sortSelectWrapper.append(sortSelectText);
  sortSelectWrapper.append(sortSelect);

  navBlock.append(sortSelectWrapper);

  // eslint-disable-next-line no-unused-expressions

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
      if (country.Country === 'Dominican Republic') {
        if (el.name === 'Dominican Republic') {
          return true;
        }
      }
      if (country.Country === 'Dominica') {
        if (el.name === 'Dominica') {
          return true;
        }
      }
      if (el.name === 'British Indian Ocean Territory') {
        return false;
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
        if (el.name === 'Dominica' || el.name === 'Dominican Republic') {
          return false;
        }
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
    listItem.el.onclick = () => {
      // eslint-disable-next-line
      configuration.country = countryName;
      init();
    };
    arrayOfCountryes.push(listItem);
  }

  container.append(navBlock);
  container.append(list);

  sortSelect[3].selected = true;
  arrayOfCountryes.sort((a, b) => b.currentData - a.currentData);
  updateCasesOfCountryes();

  selectCurrentCountry();
}
