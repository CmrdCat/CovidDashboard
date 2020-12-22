import createGraph from './createGraph';
// eslint-disable-next-line import/no-cycle
import init from '../../index';

export default function getSelectorChange(globalData, configuration) {
  const selectorCases = document.querySelector('#graph-select-cases');
  selectorCases.addEventListener('change', () => {
    // eslint-disable-next-line no-param-reassign
    configuration.type = selectorCases.value;
    createGraph(globalData, configuration);
    init();
  });
  const selectorDuration = document.querySelector('#graph-select-duration');
  selectorDuration.addEventListener('change', () => {
    // eslint-disable-next-line no-param-reassign
    configuration.duration = selectorDuration.value;
    createGraph(globalData, configuration);
    init();
  });
  const selectorCount = document.querySelector('#graph-select-count');
  selectorCount.addEventListener('change', () => {
    // eslint-disable-next-line no-param-reassign
    configuration.count = selectorCount.value;
    createGraph(globalData, configuration);
    init();
  });
}
