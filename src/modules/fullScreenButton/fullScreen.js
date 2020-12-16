export default async function fullScreen() {
  document.querySelectorAll('section').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      const button = document.createElement('button');
      button.id = 'sweep';
      element.append(button);
    });
    element.addEventListener('mouseleave', () => {
      const button = document.getElementById('sweep');
      element.removeChild(button);
    });
  });
}
