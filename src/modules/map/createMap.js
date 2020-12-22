/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
import L from 'leaflet';
import places from './coordinates.json';

export default async function createMap(data, configuration, population) {
  document.querySelector('#map').innerHTML = '<div id="map-layer"></div>';
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
  console.log(countryCoordinates);

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
  const accessToken =
    'pk.eyJ1IjoiZG1pdHJpeWhvbXphIiwiYSI6ImNraXgwdTltYTF0Z2UyeHNjemI5am0ydXMifQ.bXwZCvH4rqRs124UCmmcdw';
  const url = `https://api.mapbox.com/styles/v1/dmitriyhomza/ckix6hymp5h5v19ozgmlknvmw/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`;
  // eslint-disable-next-line no-unused-vars
  const openstreetmap = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const layer = new L.TileLayer(url);
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
  // eslint-disable-next-line no-unused-vars
  const midleValue =
    data.Countries.reduce((sum, element) => {
      return sum + +element[configuration.duration === 'all' ? `Total${type}` : `New${type}`];
    }, 0) / data.Countries.length;
  const geoJsonLayers = new L.GeoJSON(geoJson, {
    pointToLayer: (feature = {}, latlng) => {
      const { properties = {} } = feature;
      // let updatedFormatted;
      let mainString;
      let to100 = 1;
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
      const size = properties[configuration.duration === 'all' ? `Total${type}` : `New${type}`];
      mainString = '';
      const html = `
        <span class="icon-marker ${type.toLowerCase()}" style="width: ${
        (size / midleValue) * 3
      }rem; height: ${(size / midleValue) * 3}rem;">
          <span class="icon-marker-tooltip">
            <h2>${configuration.count === 'on100' ? `${Country}, on 100th.` : Country}</h2>
            <ul>
              <li><strong>${
                configuration.duration === 'all' ? `Total ${type}` : `New ${type}`
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
}
