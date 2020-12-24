export default async function inputFindCountry() {
  function getCountry() {
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
  }
  document.getElementById('input').oninput = getCountry;
}
