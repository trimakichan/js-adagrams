import { LETTER_POOL, SCORE_CHART } from './constants.js';

const HAND_SIZE = 10;

export const drawLetters = () => {
  const allLetters = [];
  const hand = [];

  for (const [letter, count] of Object.entries(LETTER_POOL)) {
    for (let i = 0; i < count; i++) {
      allLetters.push(letter);
    }
  }

  for (let i = 0; i < HAND_SIZE; i++) {
    const randomIndex = Math.floor(Math.random() * allLetters.length);
    hand.push(allLetters[randomIndex]);
    allLetters[randomIndex] = allLetters[allLetters.length - 1];
    allLetters.pop();
  };

  return hand;

};

export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};

drawLetters();


