/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */

import Country from '../createCountry/createCountry';

export default async function casesByCountry(globalData) {
  const arrayOfCountryes = [];

  const container = document.getElementById('cases-by-country');

  const selectCase = document.createElement('select');
  for (const key in globalData.Global) {
    selectCase[selectCase.length] = new Option(key, key);
  }
  selectCase.onchange = () => {
    arrayOfCountryes.forEach((el) => {
      el.changeData(selectCase.value);
    });
  };

  container.append(selectCase);

  const list = document.createElement('ul');
  const countries = globalData.Countries;
  for (const country of countries) {
    arrayOfCountryes.push(new Country(list, country));
  }

  container.append(list);
}
