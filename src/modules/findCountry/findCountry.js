export default async function findCountry() {
  document.querySelector('input').oninput = function () {
    const val = this.value.trim();
    const entres = document.getElementsByClassName('country-name');
    if (val !== '') {
      for (let i = 0; i <= entres.length - 1; i += 1) {
        console.log(entres[i].innerHTML);
        if (entres[i].innerHTML.search(val) === -1) {
          const ref = entres[i];
          ref.hidden = true;
        } else {
          const ref = entres[i];
          ref.hidden = false;
        }
      }
    } else {
      for (let i = 0; i <= entres.length - 1; i += 1) {
        const ref = entres[i];
        ref.hidden = false;
      }
    }
  };
}
