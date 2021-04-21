'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
let score0EL = document.querySelector('#score--0');
let score1EL = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  current__score = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

let score = [0, 0];
let current__score = 0;
let activePlayer = 0;
let playing = true;

// Setting the initial Values
score0EL.textContent = 0;
score1EL.textContent = 0;
dice.classList.add('hidden');

// Setting the rolling functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    let RandomNumber = Math.trunc(Math.random() * 6) + 1;

    dice.classList.remove('hidden');
    dice.src = `dice-${RandomNumber}.png`;

    if (RandomNumber !== 1) {
      current__score += RandomNumber;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = current__score;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  score[activePlayer] += current__score;
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];

  if (score[activePlayer] >= 20) {
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    dice.classList.add('hidden');
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', () => {
  playing = true;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current__score = 0;
  score = [0, 0];
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  dice.classList.add('hidden');
});
