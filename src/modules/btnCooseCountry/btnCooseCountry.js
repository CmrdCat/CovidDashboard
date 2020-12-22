export default async function btnCooseCountry() {
  const btn = document.getElementById('choose');
  btn.addEventListener('click', function name(event) {
    event.preventDefault();
    const input = document.getElementById('input');
    console.log(input.value);
    return input.value;
  });
}
