import { LETTER_POOL, SCORE_CHART } from './constants.js';

const HAND_SIZE = 10;

// Helper functions
const generateLetterPool = letterCounts => {
  const letterPool = [];
  for (const [letter, count] of Object.entries(letterCounts)) {
    for (let i = 0; i < count; i++) {
      letterPool.push(letter);
    }
  }
  return letterPool;
};

const generateLetterMap = lettersInHand => {
  const letterMap = new Map();

  for (const letter of lettersInHand) {
    letterMap.set(letter, (letterMap.get(letter) ?? 0) + 1);
  }
  return letterMap;
};

export const drawLetters = () => {

  const letterPool = generateLetterPool(LETTER_POOL);

  const hand = [];
  let remainingLetters = letterPool.length;

  for (let i = 0; i < HAND_SIZE; i++) {
    const randomIndex = Math.floor(Math.random() * remainingLetters);
    hand.push(letterPool[randomIndex]);
    letterPool[randomIndex] = letterPool[remainingLetters - 1];
    letterPool.pop();
    remainingLetters--;
  };

  return hand;

};

export const usesAvailableLetters = (input, lettersInHand) => {

  const drawnMap = generateLetterMap(lettersInHand);

  for (let letter of input) {
    letter = letter.toUpperCase();
    if (!drawnMap.has(letter) || drawnMap.get(letter) === 0) {
      return false;
    }

    drawnMap.set(letter, drawnMap.get(letter) - 1);

  }
  return true;
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};



