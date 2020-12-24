/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import init from '../../index';

export default async function fullScreen() {
  document.querySelectorAll('section').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      const button = document.createElement('button');
      button.id = 'sweep';
      const img = document.createElement('img');
      if (!element.classList.value.includes('fullScreen')) {
        img.src = '../../img/arrows-fullscreen.svg';
      } else {
        img.src = '../../img/arrows-angle-contract.svg';
      }
      img.id = 'img';
      element.append(button);
      button.append(img);
      document.getElementById('sweep').addEventListener('click', () => {
        if (element.id === 'map') init();
        if (!element.classList.value.includes('fullScreen')) {
          element.classList.add('fullScreen');
          document.querySelector('body').classList.add('overflow-hidden');
          img.src = '../../img/arrows-angle-contract.svg';
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
          document.querySelector('body').classList.remove('overflow-hidden');
          element.classList.remove('fullScreen');
        }
      });
    });
    element.addEventListener('mouseleave', () => {
      const button = document.getElementById('sweep');
      const img = document.getElementById('img');
      if (img) button.removeChild(img);
      if (button) element.removeChild(button);
    });
  });
}
