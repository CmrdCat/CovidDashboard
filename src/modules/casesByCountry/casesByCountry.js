/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
export default function casesByCountry(globalData) {
  const container = document.getElementById('cases-by-country');
  container.innerHTML =
    '<h3><div class="btn-group"><button class="btn btn-secondary btn-sm dropdown-toggle" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Количество случаев заболевания</button><div class="dropdown-menu"><a class="dropdown-item" href="#">Смертей</a><a class="dropdown-item" href="#">Выздоровевших</a></div> </div> за весь период в абсолютных величинах</h3>';
  const list = document.createElement('ul');
  const countries = globalData.Countries;
  for (const country of countries) {
    const element = document.createElement('li');
    element.innerHTML = `${country.Country} <span>${country.TotalConfirmed}</span>`;
    list.append(element);
  }

  container.append(list);
}
