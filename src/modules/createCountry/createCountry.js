export default class Country {
  constructor(parent, data) {
    this.parent = parent;

    this.Country = data.Country;
    this.CountryCode = data.CountryCode;
    this.Slug = data.Slug;
    this.NewConfirmed = data.NewConfirmed;
    this.TotalConfirmed = data.TotalConfirmed;
    this.NewDeaths = data.NewDeaths;
    this.TotalDeaths = data.TotalDeaths;
    this.NewRecovered = data.NewRecovered;
    this.TotalRecovered = data.TotalRecovered;
    this.Population = data.Population;

    this.currentData = this.TotalConfirmed;

    this.el = this.createEl();
    this.parent.appendChild(this.el);
  }

  createEl() {
    const element = document.createElement('li');
    element.innerHTML = `
        <img src="https://www.countryflags.io/${this.CountryCode.toLowerCase()}/shiny/32.png">
        <div class="country-data">${this.TotalConfirmed}</div>
        <div class="country-name">${this.Country}</div>
        `;
    return element;
  }

  changeData(flag, data = this.currentData) {
    const arrayOfChildrens = Array.from(this.el.children);
    const changedElement = arrayOfChildrens.filter((el) => el.classList.contains('country-data'));

    function GetPropertyValue(obj1, dataToRetrieve) {
      return dataToRetrieve.split('.').reduce((o, k) => {
        return o && o[k];
      }, obj1);
    }

    const dataInElement = GetPropertyValue(this, data);

    if (flag) {
      changedElement[0].textContent = this.getDataFor100000(dataInElement).toFixed(2);
      this.currentData = this.getDataFor100000(dataInElement);
    } else {
      changedElement[0].textContent = dataInElement;
      this.currentData = dataInElement;
    }
  }

  getDataFor100000(data) {
    return (data * 100000) / this.Population;
  }
}
