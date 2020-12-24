/* eslint-disable no-restricted-syntax */
import Chart from 'chart.js';

export default async function createGraph(globalData, configuration, population) {
  document.querySelector('#graph').innerHTML = `
  <div class="chart-title ml-2 mt-2"></div>
  <div class="selection-wrapper pt-1 pb-2">
    <div class="selector-wrapper">
      <h3>Choose cases:</h3>
      <select class="form-control form-control-sm ml-2 mr-2" id="graph-select-cases">
        <option>confirmed</option>
        <option>deaths</option>
        <option>recovered</option>
      </select>
    </div>
    <div class="selector-wrapper">
      <h3>Select reporting period:</h3>
      <select class="form-control form-control-sm ml-2 mr-2" id="graph-select-duration">
        <option>Summary</option>
        <option>Сhanges per day</option>
      </select>
    </div>
    <div class="selector-wrapper">
      <h3>Choose calculation method:</h3>
      <select class="form-control form-control-sm ml-2 mr-2" id="graph-select-count">
        <option>Absolute</option>
        <option>Per 100 thousand population</option>
      </select>
    </div>
  </div>`;
  const popul = {};
  for (const item of population) {
    popul[item.name] = item.population;
  }
  const selectorDuration = document.querySelector('#graph-select-duration');
  const selectorCases = document.querySelector('#graph-select-cases');
  selectorCases.value = configuration.type;
  selectorDuration.value = configuration.duration;
  if (document.querySelector('.chart-container'))
    document.querySelector('.chart-container').remove();
  const container = document.createElement('div');
  container.classList.add('chart-container');
  const territory =
    configuration.country === 'all'
      ? 'In <span>world</span>'
      : `In <span>${configuration.country}</span>`;
  document.querySelector('.chart-title').innerHTML = territory;
  container.innerHTML = `<div class="chart-container-wrapper" style="position: relative;"> <canvas id="chart"></canvas> </div>`;
  document.querySelector('#graph').append(container);
  const confirmed = [];
  const deaths = [];
  const recovered = [];
  const date = [];
  const ctx = document.getElementById('chart');
  const color = ['rgb(255, 238, 0)', 'rgb(21, 156, 21)', 'rgb(255, 0, 0)'];
  const data = configuration.country === 'all' ? globalData.data : globalData;
  data.forEach((element, index) => {
    let to100 = 1;
    let name;
    switch (element.Country) {
      case 'Bolivia':
        name = 'Bolivia (Plurinational State of)';
        break;
      case 'Cape Verde':
        name = 'Cabo Verde';
        break;
      case 'Congo (Kinshasa)':
        name = 'Congo (Democratic Republic of the)';
        break;
      case 'Congo (Brazzaville)':
        name = 'Congo';
        break;
      case 'Holy See (Vatican City State)':
        name = 'Holy See';
        break;
      case 'Iran, Islamic Republic of':
        name = 'Iran (Islamic Republic of)';
        break;
      case 'Korea (South)':
        name = 'Korea (Republic of)';
        break;
      case 'Lao PDR':
        name = `Lao People's Democratic Republic`;
        break;
      case 'Macao, SAR China':
        name = `Macao`;
        break;
      case 'Macedonia, Republic of':
        name = `Macedonia (the former Yugoslav Republic of)`;
        break;
      case 'Moldova':
        name = `Moldova (Republic of)`;
        break;
      case 'Palestinian Territory':
        name = `Palestine, State of`;
        break;
      case 'Saint Vincent and Grenadines':
        name = `Saint Vincent and the Grenadines`;
        break;
      case 'Syrian Arab Republic (Syria)':
        name = `Syrian Arab Republic`;
        break;
      case 'Taiwan, Republic of China':
        name = `Taiwan`;
        break;
      case 'United Kingdom':
        name = `United Kingdom of Great Britain and Northern Ireland`;
        break;
      case 'Venezuela (Bolivarian Republic)':
        name = `Venezuela (Bolivarian Republic of)`;
        break;

      default:
        name = element.Country;
        break;
    }
    if (configuration.count === 'on100' && configuration.country !== 'all')
      to100 = popul[name] / 100000;
    else if (configuration.count === 'on100' && configuration.country === 'all')
      to100 = 7827000000 / 100000;

    if (
      configuration.country === 'all' &&
      element.date !== '2020-08-17' &&
      element.date !== '2020-08-18'
    ) {
      confirmed.push(
        configuration.duration === 'lastDay'
          ? element.new_confirmed / to100
          : element.confirmed / to100
      );
      deaths.push(
        configuration.duration === 'lastDay' ? element.new_deaths / to100 : element.deaths / to100
      );
      recovered.push(
        configuration.duration === 'lastDay'
          ? element.new_recovered / to100
          : element.recovered / to100
      );
      date.push(element.date);
    } else if (configuration.country !== 'all') {
      let confirmedValue = 0;
      if (configuration.duration === 'lastDay') {
        if (index !== 0) {
          confirmedValue = (+element.Confirmed - +data[index - 1].Confirmed) / to100;
        } else confirmedValue = element.Confirmed / to100;
      } else confirmedValue = element.Confirmed / to100;
      confirmed.push(confirmedValue);
      let deathsValue = 0;
      if (configuration.duration === 'lastDay') {
        deathsValue =
          deaths.length === 0
            ? element.Deaths / to100
            : (+element.Deaths - +data[index - 1].Deaths) / to100;
      } else deathsValue = element.Deaths / to100;
      deaths.push(deathsValue);
      recovered.push(
        // eslint-disable-next-line no-nested-ternary
        configuration.duration === 'lastDay'
          ? recovered.length === 0
            ? element.Recovered / to100
            : (+element.Recovered - +data[index - 1].Recovered) / to100
          : element.Recovered / to100
      );

      date.push(element.Date.slice(0, element.Date.length - 10));
    }
  });
  if (configuration.country === 'all') {
    date.shift();
    date.shift();
    date.reverse();
    confirmed.shift();
    confirmed.shift();
    confirmed.reverse();
    recovered.shift();
    recovered.shift();
    recovered.reverse();
    deaths.shift();
    deaths.shift();
    deaths.reverse();
  }

  const dataSets = [
    {
      label: 'Confirmed',
      data: confirmed,
      backgroundColor: color[0],
      borderColor: color[0],
      borderWidth: 1,
      hidden: configuration.type !== 'confirmed',
    },
    {
      label: 'Recovered',
      data: recovered,
      backgroundColor: color[1],
      borderColor: color[1],
      borderWidth: 1,
      hidden: configuration.type !== 'recovered',
    },
    {
      label: 'Deaths',
      data: deaths,
      backgroundColor: color[2],
      borderColor: color[2],
      borderWidth: 1,
      hidden: configuration.type !== 'deaths',
    },
  ];
  // const labels = ['Confirmed', 'Recovered', 'Deaths'];
  // eslint-disable-next-line no-unused-vars
  const confirmerForWorld = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: date,
      datasets: dataSets,
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        mode: 'x',
        intersect: false,
        displayColors: false,
        callbacks: {
          // eslint-disable-next-line no-unused-vars
          label: (tooltipItem) =>
            dataSets.map(
              (ds) =>
                `${ds.label}: ${ds.data[tooltipItem.index].toFixed(
                  configuration.count === 'on100' ? 3 : 0
                )}`
            ),
        },
      },
      scales: {
        yAxes: [
          {
            display: true,
            ticks: {
              beginAtZero: true,
              min: 0,
            },
          },
        ],
      },
    },
  });
}
