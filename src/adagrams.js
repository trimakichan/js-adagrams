import { LETTER_POOL, SCORE_CHART } from './constants.js';

const HAND_SIZE = 10;
const BONUS_MIN_LENGTH = 7;
const LENGTH_BONUS_POINTS = 8;

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

const pickWinnerFromTies = ties => {
  let winner = ties[0];
  let winnerWordLength = ties[0].word.length;

  for (const wordObj of ties) {
    const currentWord = wordObj.word;
    const currentWordLength = currentWord.length;

    if (currentWordLength === HAND_SIZE) return wordObj;

    if (currentWordLength < winnerWordLength) {
      winner = wordObj;
    }
  }

  return { word: winner.word, score: winner.score };

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
  let score = 0;

  for (let letter of word) {
    letter = letter.toUpperCase();
    score += SCORE_CHART[letter] ?? 0;
  }


  if (word.length >= BONUS_MIN_LENGTH) {
    score += LENGTH_BONUS_POINTS;
  }

  return score;

};

export const highestScoreFrom = (words) => {

  let bestScore = 0;

  for (const word of words) {
    const score = scoreWord(word);
    if (score > bestScore) {
      bestScore = score;
    }
  };

  const ties = [];
  for (const word of words) {
    if (scoreWord(word) === bestScore) {
      ties.push({ word, score: bestScore });
    }
  }

  if (ties.length === 1) return { word: ties[0].word, score: bestScore };

  return pickWinnerFromTies(ties);
};