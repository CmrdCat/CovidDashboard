/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import init from '../../index';

export default async function chooseWorld(configuration) {
  const button = document.createElement('ul');
  button.classList.add('navbar-nav', 'mr-auto');
  button.innerHTML = `<li class="nav-item">
  <a class="nav-link" id="choose-world">Get data for world</a>
  </li>`;
  document.querySelector('nav').innerHTML = `<a class="navbar-brand" href="#">COVID-19 Dashboard</a>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarTogglerDemo01"
    aria-controls="navbarTogglerDemo01"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
    <form class="form-inline my-2 my-lg-0">
      <input
        class="form-control mr-sm-2 use-keyboard-input"
        type="search"
        placeholder="Country"
        aria-label="Country"
        id="input"
      />
      <button id="choose" class="btn btn-outline-success my-2 my-sm-0">Choose country</button>
    </form>
  </div>`;
  document.querySelector('.navbar-brand').after(button);
  document.querySelector('#choose-world').addEventListener('click', () => {
    configuration.country = 'all';
    init();
  });
}
