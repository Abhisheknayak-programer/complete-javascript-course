"use strict";
const playerEl0 = document.querySelector(".player--0");
const playerEl1 = document.querySelector(".player--1");
let scoreEl0 = document.getElementById("score--0");
let scoreEl1 = document.getElementById("score--1");
let currentEl0 = document.querySelector("#current--0");
let currentEl1 = document.querySelector("#current--1");
let DiceEl = document.querySelector(".dice");
let btnRoll = document.querySelector(".btn--roll");
let btnNew = document.querySelector(".btn--new");
let btnHold = document.querySelector(".btn--hold");

let currentScore, playing, score, activePlayer;

const init = () => {
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  DiceEl.classList.add("hidden");
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  score = [0, 0];
  playerEl0.classList.add("player--active");
  playerEl1.classList.remove("player--active");
  playerEl0.classList.remove("player--winner");
  playerEl1.classList.remove("player--winner");
};

init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEl0.classList.toggle("player--active");
  playerEl1.classList.toggle("player--active");
};

btnNew.addEventListener("click", () => {
  init();
});

btnRoll.addEventListener("click", () => {
  if (playing) {
    let RandomNumber = Math.trunc(Math.random() * 6) + 1;

    DiceEl.classList.remove("hidden");
    DiceEl.src = `dice-${RandomNumber}.png`;

    if (RandomNumber !== 1) {
      currentScore = currentScore + RandomNumber;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  score[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];

  if (score[activePlayer] >= 20) {
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");

    dice.classList.add("hidden");
  } else {
    switchPlayer();
  }
});
