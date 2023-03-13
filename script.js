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

// Sticky navigation
// const section1Coords = section1.getBoundingClientRect();
// console.log(section1Coords.top);

// window.addEventListener('scroll', function () {
//   if (window.scrollY > section1Coords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//Sticky navigation Intersection Observer API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
//2. create function for API
const stickyNav = function (entries) {
  const [entry] = entries; // happens when header intersecting viewport| we have only 1 entry: 0
  if (!entry.isIntersecting) {
    // if intersecting is false
    nav.classList.add('sticky'); //add class
  } else {
    nav.classList.remove('sticky');
  }
};

//1. create API with 2 args(function and options)
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // observes viewport
  threshold: 0, // when header is outside of viewport
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header); //what we observe

//Reveal sections
//1. we add class="section--hide" to hide all sections so we could remove it once we observe
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  //use only when intersecting
  if (!entry.isIntersecting) return; //remove only from targets
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  //only if intersecting
  if (!entry.isIntersecting) return;
  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove('lazy-img'); if slow network, blur dissapears, but new img still loading
  entry.target.addEventListener('load', function () {
    this.classList.remove('lazy-img');
  });
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));

//Slider
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slides = document.querySelectorAll('.slide');

let curSlide = 0;
const maxSlide = slides.length - 1;

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);
const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};
const prevSlide = function () {
  if (curSlide <= 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
