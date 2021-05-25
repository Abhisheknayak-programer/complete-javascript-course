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