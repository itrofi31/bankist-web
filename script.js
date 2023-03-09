'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

//popup modal
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// const header = document.querySelector('.header');

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = `We use cookies for statistic and analytics <button class="btn btn--close-cookie">Close</button>`;
// header.append(message);
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', () => message.remove());

// message.style.backgroundColor = '#37383d';
// message.style.width = '106%';

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
//scroll
const scrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
scrollTo.addEventListener('click', () =>
  section1.scrollIntoView({ behavior: 'smooth' })
);

// const h1 = document.querySelector('h1');
// const alertH1 = function () {
//   alert('h1 is here');
//   h1.removeEventListener('mouseenter', alertH1);
// };
// h1.addEventListener('mouseenter', alertH1);

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// console.log(h1.querySelector('h1'));
//Tabs
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  //if there's span inside the btn, we need btn, not tab
  let clicked = e.target.closest('.operations__tab');
  //if null - stop
  if (!clicked) return;

  //ACTIVE TAB
  //when click on tab, remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  clicked.classList.add('operations__tab--active');

  //ACTIVE CONTENT
  //remove active
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    //select siblings

    siblings.forEach(s => {
      if (s !== link) s.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//bind sets this keyword  and we set it for opacity
//this is passing "argument into the event handler"
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));
