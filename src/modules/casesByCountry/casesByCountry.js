/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */

import Country from '../createCountry/createCountry';

export default async function casesByCountry(globalData) {
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
    arrayOfCountryes.push(new Country(list, country, flag));
  }

  container.append(navBlock);
  container.append(list);
}
