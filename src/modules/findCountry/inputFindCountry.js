export default async function inputFindCountry() {
  if (document.getElementById('input').getAttribute('list') == null) {
    document.querySelector('input').setAttribute('list', 'allCountru');
    const datalist = document.createElement('datalist');
    datalist.id = 'allCountru';
    document.body.append(datalist);
    const entres = document.getElementsByClassName('country-name');
    for (let i = 0; i <= entres.length - 1; i += 1) {
      const option = document.createElement('option');
      option.classList.add('findOption');
      option.value = entres[i].innerHTML;
      datalist.append(option);
    }
  }
}
