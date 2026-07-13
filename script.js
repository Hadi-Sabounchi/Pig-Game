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
let scores, activePlayer, currentScore;

const gamePresets = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  rollBtn.classList.remove('hidden');
  holdBtn.classList.remove('hidden');
  players[activePlayer].classList.add('player--active');
};

gamePresets();

const switchPlayer = function () {
  currentScore = 0;

  players[0].classList.toggle('player--active');
  players[1].classList.toggle('player--active');
  diceEl.classList.add('hidden');
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;

  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
};

// ------  Dice rolling FN  ------

rollBtn.addEventListener('click', () => {
  console.log(activePlayer);
  const diceNumber = Math.trunc(Math.random() * 6) + 1;

  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${diceNumber}.png`;

  // Game role for dice eq to one
  if (diceNumber === 1) {
    // switch player
    switchPlayer();
  } else {
    // add diceNumber to current score of active player
    currentScore += diceNumber;

    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  }
});

// ------  hold score Btn FN  ------

holdBtn.addEventListener('click', () => {
  // add current score to active player main score
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];

  // check for possible winner
  if (scores[activePlayer] >= 30) {
    document.querySelector(`#name--${activePlayer}`).textContent = 'WINNER !';
    players[activePlayer].classList.add('player--winner');
    players[activePlayer].classList.remove('player--active');
    rollBtn.classList.add('hidden');
    holdBtn.classList.add('hidden');
    diceEl.classList.add('hidden');
  } else {
    // switch player
    switchPlayer();
  }
});

// ------  New Game Btn FN  ------

newBtn.addEventListener('click', () => {
  players[activePlayer].classList.remove('player--winner');
  document.querySelector(`#name--${activePlayer}`).textContent =
    `PLAYER ${activePlayer + 1}`;
  gamePresets();
});
