/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import init from '../../index';

export default function getMapListeners(configuration) {
  const selectorCases = document.querySelector('#map-select-cases');
  selectorCases.value = configuration.type;
  selectorCases.addEventListener('change', () => {
    // eslint-disable-next-line no-param-reassign
    configuration.type = selectorCases.value;
    init();
  });
  const selectorDuration = document.querySelector('#map-select-duration');
  selectorDuration.value = configuration.duration === 'all' ? 'Summary' : 'Сhanges per day';
  selectorDuration.addEventListener('change', () => {
    // eslint-disable-next-line no-param-reassign
    switch (selectorDuration.value) {
      case 'Summary':
        configuration.duration = 'all';
        break;
      case 'Сhanges per day':
        configuration.duration = 'lastDay';
        break;
      default:
        break;
    }
    init();
  });
  const selectorCount = document.querySelector('#map-select-count');
  selectorCount.value =
    configuration.count === 'absolute' ? 'Absolute' : 'Per 100 thousand population';
  selectorCount.addEventListener('change', () => {
    switch (selectorCount.value) {
      case 'Absolute':
        configuration.count = 'absolute';
        break;
      case 'Per 100 thousand population':
        configuration.count = 'on100';
        break;
      default:
        break;
    }
    init();
  });
}
