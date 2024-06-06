'use strict';
//////////////////////////////////////////////////////////////////////////////
// ------------------------Modal window--------------------
//////////////////////////////////////////////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// ----------------------functions--------------------------
const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// ----------------------------------------------------------------
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////////////////////////////////
// ------------------------Implementing smooth scrolling---------------------
//////////////////////////////////////////////////////////////////////////////
const section1 = document.querySelector('#section--1');
const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1Cods = section1.getBoundingClientRect();

btnScrollTo.addEventListener('click', function (e) {
  // console.log(e.target.getBoundingClientRect());
  // console.log(window.pageXOffset, window.pageYOffset);

  // old way of implementing smooth scrolling

  // window.scrollTo({
  //   left: section1Cods.left + window.pageXOffset,
  //   top: section1Cods.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // modern way of implementing smooth scrolling
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});
//////////////////////////////////////////////////////////////////////////////
// ---------Implementing page navigation using event delegation-----------
//////////////////////////////////////////////////////////////////////////////
// const links = document.querySelectorAll('.nav__link');
// // console.log(links);

// links.forEach(function (ele) {
//   // console.log(ele);

//   ele.addEventListener('click', function (e) {
//     e.preventDefault();

//     // console.log(e.target.textContent);

//     const id = e.target.getAttribute('href');
//     // console.log(id);

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// event delegation
const nav = document.querySelector('.nav__links');
console.log(nav);

nav.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('btn--show-modal')
  ) {
    console.log(e.target);

    const id = e.target.getAttribute('href');
    console.log(id);

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//////////////////////////////////////////////////////////////////////////////
// ---------Implementing ptabbed component-----------
//////////////////////////////////////////////////////////////////////////////
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

// listening to events using event delegation
tabsContainer.addEventListener('click', function (e) {
  const clikedTab = e.target.closest('.operations__tab ');

  console.log(clikedTab);

  if (!clikedTab) return;

  tabs.forEach(function (tab) {
    tab.classList.remove('operations__tab--active');
  });
  tabsContent.forEach(function (content) {
    content.classList.remove('operations__content--active');
  });

  clikedTab.classList.add('operations__tab--active');

  console.log(clikedTab.dataset.tab);

  document
    .querySelector(`.operations__content--${clikedTab.dataset.tab} `)
    .classList.add('operations__content--active');
});
//////////////////////////////////////////////////////////////////////////////
// ---------Implementing manu fade animations-----------
//////////////////////////////////////////////////////////////////////////////

// ----------------------functions--------------------------
const hoverHandle = function (e) {
  const clicked = e.target;

  if (clicked.classList.contains('nav__link')) {
    const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
    const logo = clicked.closest('.nav').querySelector('img');

    console.log(siblings);

    siblings.forEach(sibling => {
      if (clicked !== sibling) sibling.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// ------------------------------------------------

const navBar = document.querySelector('.nav');

// working but not that good in readabiliity
// navBar.addEventListener('mouseover', function (e) {
//   hoverHandle(e, 0.5);
// });

// navBar.addEventListener('mouseout', function (e) {
//   hoverHandle(e, 1);
// });

// batter way

navBar.addEventListener('mouseover', hoverHandle.bind(0.5));
navBar.addEventListener('mouseout', hoverHandle.bind(1));

//////////////////////////////////////////////////////////////////////////////
// ---------Implementing sticky navigation-----------
//////////////////////////////////////////////////////////////////////////////

// const section1InitialCords=section1.getBoundingClientRect()
// window.addEventListener('scroll', function(e){
//   if(window.scrollY>section1InitialCords.top){
//     navBar.classList.add('sticky')
//   }
//   else{
//     navBar.classList.remove('sticky')  }
// })

// batter way(intersectionObserver api)

const header = document.querySelector('.header');
const navBarHeight = navBar.getBoundingClientRect().height;

// ----------------------functions--------------------------
const sticky = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) {
    navBar.classList.add('sticky');
  } else {
    navBar.classList.remove('sticky');
  }
};
// --------------------------------------
const stickyOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navBarHeight}px`,
};
const headerObserver = new IntersectionObserver(sticky, stickyOptions);
headerObserver.observe(header);

//////////////////////////////////////////////////////////////////////////////
// ---------Implementing section revealing-----------
//////////////////////////////////////////////////////////////////////////////

const allSections = document.querySelectorAll('.section');

// ----------------------functions--------------------------
const sectObsCallBack = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  // console.log(entry.target);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
// ---------------------------------------------
const sectObsOpt = {
  root: null,
  threshold: 0.1,
};

const sectionObserver = new IntersectionObserver(sectObsCallBack, sectObsOpt);

allSections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});
//////////////////////////////////////////////////////////////////////////////
// ---------Implementing lazy image loading-----------
//////////////////////////////////////////////////////////////////////////////

const imgs = document.querySelectorAll('img[data-src]');
// console.log(imgs);

// --------functions--------

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
// ----------------------------------------------
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgs.forEach(img => imgObserver.observe(img));
//////////////////////////////////////////////////////////////////////////////
// ---------Implementing slider  -----------
//////////////////////////////////////////////////////////////////////////////
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotsContainer = document.querySelector('.dots');

  // --------functions--------

  const initial = function () {
    currentSlide = 0;
    NoOfSlide = slides.length;
    createDots();
    activateDot(currentSlide);
    moveSlide(currentSlide);
  };

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot, i) => dot.classList.remove('dots__dot--active'));
    const activeDot = document.querySelector(`[data-slide="${slide}"]`);
    // console.log(activeDot);
    // console.log('active dot= ' + activeDot.dataset.slide);
    activeDot.classList.add('dots__dot--active');
  };

 

  const moveSlide = function (curSlide) {
    slides.forEach(function (slide, i) {
      slide.style.transform = `translate(${100 * (i - curSlide)}%)`;
    });
  };

  const nextSlide = function (e) {
    if (currentSlide === NoOfSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    moveSlide(currentSlide);
    activateDot(currentSlide);
  };

  const previousSlide = function (e) {
    if (currentSlide === 0) {
      currentSlide = NoOfSlide - 1;
    } else {
      currentSlide--;
    }
    moveSlide(currentSlide);
    activateDot(currentSlide);
  };

  // -----------------------------

  let currentSlide, NoOfSlide;

  initial();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', previousSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e.key);
    if (e.key === 'ArrowRight') {
      nextSlide();
      activateDot(currentSlide);
    } else if (e.key === 'ArrowLeft') {
      previousSlide();
      activateDot(currentSlide);
    }
  });

  dotsContainer.addEventListener('click', function (e) {
    const clicked = e.target;
    if (!clicked.classList.contains('dots__dot')) return;
    const slide = clicked.getAttribute('data-slide');
    console.log(slide);

    moveSlide(slide);
    activateDot(slide);
  });
};
slider();
