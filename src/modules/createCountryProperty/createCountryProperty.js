const findCountry = () => {
  let countryName = 'Belarus';
  const countryWrapperListiner = document.querySelector('#cases-by-country');
  const allData = [];

  function showsm(date) {
    const nesElement = {
      name: '',
      population: '',
      NewConfirmed: '',
      NewDeaths: '',
      NewRecovered: '',
      TotalConfirmed: '',
      TotalDeaths: '',
      TotalRecovered: '',
    };

    date[1].forEach((item) => {
      if (item.name === countryName) {
        nesElement.name = item.name;
        nesElement.population = item.population;
      }
    });

    const wrapper = document.getElementById('custom-data');

    wrapper.innerHTML = `<div class="globalDataContainer">
    <div>
       <h2 class="redElement">Global Deaths : ${date[0].Global.TotalDeaths}</h2>
       <h2 class="greenElement hideElement">Global Recovered : ${date[0].Global.TotalRecovered}</h2>
    </div>
    <div><button class="btn greenElement showButton">Global Deaths/Global Recovered</button></div>
    <div class="deadListWrapper">
       <ul id="deadList"></ul>
    </div>
    <div class="recoveredListWrapper hideElement">
       <ul id="recoveredList"></ul>
    </div>
   </div>
   <div class="globalDataContainer localDataContainer"><ul id="localList"></u></div>`;

    if (nesElement.TotalDeaths === '') {
      date[0].Countries.forEach((item) => {
        if (item.Country === nesElement.name) {
          nesElement.NewConfirmed = item.NewConfirmed;
          nesElement.NewDeaths = item.NewDeaths;
          nesElement.NewRecovered = item.NewRecovered;
          nesElement.TotalConfirmed = item.TotalConfirmed;
          nesElement.TotalDeaths = item.TotalDeaths;
          nesElement.TotalRecovered = item.TotalRecovered;
          nesElement.NewConfirmedNaStoK = Math.round(
            100000 / (nesElement.population / item.NewConfirmed)
          );
          nesElement.NewdeathsNaStoK = Math.round(
            100000 / (nesElement.population / item.NewDeaths)
          );
          nesElement.NewRecovNaStoK = Math.round(
            100000 / (nesElement.population / item.NewRecovered)
          );
          nesElement.totalConfirmedNaStoK = Math.round(
            100000 / (nesElement.population / item.TotalConfirmed)
          );
          nesElement.totalDeathNaStoK = Math.round(
            100000 / (nesElement.population / item.TotalDeaths)
          );
          nesElement.totalRecovNaStoK = Math.round(
            100000 / (nesElement.population / item.TotalRecovered)
          );
        }

        const liForRecovered = document.createElement('li');
        const liForDead = document.createElement('li');

        liForDead.innerHTML = `<div class="country-data"> <span class="redElement">${item.TotalRecovered} deadths</span><span>${item.Country}</span></div> `;
        liForRecovered.innerHTML = `<div class="country-data"> <span class="greenElement">${item.TotalDeaths} recovered</span><span>${item.Country}</span></div> `;

        document.getElementById('deadList').appendChild(liForDead);
        document.getElementById('recoveredList').appendChild(liForRecovered);
      });
    }
    const showButton = document.querySelector('.showButton');
    const deadListWrapperListiner = document.querySelector('.deadListWrapper');
    const recoveredListWrapperListiner = document.querySelector('.recoveredListWrapper');

    const nesElementArray = Object.entries(nesElement);

    nesElementArray.forEach((item) => {
      const liForDead = document.createElement('li');

      liForDead.innerHTML = `<li class="country-data">${item[0]} ${item[1]} </li> `;

      document.getElementById('localList').appendChild(liForDead);
    });

    const show = (event) => {
      countryName = event.path[1].lastElementChild.innerHTML;
      showsm(allData);
    };
    recoveredListWrapperListiner.addEventListener('click', show, true);
    deadListWrapperListiner.addEventListener('click', show, true);

    showButton.onclick = () => {
      document.querySelector('.showButton').classList.toggle('greenElement');
      document.querySelector('.showButton').classList.toggle('redElement');
      document.querySelector('.greenElement').classList.toggle('hideElement');
      document.querySelector('.recoveredListWrapper').classList.toggle('hideElement');
      document.querySelector('.deadListWrapper').classList.toggle('hideElement');
      document.querySelector('.redElement').classList.toggle('hideElement');
    };
  }
  async function getDataForOneCountry(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка о адресу ${url}, 
          статус ошибки ${response.status}!`);
    }
    return response.json();
  }
  async function getDataForName(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка о адресу ${url}, 
          статус ошибки ${response.status}!`);
    }
    return response.json();
  }
  async function getdate() {
    if (allData.length === 0) {
      await getDataForOneCountry(`https://api.covid19api.com/summary`).then((data) => {
        allData.push(data);
      });
      await getDataForName(`https://restcountries.eu/rest/v2/all?fields=name;population;flag`).then(
        (value) => {
          allData.push(value);
        }
      );
    }
    showsm(allData);
  }
  getdate();
  const show = (event) => {
    countryName = event.path[1].lastElementChild.innerHTML;
    getdate();
  };
  countryWrapperListiner.addEventListener('click', show, true);
};

export default findCountry;
