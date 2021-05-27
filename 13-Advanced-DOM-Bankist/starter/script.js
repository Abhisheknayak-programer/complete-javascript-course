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