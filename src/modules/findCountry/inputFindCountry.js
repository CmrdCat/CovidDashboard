export default async function inputFindCountry() {
  document.querySelector('input').setAttribute('list', 'allCountru');
  const datalist = document.createElement('datalist');
  datalist.id = 'allCountru';
  document.body.append(datalist);
  const entres = document.getElementsByClassName('country-name');
  for (let i = 0; i <= entres.length - 1; i += 1) {
    const option = document.createElement('option');
    option.value = entres[i].innerHTML;
    console.log(entres[i].innerHTML);
    datalist.append(option);
  }
}
