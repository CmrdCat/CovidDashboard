/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
import L from 'leaflet';
import places from './coordinates.json';

export default async function createMap(data, configuration) {
  const mapOptions = {
    center: [30, 0],
    zoom: 3,
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
      return sum + +element[`Total${type}`];
    }, 0) / data.Countries.length;

  const geoJsonLayers = new L.GeoJSON(geoJson, {
    pointToLayer: (feature = {}, latlng) => {
      const { properties = {} } = feature;
      // let updatedFormatted;
      let mainString;

      const {
        Country,
        TotalDeaths,
        TotalConfirmed,
        NewConfirmed,
        TotalRecovered,
        NewDeaths,
        NewRecovered,
      } = properties;
      mainString = `${
        properties[configuration.duration === 'all' ? `Total${type}` : `New${type}`]
      }`;

      if (properties[configuration.duration === 'all' ? `Total${type}` : `New${type}`] > 1000) {
        mainString = `${mainString.slice(0, -3)}k+`;
      }

      // if (updated) {
      //   updatedFormatted = new Date(updated).toLocaleString();
      // }

      const size = properties[`Total${type}`];

      const html = `
        <span class="icon-marker" style="width: ${(size / midleValue) * 5}em; height: ${
        (size / midleValue) * 5
      }em;">
          <span class="icon-marker-tooltip">
            <h2>${Country}</h2>
            <ul>
              <li><strong>${
                configuration.duration === 'all' ? `Total ${type}` : `New ${type}`
              }: </strong>${
        properties[configuration.duration === 'all' ? `Total${type}` : `New${type}`]
      }</li>
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
