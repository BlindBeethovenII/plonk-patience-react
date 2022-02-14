// useful card functions

import shuffle from 'lodash.shuffle';

import {
  CARD_WIDTH,
  CARD_HEIGHT,
  SUITS,
  NUMBERS,
  DEAL_COL,
  DEAL_ROW,
} from './constants';

// calc left based on given column
export function col2Left(col) {
  return 21 + col * CARD_WIDTH;
}

// calc top based on given row
export function row2Top(row) {
  return 20 + row * CARD_HEIGHT;
}

// the simple algorithm to generate the player and opponent card id from the card's suit and number
export const generateCardId = (suit, number) => `card_${suit}_${number}`;

// helper function to create a suffled deck
export const createShuffledDeck = () => {
  // put all the cards in the deck, placing at the dealing position
  let deck = [];
  SUITS.map((suit) =>
    NUMBERS.map((number) =>
      deck.push({
        suit,
        number,
        left: col2Left(DEAL_COL),
        top: row2Top(DEAL_ROW),
        id: generateCardId(suit, number),
      })));

  // now shuffle them
  deck = shuffle(deck);

  return deck;
};
