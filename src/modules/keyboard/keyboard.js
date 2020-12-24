/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable camelcase */

import getCountry from '../findCountry/functionBody';

/* eslint-disable*/
const audio_en = document.querySelector('#audio_en');
const audio_ru = document.querySelector('#audio_ru');
const audio_shift = document.querySelector('#shift');
const audio_backspace = document.querySelector('#backspace');
const audio_caps = document.querySelector('#caps');
const audio_enter = document.querySelector('#enter');
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const rec = new SpeechRecognition();
rec.interimResults = true;

let voiceMessage;

const inProgres = false;

export default Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
    textarea: document.querySelector('#input'),
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    capsLock: false,
    shift: false,
    language: 'en',
    voiceButtons: true,
    voiceType: false,
  },

  layouts: {
    en: [
      '`',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      '-',
      '=',
      '\\',
      'backspace',
      'q',
      'w',
      'e',
      'r',
      't',
      'y',
      'u',
      'i',
      'o',
      'p',
      '[',
      ']',
      'caps',
      'a',
      's',
      'd',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      ';',
      "'",
      'enter',
      'shift',
      'z',
      'x',
      'c',
      'v',
      'b',
      'n',
      'm',
      ',',
      '.',
      '/',
      'keyboard_voice',
      'volume_up',
      'language',
      'space',
      'left',
      'right',
      'done',
    ],
    ru: [
      'ё',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      '-',
      '=',
      '\\',
      'backspace',
      'й',
      'ц',
      'у',
      'к',
      'е',
      'н',
      'г',
      'ш',
      'щ',
      'з',
      'х',
      'ъ',
      'caps',
      'ф',
      'ы',
      'в',
      'а',
      'п',
      'р',
      'о',
      'л',
      'д',
      'ж',
      'э',
      'enter',
      'shift',
      'я',
      'ч',
      'с',
      'м',
      'и',
      'т',
      'ь',
      'б',
      'ю',
      '.',
      'keyboard_voice',
      'volume_up',
      'language',
      'space',
      'left',
      'right',
      'done',
    ],
    specialen: [
      '~',
      '!',
      '@',
      '#',
      '$',
      '%',
      '^',
      '&',
      '*',
      '(',
      ')',
      '_',
      '+',
      '|',
      'backspace',
      'q',
      'w',
      'e',
      'r',
      't',
      'y',
      'u',
      'i',
      'o',
      'p',
      '{',
      '}',
      'caps',
      'a',
      's',
      'd',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      ':',
      '"',
      'enter',
      'shift',
      'z',
      'x',
      'c',
      'v',
      'b',
      'n',
      'm',
      '<',
      '>',
      '?',
      'keyboard_voice',
      'volume_up',
      'language',
      'space',
      'left',
      'right',
      'done',
    ],
    specialru: [
      'Ё',
      '!',
      '"',
      '№',
      ';',
      '%',
      ':',
      '?',
      '*',
      '(',
      ')',
      '_',
      '+',
      '/',
      'backspace',
      'й',
      'ц',
      'у',
      'к',
      'е',
      'н',
      'г',
      'ш',
      'щ',
      'з',
      'х',
      'ъ',
      'caps',
      'ф',
      'ы',
      'в',
      'а',
      'п',
      'р',
      'о',
      'л',
      'д',
      'ж',
      'э',
      'enter',
      'shift',
      'я',
      'ч',
      'с',
      'м',
      'и',
      'т',
      'ь',
      'б',
      'ю',
      ',',
      'keyboard_voice',
      'volume_up',
      'language',
      'space',
      'left',
      'right',
      'done',
    ],
  },
  getButtonVoice(type, lang) {
    if (Keyboard.properties.voiceButtons) {
      if (type === 'default' && lang === 'en') {
        type = 'audio_en';
      } else if (type === 'default' && lang === 'ru') {
        type = 'audio_ru';
      } else if (type === 'shift') {
        type = 'shift';
      } else if (type === 'backspace') {
        type = 'backspace';
      } else if (type === 'caps') {
        type = 'caps';
      } else if (type === 'enter') {
        type = 'enter';
      }
      const audio = document.querySelector(`audio[id="${type}"]`);
      audio.currentTime = 0;
      audio.play();
    }
  },

  addText() {
    let position = Keyboard.elements.textarea.selectionStart;
    let left = Keyboard.elements.textarea.value.substring(0, position);
    let right = Keyboard.elements.textarea.value.substring(position);
    rec.addEventListener('result', function (e) {
      const text = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      Keyboard.elements.textarea.value = `${left}${text} ${right}`;

      if (e.results[0].isFinal) {
        Keyboard.setPositionCursor(position + text.length + 1);
        position = Keyboard.elements.textarea.selectionStart;
        left = Keyboard.elements.textarea.value.substring(0, position);
        right = Keyboard.elements.textarea.value.substring(position);
      }
    });
  },

  init() {
    Keyboard.elements.main = document.createElement('div');
    Keyboard.elements.keysContainer = document.createElement('div');

    Keyboard.elements.main.classList.add('keyboard', 'keyboard--hidden');
    Keyboard.elements.keysContainer.classList.add('keyboard__keys');
    Keyboard.elements.keysContainer.appendChild(Keyboard._createKeys(Keyboard.layouts.en));

    Keyboard.elements.keys = Keyboard.elements.keysContainer.querySelectorAll('.keyboard__key');

    Keyboard.elements.main.appendChild(Keyboard.elements.keysContainer);
    document.body.appendChild(Keyboard.elements.main);
    Keyboard.elements.textarea.addEventListener('focus', (e) => {
      Keyboard.open(Keyboard.elements.textarea.value, (currentValue) => {
        Keyboard.elements.textarea.value = currentValue;
      });
    });
    Keyboard.keyPressPhys();
    Keyboard.__pressKeys();
  },

  keyPressPhys() {
    Keyboard.elements.textarea.onkeydown = handleDown;
    Keyboard.elements.textarea.onkeyup = handleUp;
    Keyboard.elements.textarea.onkeypress = handlePress;
    function getKeyIndex(e) {
      let buttonIndex;
      const specialArray = {
        Backspace: 'backspace',
        CapsLock: 'caps',
        Shift: 'shift',
        ' ': 'space',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        Enter: 'enter',
      };
      let keyCode = e.key.toLowerCase();
      for (special in specialArray) {
        if (e.key === special) {
          keyCode = specialArray[special];
        }
      }
      for (const layout in Keyboard.layouts) {
        if (Keyboard.properties.language !== 'ru') {
          buttonIndex = Keyboard.layouts[layout].findIndex((item) => item == keyCode);
        } else {
          if (layout === 'en') {
            continue;
          }
          buttonIndex = Keyboard.layouts[layout].findIndex((item) => item == keyCode);
        }

        if (buttonIndex > -1) {
          break;
        }
      }
      return buttonIndex;
    }

    function handleDown(e) {
      const index = getKeyIndex(e);
      Keyboard.elements.keys[index].classList.add('key-pressed');

      if (e.key === 'Shift' && !Keyboard.properties.shift) {
        Keyboard._toggleShift();
        Keyboard.elements.keys[index].classList.add('keyboard__key--active');
      }
    }

    function handleUp(e) {
      const index = getKeyIndex(e);
      Keyboard.elements.keys[index].classList.remove('key-pressed');
      if (e.key === 'Shift') {
        Keyboard._toggleShift();
        Keyboard.elements.keys[index].classList.remove('keyboard__key--active');
      }
      if (e.key === 'CapsLock') {
        Keyboard._toggleCapsLock();
        Keyboard.elements.keys[index].classList.toggle('keyboard__key--active');
      }
    }

    function handlePress(e) {}
  },

  _createKeys(layout) {
    const fragment = document.createDocumentFragment();
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    layout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak =
        (Keyboard.properties.language === 'ru'
          ? ['backspace', 'ъ', 'enter', '.']
          : ['backspace', ']', 'enter', '/']
        ).indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      fragment.appendChild(keyElement);

      switch (key.toLowerCase()) {
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerHTML = createIconHTML('backspace');

          break;

        case 'caps':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--activatable',
            'caps',
            'keyboard__key--dark'
          );
          keyElement.innerHTML = `${createIconHTML('keyboard_capslock')}`;

          break;

        case 'shift':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--activatable',
            'shift',
            'keyboard__key--dark'
          );
          // keyElement.innerHTML = createIconHTML("keyboard_capslock");
          keyElement.innerHTML = 'SHIFT';

          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          break;

        case 'keyboard_voice':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--activatable',
            'keyboard_voice',
            'keyboard__key--dark'
          );

          Keyboard.properties.voiceType
            ? keyElement.classList.add('keyboard__key--active')
            : keyElement.classList.remove('keyboard__key--active');

          keyElement.innerHTML = `${createIconHTML('keyboard_voice')}`;

          break;

        case 'volume_up':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--activatable',
            'volume_up',
            'keyboard__key--dark'
          );

          Keyboard.properties.voiceButtons
            ? keyElement.classList.add('keyboard__key--active')
            : keyElement.classList.remove('keyboard__key--active');

          keyElement.innerHTML = `${createIconHTML('volume_up')}`;

          break;

        case 'language':
          keyElement.classList.add(
            'keyboard__key--wide',
            `language-${Keyboard.properties.language}`,
            'keyboard__key--dark'
          );

          keyElement.innerHTML = createIconHTML('language');
          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');

          break;

        case 'left':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerHTML = createIconHTML('chevron_left');

          break;

        case 'right':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerHTML = createIconHTML('chevron_right');
          break;

        case 'done':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerHTML = createIconHTML('check_circle');

          break;

        default:
          keyElement.textContent = key.toLowerCase();
          break;
      }

      if (insertLineBreak) {
        const br = document.createElement('div');
        br.classList.add('break');
        fragment.appendChild(br);
      }
    });
    return fragment;
  },

  __pressKeys() {
    Keyboard.elements.keys.forEach((key) => {
      switch (key.innerText.toLowerCase()) {
        case 'backspace':
          key.addEventListener('click', () => {
            Keyboard.getButtonVoice('backspace', Keyboard.properties.language);
            const { value, selectionStart: start, selectionEnd: end } = Keyboard.elements.textarea;
            Keyboard.properties.value = `${value.substring(0, start - 1)}${value.substring(end)}`;
            Keyboard._triggerEvent('oninput');
            Keyboard.setPositionCursor(start - 1);
            getCountry();
          });

          break;

        case `keyboard_capslock`:
          key.addEventListener('click', () => {
            Keyboard.getButtonVoice('caps', Keyboard.properties.language);
            Keyboard._toggleCapsLock();
            key.classList.toggle('keyboard__key--active');
            Keyboard.elements.textarea.focus();
            getCountry();
          });

          break;

        case `volume_up`:
          key.addEventListener('click', () => {
            Keyboard.getButtonVoice('default', Keyboard.properties.language);
            Keyboard.properties.voiceButtons = !Keyboard.properties.voiceButtons;
            key.classList.toggle('keyboard__key--active');
            Keyboard.elements.textarea.focus();
            getCountry();
          });

          break;

        case `keyboard_voice`:
          key.addEventListener('click', () => {
            Keyboard.properties.voiceType = !Keyboard.properties.voiceType;
            Keyboard.properties.language === 'en' ? (rec.lang = 'en-US') : (rec.lang = 'ru-RU');
            Keyboard.getButtonVoice('default', Keyboard.properties.language);

            if (Keyboard.properties.voiceType) {
              rec.addEventListener('end', rec.start);
              rec.start();
              Keyboard.addText();
            } else if (!Keyboard.properties.voiceType) {
              rec.removeEventListener('end', rec.start);
              rec.stop();
            }

            key.classList.toggle('keyboard__key--active');
            Keyboard.elements.textarea.focus();
            getCountry();
          });

          break;

        case 'shift':
          key.addEventListener('click', () => {
            Keyboard.getButtonVoice('shift', Keyboard.properties.language);
            Keyboard._toggleShift();
            key.classList.toggle('keyboard__key--active');
            Keyboard.elements.textarea.focus();
            getCountry();
          });

          break;

        case 'keyboard_return':
          key.addEventListener('click', () => {
            Keyboard.getButtonVoice('enter', Keyboard.properties.language);
            const { value, selectionStart: start, selectionEnd: end } = Keyboard.elements.textarea;
            Keyboard.properties.value = `${value.substring(0, start)}\n${value.substring(end)}`;
            Keyboard._triggerEvent('oninput');
            Keyboard.setPositionCursor(start + 1);
            getCountry();
          });

          break;

        case 'language':
          key.addEventListener('click', () => {
            Keyboard.getButtonVoice('default', Keyboard.properties.language);
            Keyboard.properties.shift = false;
            Keyboard.elements.keysContainer.innerHTML = '';
            Keyboard.properties.language === 'en'
              ? (Keyboard.properties.language = 'ru')
              : (Keyboard.properties.language = 'en');
            Keyboard.elements.keysContainer.appendChild(
              Keyboard._createKeys(
                Keyboard.properties.language === 'ru' ? Keyboard.layouts.ru : Keyboard.layouts.en
              )
            );
            Keyboard.elements.keys = Keyboard.elements.keysContainer.querySelectorAll(
              '.keyboard__key'
            );
            if (Keyboard.properties.capsLock) {
              for (const key of Keyboard.elements.keys) {
                if (key.childElementCount === 0) {
                  key.textContent =
                    (Keyboard.properties.capsLock && !Keyboard.properties.shift) ||
                    (!Keyboard.properties.capsLock && Keyboard.properties.shift)
                      ? key.textContent.toUpperCase()
                      : key.textContent.toLowerCase();
                }
                if (key.innerText === 'keyboard_capslock') {
                  key.classList.add('keyboard__key--active');
                }
              }
              Keyboard.elements.textarea.focus();
            }
            Keyboard.__pressKeys();
            Keyboard._triggerEvent('oninput');
            Keyboard.elements.textarea.focus();
            getCountry();
          });

          break;

        case 'space_bar':
          key.addEventListener('click', () => {
            Keyboard.getButtonVoice('default', Keyboard.properties.language);
            const { value, selectionStart: start, selectionEnd: end } = Keyboard.elements.textarea;
            Keyboard.properties.value = `${value.substring(0, start)} ${value.substring(end)}`;
            Keyboard._triggerEvent('oninput');
            Keyboard.setPositionCursor(start + 1);
            getCountry();
          });

          break;

        case 'check_circle':
          key.addEventListener('click', () => {
            Keyboard.getButtonVoice('default', Keyboard.properties.language);
            Keyboard.getButtonVoice('default', Keyboard.properties.language);
            Keyboard.close();
            Keyboard._triggerEvent('onclose');
            getCountry();
          });

          break;

        case 'chevron_right':
          key.addEventListener('click', () => {
            Keyboard.getButtonVoice('default', Keyboard.properties.language);
            Keyboard.getButtonVoice('default', Keyboard.properties.language);
            const { selectionStart: start } = Keyboard.elements.textarea;
            Keyboard.setPositionCursor(start + 1);
            getCountry();
          });

          break;

        case 'chevron_left':
          key.addEventListener('click', () => {
            Keyboard.getButtonVoice('default', Keyboard.properties.language);
            Keyboard.getButtonVoice('default', Keyboard.properties.language);
            const { selectionStart: start } = Keyboard.elements.textarea;
            Keyboard.setPositionCursor(start - 1);
            getCountry();
          });

          break;

        default:
          key.addEventListener('click', () => {
            Keyboard.getButtonVoice('default', Keyboard.properties.language);
            const { value, selectionStart: start, selectionEnd: end } = Keyboard.elements.textarea;

            Keyboard.properties.value =
              (Keyboard.properties.capsLock && !Keyboard.properties.shift) ||
              (!Keyboard.properties.capsLock && Keyboard.properties.shift)
                ? `${value.substring(0, start)}${key.innerText.toUpperCase()}${value.substring(
                    end
                  )}`
                : `${value.substring(0, start)}${key.innerText.toLowerCase()}${value.substring(
                    end
                  )}`;

            Keyboard._triggerEvent('oninput');
            Keyboard.setPositionCursor(start + 1);
            getCountry();
          });

          break;
      }
    });
  },

  setPositionCursor(position) {
    Keyboard.elements.textarea.focus();
    Keyboard.elements.textarea.selectionStart = position;
    Keyboard.elements.textarea.selectionEnd = position;
  },

  _triggerEvent(handlerName) {
    if (typeof Keyboard.eventHandlers[handlerName] === 'function') {
      Keyboard.eventHandlers[handlerName](Keyboard.properties.value);
    }
  },

  _toggleCapsLock() {
    Keyboard.properties.capsLock = !Keyboard.properties.capsLock;

    for (const key of Keyboard.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent =
          (Keyboard.properties.capsLock && !Keyboard.properties.shift) ||
          (!Keyboard.properties.capsLock && Keyboard.properties.shift)
            ? key.textContent.toUpperCase()
            : key.textContent.toLowerCase();
      }
    }
  },

  _toggleShift() {
    Keyboard.properties.shift = !Keyboard.properties.shift;
    for (let i = 0; i < Keyboard.elements.keys.length; i++) {
      if (
        Keyboard.elements.keys[i].childElementCount === 0 &&
        Keyboard.elements.keys[i] !== 'SHIFT'
      ) {
        Keyboard.elements.keys[i].textContent =
          (Keyboard.properties.shift && !Keyboard.properties.capsLock) ||
          (Keyboard.properties.shift && Keyboard.properties.capsLock)
            ? Keyboard.layouts[`special${Keyboard.properties.language}`][i]
            : Keyboard.layouts[`${Keyboard.properties.language}`][i];
        Keyboard.elements.keys[i].textContent =
          (Keyboard.properties.shift && !Keyboard.properties.capsLock) ||
          (!Keyboard.properties.shift && Keyboard.properties.capsLock)
            ? Keyboard.elements.keys[i].textContent.toUpperCase()
            : Keyboard.elements.keys[i].textContent.toLowerCase();
      }
    }
  },

  open(initialValue, oninput, onclose) {
    Keyboard.properties.value = initialValue || '';
    Keyboard.eventHandlers.oninput = oninput;
    Keyboard.eventHandlers.onclose = onclose;
    Keyboard.elements.main.classList.remove('keyboard--hidden');
    document.querySelector('main').addEventListener('click', (e) => {
      console.log('открывается');
      if (e.target.getAttribute('id') !== 'input') Keyboard.close();
    });
  },

  close() {
    Keyboard.properties.value = '';
    Keyboard.eventHandlers.oninput = oninput;
    Keyboard.eventHandlers.onclose = onclose;
    Keyboard.elements.main.classList.add('keyboard--hidden');
  },
};
