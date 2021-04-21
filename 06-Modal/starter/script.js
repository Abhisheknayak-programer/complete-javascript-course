'use strict';
const showModel = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

const ShowModelFunc = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const CloseModalFunc = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < showModel.length; i++) {
  showModel[i].addEventListener('click', ShowModelFunc);
  closeModalButton.addEventListener('click', CloseModalFunc);
  overlay.addEventListener('click', CloseModalFunc);
}
