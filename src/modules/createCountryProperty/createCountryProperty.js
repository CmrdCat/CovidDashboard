const findCountry = () => {
  let countryName = 'Belarus';
  const countryList = document.getElementById('cases-by-country');
  function showsm(data) {
    let nesElement = '';
    data.forEach(function (item) {
      if (item.name === countryName) {
        nesElement = item.population;
      }
    });
    console.log(nesElement);
  }
  async function getDataForTable(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка о адресу ${url}, 
          статус ошибки ${response.status}!`);
    }
    return response.json();
  }
  async function getdate() {
    getDataForTable(`https://restcountries.eu/rest/v2/all?fields=name;population;flag`).then(
      (data) => {
        showsm(data);
      }
    );
  }
  const show = (event) => {
    countryName = event.path[1].lastElementChild.innerHTML;
    console.log(countryName);
    getdate();
  };

  countryList.addEventListener('click', show, true);
};

export default findCountry;
