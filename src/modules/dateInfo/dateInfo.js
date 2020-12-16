export default async function dateInfo(globalData) {
  const lastUpdate = document.getElementById('date-last-update');
  const date = new Date(globalData.Date);

  function MakeStringAddZero(data) {
    const dataStr = String(data);
    if (dataStr.length < 2) {
      return `0${dataStr}`;
    }
    return dataStr;
  }

  const day = MakeStringAddZero(date.getDate());
  const month = MakeStringAddZero(date.getMonth() + 1);
  const year = MakeStringAddZero(date.getFullYear());
  const hours = MakeStringAddZero(date.getHours());
  const minutes = MakeStringAddZero(date.getMinutes());

  lastUpdate.textContent = `${day}/${month}/${year} ${hours}:${minutes}`;
}
