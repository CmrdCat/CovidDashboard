/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
import L from 'leaflet';
import places from './coordinates.json';
// eslint-disable-next-line import/no-cycle
import getMapListeners from './getMapListeners';
import init from '../../index';

export default async function createMap(data, configuration, population) {
  document.querySelector('#map').innerHTML = `
  <div class="map-selectors">
  <div class="selector-wrapper">
    <h3>Choose cases:</h3>
    <select class="form-control form-control-sm ml-2 mr-2" id="map-select-cases">
      <option>confirmed</option>
      <option>deaths</option>
      <option>recovered</option>
    </select>
  </div>
  <div class="selector-wrapper">
    <h3>Select reporting period:</h3>
    <select class="form-control form-control-sm ml-2 mr-2" id="map-select-duration">
      <option>Summary</option>
      <option>Сhanges per day</option>
    </select>
  </div>
  <div class="selector-wrapper">
    <h3>Choose calculation method:</h3>
    <select class="form-control form-control-sm ml-2 mr-2" id="map-select-count">
      <option>Absolute</option>
      <option>Per 100 thousand population</option>
    </select>
  </div>
</div>
<div id="map-layer"></div>`;
  getMapListeners(configuration);
  const popul = {};
  for (const item of population) {
    popul[item.name] = item.population;
  }
  const countryCoordinates = {};
  for (const item of places) {
    const array = item.split(', ');
    // eslint-disable-next-line no-unused-expressions
    array.length > 3
      ? (countryCoordinates[`${array[0]}, ${array[1]}`] = [
          array[array.length - 2],
          array[array.length - 1],
        ])
      : (countryCoordinates[array[0]] = [array[array.length - 2], array[array.length - 1]]);
  }

  let mapOptions = {};
  mapOptions =
    configuration.country === 'all'
      ? {
          center: [30, 0],
          zoom: 3,
        }
      : {
          center: countryCoordinates[configuration.country],
          zoom: 7,
        };

  const map = new L.map('map-layer', mapOptions);
  map.options.minZoom = 3;
  map.options.maxZoom = 14;
  const accessToken =
    'pk.eyJ1IjoiZG1pdHJpeWhvbXphIiwiYSI6ImNraXgwdTltYTF0Z2UyeHNjemI5am0ydXMifQ.bXwZCvH4rqRs124UCmmcdw';
  const url = `https://api.mapbox.com/styles/v1/dmitriyhomza/ckix6hymp5h5v19ozgmlknvmw/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`;
  // eslint-disable-next-line no-unused-vars
  const openstreetmap = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const layer = new L.TileLayer(url, {});
  map.addLayer(layer);
  // eslint-disable-next-line no-unused-vars
  const geoJson = {
    type: 'FeatureCollection',
    features: data.Countries.map((country = {}, index) => {
      // const { countryInfo = {} } = country;
      // const { lat, long: lng } = countryInfo;
      return {
        type: 'Feature',
        properties: {
          ...country,
        },
        geometry: {
          type: 'Point',
          coordinates: places[index]
            ? [
                places[index].split(', ')[places[index].split(', ').length - 1],
                places[index].split(', ')[places[index].split(', ').length - 2],
              ]
            : [0, 0],
        },
      };
    }),
  };
  let type;
  if (configuration.type === 'confirmed') {
    type = 'Confirmed';
  } else if (configuration.type === 'recovered') {
    type = 'Recovered';
  } else {
    type = 'Deaths';
  }
  let to100 = 1;
  // eslint-disable-next-line no-unused-vars
  const midleValue =
    data.Countries.reduce((sum, element) => {
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
      if (configuration.count === 'on100') to100 = popul[name] / 100000;
      else to100 = 1;
      return (
        sum + +element[configuration.duration === 'all' ? `Total${type}` : `New${type}`] / to100
      );
    }, 0) / data.Countries.length;

  const geoJsonLayers = new L.GeoJSON(geoJson, {
    pointToLayer: (feature = {}, latlng) => {
      const { properties = {} } = feature;
      // let updatedFormatted;
      to100 = 1;
      let mainString;
      let populationName;
      const { Country } = properties;
      switch (Country) {
        case 'Bolivia':
          populationName = 'Bolivia (Plurinational State of)';
          break;
        case 'Cape Verde':
          populationName = 'Cabo Verde';
          break;
        case 'Congo (Kinshasa)':
          populationName = 'Congo (Democratic Republic of the)';
          break;
        case 'Congo (Brazzaville)':
          populationName = 'Congo';
          break;
        case 'Holy See (Vatican City State)':
          populationName = 'Holy See';
          break;
        case 'Iran, Islamic Republic of':
          populationName = 'Iran (Islamic Republic of)';
          break;
        case 'Korea (South)':
          populationName = 'Korea (Republic of)';
          break;
        case 'Lao PDR':
          populationName = `Lao People's Democratic Republic`;
          break;
        case 'Macao, SAR China':
          populationName = `Macao`;
          break;
        case 'Macedonia, Republic of':
          populationName = `Macedonia (the former Yugoslav Republic of)`;
          break;
        case 'Moldova':
          populationName = `Moldova (Republic of)`;
          break;
        case 'Palestinian Territory':
          populationName = `Palestine, State of`;
          break;
        case 'Saint Vincent and Grenadines':
          populationName = `Saint Vincent and the Grenadines`;
          break;
        case 'Syrian Arab Republic (Syria)':
          populationName = `Syrian Arab Republic`;
          break;
        case 'Taiwan, Republic of China':
          populationName = `Taiwan`;
          break;
        case 'United Kingdom':
          populationName = `United Kingdom of Great Britain and Northern Ireland`;
          break;
        case 'Venezuela (Bolivarian Republic)':
          populationName = `Venezuela (Bolivarian Republic of)`;
          break;

        default:
          populationName = Country;
          break;
      }
      if (configuration.count === 'on100') to100 = popul[populationName] / 100000;
      mainString = `${(
        properties[configuration.duration === 'all' ? `Total${type}` : `New${type}`] / to100
      ).toFixed(configuration.count === 'on100' ? 2 : 0)}`;

      if (properties[configuration.duration === 'all' ? `Total${type}` : `New${type}`] > 1000) {
        mainString = `${mainString.slice(0, -3)}k+`;
      }
      // console.log(
      //   `${Country} ${(
      //     properties[configuration.duration === 'all' ? `Total${type}` : `New${type}`] / to100
      //   ).toFixed(2)}`
      // );
      const size =
        properties[configuration.duration === 'all' ? `Total${type}` : `New${type}`] / to100;
      mainString = '';
      const html = `
        <span class="icon-marker ${type.toLowerCase()} ${
        configuration.country === Country ? 'active' : ''
      }" style="width: ${(size / midleValue) * 2}rem; height: ${(size / midleValue) * 2}rem;">
          <span class="icon-marker-tooltip">
            <h2>${Country}</h2>
            <ul>
              <li><strong>${configuration.duration === 'all' ? `Total ${type}` : `New ${type}`}${
        configuration.count === 'on100' ? ` on 100th.` : ''
      }: </strong>${(
        properties[configuration.duration === 'all' ? `Total${type}` : `New${type}`] / to100
      ).toFixed(configuration.count === 'on100' ? 2 : 0)}</li>
            </ul>
          </span>
          ${mainString}
        </span>
      `;
      return L.marker(latlng, {
        icon: L.divIcon({
          className: 'icon',
          html,
        }),
        riseOnHover: true,
      });
    },
  });
  geoJsonLayers.addTo(map);
  function floorZeros(value) {
    let count = 0;
    while (value > 100) {
      count += 1;
      value /= 10;
    }
    value = value.toFixed(0);
    value *= 10 ** count;
    return value;
  }
  const markers = document.querySelectorAll('.icon-marker');
  markers.forEach((element) =>
    element.addEventListener('click', () => {
      configuration.country = element.querySelector('h2').innerText;
      init();
    })
  );
  const legendValueHigh = floorZeros(midleValue * 2);
  const legendValueMiddle = floorZeros(midleValue);
  const legendValueLow = floorZeros(midleValue / 2);
  const legendContainer = document.createElement('div');
  legendContainer.classList.add('legend-container');
  legendContainer.innerHTML = `<div class="colors">
  <div class="color-variant"><span class="icon-marker confirmed" style="width: 1rem; height: 1rem;"></span>Confirmed cases</div>
  <div class="color-variant"><span class="icon-marker recovered" style="width: 1rem; height: 1rem;"></span>Recovered cases</div>
  <div class="color-variant"><span class="icon-marker deaths" style="width: 1rem; height: 1rem;"></span>Deaths cases</div>
  </div>
  <div class="sizes">
  <div class="size-variant">
  <span class="icon-marker ${type.toLowerCase()}" style="width: 4rem; height: 4rem;"></span> >${legendValueHigh} cases
  </div>
  <div class="size-variant">
  <span class="icon-marker ${type.toLowerCase()}" style="width: 2rem; height: 2rem;"></span> ${legendValueMiddle} cases
  </div>
  <div class="size-variant">
  <span class="icon-marker ${type.toLowerCase()}" style="width: 1rem; height: 1rem;"></span> <${legendValueLow} cases
  </div>
  </div>`;
  document.querySelector('#map').append(legendContainer);
}
