export default async function globalCasesTotal(globalData) {
  const container = document.getElementById('global-cases');
  container.innerText = '';
  const message = document.createElement('div');
  const totalConfirmed = globalData.Global.TotalConfirmed;
  const totalConfirmedWithSpaces = `${totalConfirmed}`
    .split('')
    .map((item, index) => {
      return (`${totalConfirmed}`.length - index) % 3 === 0 ? ` ${item}` : `${item}`;
    })
    .join('');
  message.innerHTML = `<h3 id='global'>Global Cases<br /><span id='globalSpan'>${totalConfirmedWithSpaces}</span></h3>`;
  container.append(message);
}
