'use strict';

// selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const players = document.querySelectorAll('.player');

const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');

// initial condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;

// Dice rolling FN
rollBtn.addEventListener('click', () => {
  console.log(activePlayer);
  const diceNumber = Math.trunc(Math.random() * 6) + 1;

  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${diceNumber}.png`;

  // Game role for dice eq to one
  if (diceNumber === 1) {
    // switch player
    currentScore = 0;
    players[0].classList.toggle('player--active');
    players[1].classList.toggle('player--active');
    diceEl.classList.add('hidden');
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;

    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  } else {
    // add diceNumber to current score of active player
    currentScore += diceNumber;

    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  }
});
