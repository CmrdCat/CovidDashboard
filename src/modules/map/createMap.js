/* eslint-disable new-cap */
import L from 'leaflet';
import places from './coordinates.json';

export default async function createMap(data, configuration) {
  console.log(data.Countries);
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
      console.log(country.Country);
      return {
        type: 'Feature',
        properties: {
          ...country,
        },
        geometry: {
          type: 'Point',
          coordinates:
            index < 70 ? [places[index].split(', ')[2], places[index].split(', ')[1]] : [0, 0],
        },
      };
    }),
  };
  // eslint-disable-next-line no-unused-vars
  const midleValue = 5;
  // data.reduce((sum, element) => {
  //   return sum + +element[configuration.type === 'confirmed' ? 'cases' : configuration.type];
  // }, 0) / data.length;

  const geoJsonLayers = new L.GeoJSON(geoJson, {
    pointToLayer: (feature = {}, latlng) => {
      const { properties = {} } = feature;
      // let updatedFormatted;
      let mainString;

      const { Country, TotalCases, TotalDeaths } = properties;

      mainString = `${properties[TotalCases]}`;

      if (TotalCases > 1000) {
        mainString = `${mainString.slice(0, -3)}k+`;
      }

      // if (updated) {
      //   updatedFormatted = new Date(updated).toLocaleString();
      // }

      const size = properties[configuration.type === 'confirmed' ? TotalCases : configuration.type];

      const html = `
        <span class="icon-marker" style="width: ${(size / midleValue) * 5}em; height: ${
        (size / midleValue) * 5
      }em;">
          <span class="icon-marker-tooltip">
            <h2>${Country}</h2>
            <ul>
              <li><strong>Confirmed:</strong> ${TotalCases}</li>
              <li><strong>Deaths:</strong> ${TotalDeaths}</li>
              <li><strong>!!!!!!!!!!!Recovered:</strong> ${TotalCases}</li>
              <li><strong>!!!!!Last Update:</strong> ${TotalCases}</li>
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
