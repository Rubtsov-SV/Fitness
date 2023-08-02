import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import { compile } from 'sass';

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

// Скрол
const bannerScroll = document.querySelector('.banner-scroll');
const subscription = document.querySelector('#subscription');

if (bannerScroll) {
  bannerScroll.addEventListener('click', function (evt) {
    evt.preventDefault();
    subscription.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
}

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

const mySwiper = new Swiper('.swiper', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  loop: true,
  navigation: {
    nextEl: '.trainers__button-next',
    prevEl: '.trainers__button-prev',
  },
  breakpoints: {
    650: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 40,
    },
    1366: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 40,
    },
  },
});


// Табы вопросов

const questionsButton = document.querySelectorAll('.questions__categories-button');
const answerList = document.querySelectorAll('.answer__list');

if (answerList) {
  questionsButton.forEach((button) => {
    button.classList.remove('questions__categories-button--active');
  });
  answerList.forEach((list) => {
    list.classList.remove('answer__list--active');
  });

  questionsButton[0].classList.add('questions__categories-button--active');
  answerList[0].classList.add('answer__list--active');

  const changeList = (index) => {
    questionsButton.forEach((button) => {
      button.classList.remove('questions__categories-button--active');
    });
    answerList.forEach((list)=> {
      list.classList.remove('answer__list--active');
    });

    questionsButton[index].classList.add('questions__categories-button--active');
    answerList[index].classList.add('answer__list--active');
  };

  questionsButton.forEach((element, index) => {
    element.addEventListener('click', (evt) => {
      evt.preventDefault();
      changeList(index);
    });
  });
}


// Аккордеон вопросы

const answerText = document.querySelectorAll('.answer__item-reply');
const answerIcon = document.querySelectorAll('.answer__item-icon');
const answerButton = document.querySelectorAll('.answer__item');

if (answerButton) {
  answerText.forEach((text) => {
    text.classList.remove('answer__item-reply--active');
  });
  answerIcon.forEach((icon) => {
    if (icon.classList.contains('answer__item-icon--open')) {
      icon.classList.remove('answer__item-icon--close');
    } else {
      icon.classList.add('answer__item-icon--open');
      icon.classList.remove('answer__item-icon--close');
    }
  });

  const accordion = (index) => {

    answerText[index].classList.toggle('answer__item-reply--active');
    answerIcon[index].classList.toggle('answer__item-icon--open');
    answerIcon[index].classList.toggle('answer__item-icon--close');
  };

  answerButton.forEach((element, index) => {
    element.addEventListener('click', (evt) => {
      evt.preventDefault();
      accordion(index);
    });
  });
}

// Слайдер отзывы

const swiperFeedback = new Swiper('.feedback__slider', {
  loop: true,
  navigation: {
    nextEl: '.feedback__button-next',
    prevEl: '.feedback__button-prev',
  },
});

// Проверка на валидность формы

let input = document.querySelector('.contacts__feedback-phone');
let erorrPhone = document.querySelector('.contacts__erorr-phone');
let form = document.querySelector('form');

const eventPhone = () => {

  let rules = input.dataset.rules;
  let value = input.value;
  let checkPhone;
  switch (rules) {
    case 'tel':
      checkPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7}$/.test(value);
      break;
  }
  if (!checkPhone) {
    erorrPhone.style.display = 'block';
    input.style.borderBottomColor = '#FF121F';
    return false;
  } else {
    erorrPhone.style.display = 'none';
    input.style.borderBottomColor = '#74819C';
    return true;
  }
};
let inputName = document.querySelector('.contacts__feedback-name');
let erorrName = document.querySelector('.contacts__erorr-name');

const eventName = () => {

  let name = inputName.dataset.name;
  let value = inputName.value;
  let checkName;
  switch (name) {
    case 'name':
      checkName = /^[a-zA-Z\-]+$/.test(value);
      break;
  }
  if (!checkName) {
    erorrName.style.display = 'block';
    inputName.style.borderBottomColor = '#FF121F';
    return false;
  } else {
    erorrName.style.display = 'none';
    inputName.style.borderBottomColor = '#74819C';
    return true;
  }
};

form.addEventListener('submit', (event) => {
  if (eventPhone() === false || eventName() === false) {
    event.preventDefault();
    return false;
  } else {
    event.preventDefault();
    form.submit();
    form.reset();
    return true;
  }
});
