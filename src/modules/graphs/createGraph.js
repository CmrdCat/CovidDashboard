import Chart from 'chart.js';

export default async function createGraph(globalData, configuration) {
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
  let lastValue = 0;
  data.forEach((element, index) => {
    if (
      configuration.country === 'all' &&
      element.date !== '2020-08-17' &&
      element.date !== '2020-08-18'
    ) {
      confirmed.push(
        configuration.duration === 'lastDay' ? element.new_confirmed : element.confirmed
      );
      deaths.push(configuration.duration === 'lastDay' ? element.new_deaths : element.deaths);
      recovered.push(
        configuration.duration === 'lastDay' ? element.new_recovered : element.recovered
      );
      date.push(element.date);
    } else if (configuration.country !== 'all') {
      lastValue = confirmed.length === 0 ? 0 : data[index - 1].Cases;
      confirmed.push(
        // eslint-disable-next-line no-nested-ternary
        configuration.duration === 'lastDay'
          ? confirmed.length === 0
            ? element.Confirmed
            : +element.Confirmed - lastValue
          : element.Confirmed
      );
      deaths.push(
        // eslint-disable-next-line no-nested-ternary
        configuration.duration === 'lastDay'
          ? deaths.length === 0
            ? element.Deaths
            : +element.Deaths - lastValue
          : element.Deaths
      );
      recovered.push(
        // eslint-disable-next-line no-nested-ternary
        configuration.duration === 'lastDay'
          ? recovered.length === 0
            ? element.Recovered
            : +element.Recovered - lastValue
          : element.Recovered
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
  console.log(confirmed);

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
        mode: 'nearest',
        intersect: false,
        displayColors: false,
        callbacks: {
          // eslint-disable-next-line no-unused-vars
          label: (tooltipItem) =>
            dataSets.map((ds) => `${ds.label}: ${ds.data[tooltipItem.index]}`),
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
