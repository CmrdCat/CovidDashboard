export default async function fullScreen() {
  document.querySelectorAll('section').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      const button = document.createElement('button');
      button.id = 'sweep';
      element.append(button);
      document.getElementById('sweep').addEventListener('click', () => {
        if (!element.classList.value.includes('fullScreen')) {
          element.classList.add('fullScreen');
          document.querySelectorAll('section').forEach((key) => {
            if (!key.classList.value.includes('fullScreen')) {
              const obj = key;
              obj.hidden = true;
            }
          });
        } else {
          document.querySelectorAll('section').forEach((key) => {
            if (!key.classList.value.includes('fullScreen')) {
              const obj = key;
              obj.hidden = false;
            }
          });
          element.classList.remove('fullScreen');
        }
      });
    });
    element.addEventListener('mouseleave', () => {
      const button = document.getElementById('sweep');
      element.removeChild(button);
    });
  });
}
