/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

export default Keyboard = {
  elements: {
    main: null,
    keyContainer: null,
    keys: [],
  },

  eventHandelers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    capsLock: false,
    shift: false,
    keySound: true,
    lang: 'en',
    cursorPos: 0,
  },

  initKeyboard() {
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
    this.elements.main.addEventListener('mouseleave', (ev) => {
      this.close();
      this.triggerEvent('oninput');
    });

    this.properties.cursorPos = this.properties.value.selectionStart;

    document.querySelectorAll('.use-keyboard-input').forEach((element) => {
      element.addEventListener('focus', () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
      element.addEventListener('click', (event) => {
        this.properties.cursorPos = event.target.selectionStart;
      });
    });

    document.addEventListener('keydown', (event) => {
      Array.prototype.slice
        .call(document.querySelectorAll('.keyboard__key'))
        .filter(function (el) {
          if (el.dataset.Key === event.key) {
            if (
              el.dataset.Key === 'Shift' ||
              el.dataset.Key === 'CapsLock' ||
              el.dataset.Key === 'Escape' ||
              el.dataset.Key === 'Escape'
            ) {
              el.click();
            }
            return true;
          }
          return false;
        })[0]
        .animate([{ borderRadius: '4px' }, { borderRadius: '15px' }], {
          duration: 300,
        });
    });
    document.addEventListener('keyup', (event) => {
      this.properties.value = document.querySelector('.use-keyboard-input').value;
      this.properties.cursorPos = event.target.selectionStart;
    });
  },

  setCaretPosition(ctrl, pos) {
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(pos, pos);
    } else if (ctrl.createTextRange) {
      const range = ctrl.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    let keyLayout = [];
    let breakLines = [];
    let keyShift = [];

    if (this.properties.lang === 'en') {
      keyLayout = [
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
        'backspace',
        'sound',
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
        '\\',
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
        'done',
        'switch',
        'space',
        'left',
        'right',
      ];
      keyShift = [
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
        'backspace',
        'sound',
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
        '|',
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
        'done',
        'switch',
        'space',
        'left',
        'right',
      ];
      breakLines = ['backspace', ']', '}', 'enter', '/', '?'];
    }
    if (this.properties.lang === 'ru') {
      keyLayout = [
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
        'backspace',
        'sound',
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
        '\\',
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
        'done',
        'switch',
        'space',
        'left',
        'right',
      ];
      keyShift = [
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
        'backspace',
        'sound',
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
        '/',
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
        'done',
        'switch',
        'space',
        'left',
        'right',
      ];
      breakLines = ['backspace', 'ъ', 'Ъ', 'enter', '.', ','];
    }

    this.properties.shift ? (this.elements.keys = keyShift) : (this.elements.keys = keyLayout);

    const createIconHTML = (icon_name) => {
      return `<i class='material-icons'>${icon_name}</i>`;
    };

    this.elements.keys.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = breakLines.indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('backspace');
          keyElement.dataset.Key = 'Backspace';

          keyElement.addEventListener('click', () => {
            const left = this.properties.value.slice(0, this.properties.cursorPos);
            const right = this.properties.value.slice(this.properties.cursorPos);
            if (this.properties.keySound) {
              new Audio(`./keyboard-sounds/${this.properties.lang}5.mp3`).play();
            }
            this.properties.value = `${left.substring(0, left.length - 1)}${right}`;
            this.properties.cursorPos < 1
              ? (this.properties.cursorPos = 0)
              : (this.properties.cursorPos -= 1);
            this.triggerEvent('oninput');
            this.setCaretPosition(
              document.querySelector('.use-keyboard-input'),
              this.properties.cursorPos
            );
          });
          break;

        case 'caps':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = createIconHTML('keyboard_capslock');
          keyElement.dataset.Key = 'CapsLock';
          if (this.properties.capsLock) {
            keyElement.classList.toggle('keyboard__key--active');
          }

          keyElement.addEventListener('click', () => {
            if (this.properties.keySound) {
              new Audio(`./keyboard-sounds/${this.properties.lang}4.mp3`).play();
            }
            this.toggleCapsLock();
            this.elements.keysContainer.textContent = '';
            this.elements.keysContainer.appendChild(this.createKeys());
            this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
          });
          break;
        case 'sound':
          keyElement.classList.add('keyboard__key--wide');
          if (this.properties.keySound) {
            keyElement.innerHTML = createIconHTML('volume_up');
          } else {
            keyElement.innerHTML = createIconHTML('volume_off');
          }

          keyElement.addEventListener('click', () => {
            this.toggleSound();
            if (this.properties.keySound) {
              new Audio(`./keyboard-sounds/${this.properties.lang}1.mp3`).play();
            }
            this.elements.keysContainer.textContent = '';
            this.elements.keysContainer.appendChild(this.createKeys());
            this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
          });
          break;
        case 'shift':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          if (this.properties.shift) {
            keyElement.classList.toggle('keyboard__key--active');
          }
          keyElement.innerHTML = createIconHTML('publish');
          keyElement.dataset.Key = 'Shift';

          keyElement.addEventListener('click', () => {
            if (this.properties.keySound) {
              new Audio(`./keyboard-sounds/${this.properties.lang}3.mp3`).play();
            }
            this.toggleShift();
            this.elements.keysContainer.textContent = '';
            this.elements.keysContainer.appendChild(this.createKeys());
            this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
          });
          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('keyboard_return');
          keyElement.dataset.Key = 'Enter';

          keyElement.addEventListener('click', () => {
            const left = this.properties.value.slice(0, this.properties.cursorPos);
            const right = this.properties.value.slice(this.properties.cursorPos);
            if (this.properties.keySound) {
              new Audio(`./keyboard-sounds/${this.properties.lang}2.mp3`).play();
            }
            this.properties.value = `${left}\n${right}`;
            this.properties.cursorPos += 1;
            this.triggerEvent('oninput');
            this.setCaretPosition(
              document.querySelector('.use-keyboard-input'),
              this.properties.cursorPos
            );
          });
          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');
          keyElement.dataset.Key = ' ';

          keyElement.addEventListener('click', () => {
            if (this.properties.keySound) {
              new Audio(`./keyboard-sounds/${this.properties.lang}1.mp3`).play();
            }
            const left = this.properties.value.slice(0, this.properties.cursorPos);
            const right = this.properties.value.slice(this.properties.cursorPos);
            this.properties.value = `${left} ${right}`;
            this.properties.cursorPos += 1;
            this.triggerEvent('oninput');
            this.setCaretPosition(
              document.querySelector('.use-keyboard-input'),
              this.properties.cursorPos
            );
          });
          break;

        case 'done':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerHTML = createIconHTML('keyboard_hide');
          keyElement.dataset.Key = 'Escape';

          keyElement.addEventListener('click', () => {
            if (this.properties.keySound) {
              new Audio(`./keyboard-sounds/${this.properties.lang}1.mp3`).play();
            }
            this.close();
            this.triggerEvent('oninput');
          });
          break;
        case 'left':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('west');
          keyElement.dataset.Key = 'ArrowLeft';

          keyElement.addEventListener('click', () => {
            if (this.properties.keySound) {
              new Audio(`./keyboard-sounds/${this.properties.lang}1.mp3`).play();
            }
            this.properties.cursorPos < 1
              ? (this.properties.cursorPos = 0)
              : (this.properties.cursorPos -= 1);
            this.setCaretPosition(
              document.querySelector('.use-keyboard-input'),
              this.properties.cursorPos
            );
          });
          break;

        case 'right':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('east');
          keyElement.dataset.Key = 'ArrowRight';

          keyElement.addEventListener('click', () => {
            if (this.properties.keySound) {
              new Audio(`./keyboard-sounds/${this.properties.lang}1.mp3`).play();
            }
            this.properties.cursorPos > this.properties.value.length
              ? (this.properties.cursorPos = this.properties.value.length)
              : (this.properties.cursorPos += 1);
            this.setCaretPosition(
              document.querySelector('.use-keyboard-input'),
              this.properties.cursorPos
            );
          });
          break;

        case 'switch':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = this.properties.lang;

          keyElement.addEventListener('click', () => {
            if (this.properties.lang === 'ru') {
              this.properties.lang = 'en';
              keyElement.textContent = this.properties.lang;
            } else if (this.properties.lang === 'en') {
              this.properties.lang = 'ru';
              keyElement.textContent = this.properties.lang;
            }
            if (this.properties.keySound) {
              new Audio(`./keyboard-sounds/${this.properties.lang}1.mp3`).play();
            }
            this.elements.keysContainer.textContent = '';
            this.elements.keysContainer.appendChild(this.createKeys());
            this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
          });
          break;

        default:
          if (this.properties.capsLock && this.properties.shift) {
            keyElement.textContent = key.toLowerCase();
          } else if (this.properties.capsLock) {
            keyElement.textContent = key.toUpperCase();
          } else if (this.properties.shift) {
            keyElement.textContent = key.toUpperCase();
          } else {
            keyElement.textContent = key.toLowerCase();
          }
          keyElement.dataset.Key = `${keyElement.textContent}`;

          keyElement.addEventListener('click', () => {
            const left = this.properties.value.slice(0, this.properties.cursorPos);
            const right = this.properties.value.slice(this.properties.cursorPos);
            this.properties.value = `${left}${keyElement.innerText}${right}`;
            if (this.properties.keySound) {
              new Audio(`./keyboard-sounds/${this.properties.lang}1.mp3`).play();
            }
            this.properties.cursorPos += 1;
            this.triggerEvent('oninput');
            this.setCaretPosition(
              document.querySelector('.use-keyboard-input'),
              this.properties.cursorPos
            );
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  },

  triggerEvent(handlerName) {
    if (typeof this.eventHandelers[handlerName] === 'function') {
      this.eventHandelers[handlerName](this.properties.value);
    }
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
  },
  toggleShift() {
    this.properties.shift = !this.properties.shift;
  },
  toggleSound() {
    this.properties.keySound = !this.properties.keySound;
  },
  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandelers.oninput = oninput;
    this.eventHandelers.onclose = onclose;
    this.elements.main.classList.remove('keyboard--hidden');
  },

  close() {
    this.properties.value = '';
    this.eventHandelers.oninput = oninput;
    this.eventHandelers.onclose = onclose;
    this.elements.main.classList.add('keyboard--hidden');
  },
};

// window.addEventListener('DOMContentLoaded', function () {
//   Keyboard.initKeyboard();
// });
