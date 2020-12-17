export default async function fullScreen() {
  document.querySelectorAll('section').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      const button = document.createElement('button');
      button.id = 'sweep';
      element.append(button);
      document.getElementById('sweep').addEventListener('click', () => {
        element.classList.add('fullScreen');
        document.querySelectorAll('section').forEach((key) => {
          if (!key.classList.value.includes('fullScreen')) {
            if (!key.hidden) {
              const obj = key;
              obj.hidden = true;
            } else {
              const obj = key;
              obj.classList.remove('fullScreen');
              obj.hidden = false;
            }
          }
        });
      });
    });
    element.addEventListener('mouseleave', () => {
      const button = document.getElementById('sweep');
      element.removeChild(button);
      element.classList.remove('fullScreen');
    });
  });
}
