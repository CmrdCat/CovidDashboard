/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */

import Country from '../createCountry/createCountry';

export default async function casesByCountry(globalData, population) {
  const arrayOfCountryes = [];
  let flag = false;

  const container = document.getElementById('cases-by-country');

  const navBlock = document.createElement('div');
  navBlock.classList.add('navigation-in-cases');

  const selectCase = document.createElement('select');
  for (const key in globalData.Global) {
    selectCase[selectCase.length] = new Option(key, key);
  }
  selectCase[1].selected = true;
  selectCase.onchange = () => {
    arrayOfCountryes.forEach((el) => {
      el.changeData(flag, selectCase.value);
    });
  };
  navBlock.append(selectCase);

  const selectData = document.createElement('input');
  selectData.setAttribute('type', 'checkbox');
  selectData.classList.add('select');
  selectData.onchange = () => {
    flag = selectData.checked;
    arrayOfCountryes.forEach((el) => {
      el.changeData(flag, selectCase.value);
    });
  };
  navBlock.append(selectData);

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
    arrayOfCountryes.push(new Country(list, country));
  }

  container.append(navBlock);
  container.append(list);
}
