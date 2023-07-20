import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)

// Видео тренажерный зал

const videoButton = document.querySelector('#video-button');
const videoImg = document.querySelector('#video-img');
const video = document.querySelector('#video');
const videoPlayer = document.querySelector('#video-player');

videoButton.addEventListener('click', ()=> {
  videoImg.style.display = 'none';
  videoPlayer.style.display = 'block';
  video.src += '?autoplay=1';
});

// Табы абонементов

const subscriptionButton = document.querySelectorAll('.subscription__term-button');
const offerList = document.querySelectorAll('.offer__list');

if (offerList) {
  subscriptionButton.forEach((button) => {
    button.classList.remove('subscription__term-button--active');
  });
  offerList.forEach((list) => {
    list.classList.remove('offer__list--active');
  });

  subscriptionButton[0].classList.add('subscription__term-button--active');
  offerList[0].classList.add('offer__list--active');

  const changeList = (index) => {
    subscriptionButton.forEach((button) => {
      button.classList.remove('subscription__term-button--active');
    });
    offerList.forEach((list)=> {
      list.classList.remove('offer__list--active');
    });

    subscriptionButton[index].classList.add('subscription__term-button--active');
    offerList[index].classList.add('offer__list--active');
  };

  subscriptionButton.forEach((element, index) => {
    element.addEventListener('click', (evt) => {
      evt.preventDefault();
      changeList(index);
    });
  });
}

// Слайдер тренера

const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  loop: true,
  navigation: {
    nextEl: '.trainers__button-next',
    prevEl: '.trainers__button-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 40,
    },
  },
});
