import createGraph from './createGraph';

export default function getSelectorChange(globalData, configuration) {
  const selectorCases = document.querySelector('#graph-select-cases');
  selectorCases.addEventListener('change', () => {
    // eslint-disable-next-line no-param-reassign
    configuration.type = selectorCases.value;
    createGraph(globalData, configuration);
  });
  const selectorDuration = document.querySelector('#graph-select-duration');
  selectorDuration.addEventListener('change', () => {
    // eslint-disable-next-line no-param-reassign
    configuration.duration = selectorDuration.value;
    createGraph(globalData, configuration);
  });
}
