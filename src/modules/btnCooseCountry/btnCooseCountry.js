// eslint-disable-next-line
import init from '../../index';

export default async function btnCooseCountry(configuration) {
  init();
  const entres = document.getElementsByClassName('country-name');
  const arr = [];
  const btn = document.getElementById('choose');
  btn.addEventListener('click', function name(event) {
    event.preventDefault();
    init();
    for (let i = 0; i <= entres.length - 1; i += 1) {
      arr.push(entres[i].innerText);
    }
    const input = document.getElementById('input').value;
    if (arr.includes(input)) {
      // eslint-disable-next-line
      configuration.country = input;
    } else {
      // eslint-disable-next-line
      configuration.country = 'all';
      // eslint-disable-next-line
      alert('there is no country with this name');
    }
  });
}
