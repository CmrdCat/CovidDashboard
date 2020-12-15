export default async function globalCasesTotal(globalData) {
  const container = document.getElementById('global-cases');
  const message = document.createElement('div');
  const totalConfirmed = globalData.Global.TotalConfirmed;
  //   totalConfirmed.split('').map((item, index) => (index + 1) % 3);
  message.innerHTML = `<h3>Global Cases<br /><span>${totalConfirmed}</span></h3>`;
  container.append(message);
}
