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
  const territory = configuration.country === 'all' ? 'In world' : `In ${configuration.country}`;
  document.querySelector('.chart-title').innerText = territory;
  container.innerHTML = `<div class="chart-container-wrapper" style="position: relative;"> <canvas id="chart"></canvas> </div>`;
  document.querySelector('#graph').append(container);
  const confirmed = [];
  const date = [];
  const ctx = document.getElementById('chart');
  let color = 'rgb(255, 238, 0)';
  switch (configuration.type) {
    case 'cases':
      color = 'rgb(0, 17, 255)';
      break;
    case 'deaths':
      color = 'rgb(255, 0, 0)';
      break;
    case 'recovered':
      color = 'rgb(21, 156, 21)';
      break;
    default:
      color = 'rgb(255, 238, 0)';
      break;
  }
  const data = configuration.country === 'all' ? globalData.data : globalData;
  let lastValue = 0;
  data.forEach((element, index) => {
    if (
      configuration.country === 'all' &&
      element.date !== '2020-08-17' &&
      element.date !== '2020-08-18'
    ) {
      confirmed.push(
        configuration.duration === 'lastDay'
          ? element[`new_${configuration.type}`]
          : element[configuration.type]
      );
      date.push(element.date);
    } else if (configuration.country !== 'all') {
      lastValue = confirmed.length === 0 ? 0 : data[index - 1].Cases;
      confirmed.push(
        // eslint-disable-next-line no-nested-ternary
        configuration.duration === 'lastDay'
          ? confirmed.length === 0
            ? element.Cases
            : +element.Cases - lastValue
          : element.Cases
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
  }
  // eslint-disable-next-line no-unused-vars
  const confirmerForWorld = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: date,
      datasets: [
        {
          data: confirmed,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
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
