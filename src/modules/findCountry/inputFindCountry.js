export default async function inputFindCountry() {
  if (document.getElementById('input').getAttribute('list') == null) {
    document.querySelector('input').setAttribute('list', 'allCountru');
    const datalist = document.createElement('datalist');
    datalist.id = 'allCountru';
    document.body.append(datalist);
    const entres = document.getElementsByClassName('country-name');
    for (let i = 0; i <= entres.length - 1; i += 1) {
      const option = document.createElement('option');
      // option.classList.add('findOption');
      option.value = entres[i].innerHTML;
      datalist.append(option);
    }
  }
  document.getElementById('input').oninput = function name() {
    const val = this.value.trim();
    const items = document.getElementsByClassName('country-name');
    const liItem = document.getElementsByTagName('li');
    if (val !== '') {
      for (let i = 0; i <= items.length - 1; i += 1) {
        if (items[i].innerText.toLowerCase().search(val.toLowerCase()) === -1) {
          liItem[i].hidden = true;
          items[i].innerHTML = items[i].innerText;
        } else {
          liItem[i].hidden = false;
        }
      }
    } else {
      for (let i = 0; i <= items.length - 1; i += 1) {
        liItem[i].hidden = false;
        items[i].innerHTML = items[i].innerText;
      }
    }
  };
}
