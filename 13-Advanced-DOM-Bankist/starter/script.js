'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
   modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(Btn => Btn.addEventListener('click',openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


/////////////////////////////////////////////////
// Selecting the element
const header = document.querySelector('.header');

// Creating An Element
const Message = document.createElement("div");
Message.classList.add("cookie-message");
Message.innerHTML = 'Cookie are used to make some of the best modification for the user convinence... <button class="btn btn-close-cookie">Got it</button>';

// header.before(Message);
// header.after(Message);
// header.prepend(Message);
header.append(Message);
// header.append(Message.cloneNode(true));

// Deleting the element
document.querySelector(".btn-close-cookie").addEventListener("click",()=>{
  Message.remove();
})


// Changing the styles
header.style.overflow = "hidden";
Message.style.backgroundColor = "#37383d";
Message.style.width = "120%";

console.log(getComputedStyle(Message).height);
console.log(getComputedStyle(Message).color);


//// Changing the color of the root element
// document.documentElement.style.setProperty("--color-primary","orangered");



//// Attributes Setting and getting the values of it...
const logo = document.querySelector(".nav__logo");

console.log(logo.alt);
logo.alt = "Simple Minamalist Logo";
console.log(logo.alt);

logo.setAttribute("company","Bankist");
console.log(logo.getAttribute("company"));

console.log(logo.src); // Absolute Path
console.log(logo.getAttribute("src")); // Relative Path


const link = document.querySelector(".nav__link--btn");
console.log(link.href); // Absolute Path
console.log(link.getAttribute("href")); // Relative Path


// data 
console.log(logo.dataset.versionNumber);


// Classes
logo.classList.add("yourClass","SecondClass");
logo.classList.remove("yourClass");
logo.classList.toggle("yourClass");
logo.classList.contains("yourClass");



// Scrolling effect
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click",(event)=>{
  const s1Coordinantion = section1.getBoundingClientRect();
  console.log(s1Coordinantion);
  console.log(event.target.getBoundingClientRect());

  console.log(`X and Y Coordinates : ${window.pageXOffset} And ${window.pageYOffset}`);

  console.log(`Height And Width of the viewport : ${document.documentElement.clientHeight} and ${document.documentElement.clientWidth}`);

  //// Scrolling (First Way)
  // window.scrollTo(s1Coordinantion.left + window.pageXOffset, s1Coordinantion.top + window.pageYOffset);


  //// Scrolling (Second Way)
  // window.scrollTo({
  //   left: s1Coordinantion.left + window.pageXOffset,
  //   top: s1Coordinantion.top + window.pageYOffset,
  //   behavior : "smooth"
  // });


  // Scrolling (Third Way And Only Supported In the Modern Browsers)
  section1.scrollIntoView({behavior : "smooth"});

})


//// Navbar Smooth Scrolling Effect
document.querySelector(".nav__links").addEventListener("click",(e)=>{
  e.preventDefault();
  if(e.target.classList.contains("nav__link")){
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior : "smooth"
    })
  }
})






//// Tabbed Components
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click",(e)=>{
  const clicked = e.target.closest(".operations__tab");

  if(!clicked) return;

  // Activating the Tab
  tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  // Activating the content
  tabsContent.forEach(content => content.classList.remove("operations__content--active"));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");

})




//// Nav Fade Animation
const nav = document.querySelector(".nav");

const OpactityChanger = (e,opacity) => {
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach(element =>{
      if(element !== link) element.style.opacity = opacity;
    })
    logo.style.opacity = opacity;
  }
}

nav.addEventListener("mouseover",(e)=>{
  OpactityChanger(e,0.5);
})

nav.addEventListener("mouseout",(e)=>{
  OpactityChanger(e,1);
})




//// Sticky NavBar On scroll
const initialCoords = section1.getBoundingClientRect();
window.addEventListener("scroll",()=>{
  if(window.scrollY > initialCoords.top){
    nav.classList.add("sticky");
  }else{
    nav.classList.remove("sticky");
  }
})



//// Revelling Elements on Scroll
const allSections = document.querySelectorAll(".section");
const revelSection = function (entries,observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revelSection,{
  root : null,
  threshold : 0.15,
});

allSections.forEach(function(section){
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
})



//// Lazy Load images
const imgTarget = document.querySelectorAll("img[data-src]");

const loadImg = function(entries,observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load",()=>{
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg,{
  root : null,
  threshold : 0,
  rootMargin : "200px"
});

imgTarget.forEach(img => imgObserver.observe(img));







//// Carousel Or Slider
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
let curSlide = 0;
const maxSlide = slides.length;

// slider.style.transform = `scale(0.5)`;
// slider.style.overflow = `visible`;

slides.forEach((slide,index) => {
    slide.style.transform = `translateX(${100 * index}%)`;
})




// 2. Dots Creation and Clicked Function of slider
const dotsContainer = document.querySelector(".dots");
const createDots = () => {
  slides.forEach((_,index)=>{
    dotsContainer.insertAdjacentHTML("beforeend",`<button class="dots__dot" data-slide="${index}"></button>`)
  })
}
createDots();

const ActiveDots = function(slide){
  document.querySelectorAll(".dots__dot").forEach(dot => dot.classList.remove("dots__dot--active"));
  document.querySelector(`.dots__dot[data-slide = "${slide}"]`).classList.add("dots__dot--active");
}
ActiveDots(0);


dotsContainer.addEventListener("click",(e)=>{
  if(e.target.classList.contains("dots__dot")){
    const slideNum = e.target.dataset.slide;

    slides.forEach((slide,index)=>{
      slide.style.transform = `translateX(${100 * (index - slideNum)}%)`;
    })
    ActiveDots(slideNum);
  }
})





btnLeft.addEventListener("click",()=>{
  if(curSlide === 0){
    curSlide = maxSlide - 1;
  }else{
    curSlide--;
  }
  slides.forEach((slide,index) => {
    slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
  })
  ActiveDots(curSlide);
})


btnRight.addEventListener("click",()=>{
  if(curSlide === maxSlide-1){
    curSlide = 0;
  }else{
  curSlide++;
  }
  slides.forEach((slide,index) => {
    slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
  })
  ActiveDots(curSlide);
})




// Building Slider Components

// 1. KeyBoard key press
document.addEventListener("keydown",(e)=>{
  if(e.key === 'ArrowLeft'){
    if(curSlide === 0){
      curSlide = maxSlide - 1;
    }else{
      curSlide--;
    }
    slides.forEach((slide,index) => {
      slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
    })
  ActiveDots(curSlide);
  }
  else if(e.key === 'ArrowRight'){
    if(curSlide === maxSlide-1){
      curSlide = 0;
    }else{
    curSlide++;
    }
    slides.forEach((slide,index) => {
      slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
    })
  ActiveDots(curSlide);
  }
})

