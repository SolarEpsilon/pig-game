'use strict';

// Selecting elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);

const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

// Create variables for later use
let scores, currentScore, activePlayer, playing;

// Function to create starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add(`hidden`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};
// Run init function once to create game:
init();

// Function that runs to switch player
const switchPlayer = function () {
  // Using a template literal, set the current score HTML element of the current player to 0. This visually resets the score:
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Also set currentScore to 0. This resets the score variable in our code:
  currentScore = 0;
  // Using a ternary operator, change player:
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Toggle CSS classes for both players, thus switching the classes and visually changing the player as well:
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

// "Roll dice" button function
btnRoll.addEventListener(`click`, function () {
  // When a player wins, we set "playing" to false. This checks if the game is over or not. If the game is NOT over, we allow dice rolling:
  if (playing) {
    // Generate random dice roll between 1 and 6:
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice roll:
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;

    // Check if dice rolled something other than 1. If so, add that to the player's score:
    if (dice !== 1) {
      // Add dice to current score:
      currentScore += dice;
      // Set active player current score to the dice rolled:
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // If dice rolled IS 1, then switch player. Our switchPlayer function also resets the score appropriately:
      switchPlayer();
    }
  }
});

// "Hold" button function
btnHold.addEventListener(`click`, function () {
  // Just like in btnRoll, this checks if the game is over or not. If the game is NOT over, we allow dice holding:
  if (playing) {
    // Add current score to the total score of the active player:
    scores[activePlayer] += currentScore;
    // Visually update current player's score:
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if current player's score is >= 100. If yes, end game:
    if (scores[activePlayer] >= 100) {
      playing = false;
      // Hide dice:
      diceEl.classList.add(`hidden`);
      // Add winner class to the active player:
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      // Remove active class from the active player:
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      // If active player does not have enough points to win, switch player:
    } else {
      switchPlayer();
    }
  }
});

// If "New Game" button is pressed, run "init" function
btnNew.addEventListener(`click`, init);
