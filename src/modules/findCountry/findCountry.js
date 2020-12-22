export default async function findCountry() {
  document.querySelector('input').setAttribute('list', 'allCountru');
  const datalist = document.createElement('datalist');
  datalist.id = 'allCountru';
  document.body.append(datalist);
  const entres = document.getElementsByClassName('country-name');

  for (let i = 0; i <= entres.length - 1; i += 1) {
    const option = document.createElement('option');
    option.value = entres[i].innerHTML;
    datalist.append(option);
  }

  /* document.querySelector('input').oninput = function () {
    const val = this.value.trim();

    if (val !== '') {
      for (let i = 0; i <= entres.length - 1; i += 1) {
        //  console.log(entres[i].innerHTML);
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
  }; */
}
