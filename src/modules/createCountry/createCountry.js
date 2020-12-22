// eslint-disable-next-line import/no-cycle

export default class Country {
  constructor(parent, data, flag, property) {
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

    this.el = this.createEl(flag, property);
    this.parent.appendChild(this.el);
  }

  createEl(flag, property) {
    const element = document.createElement('li');

    function GetPropertyValue(obj1, dataToRetrieve) {
      return dataToRetrieve.split('.').reduce((o, k) => {
        return o && o[k];
      }, obj1);
    }
    const dataInElement = GetPropertyValue(this, property);

    let data = 0;
    if (flag === 'on100') {
      data = this.getDataFor100000(dataInElement).toFixed(2);
      this.currentData = this.getDataFor100000(dataInElement);
    } else {
      data = dataInElement;
      this.currentData = dataInElement;
    }
    element.innerHTML = `
        <img src="https://www.countryflags.io/${this.CountryCode.toLowerCase()}/shiny/32.png">
        <div class="country-data">${data}</div>
        <div class="country-name">${this.Country}</div>
        `;
    element.onclick = () => {
      this.el.scrollIntoView();
      return this.Country;
    };
    return element;
  }

  getDataFor100000(data) {
    return (data * 100000) / this.Population;
  }
}
