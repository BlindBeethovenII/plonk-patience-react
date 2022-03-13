// useful card functions

import shuffle from 'lodash.shuffle';

import {
  CARD_WIDTH,
  CARD_HEIGHT,
  ROW5_Y_OFFSET,
  UP_DOWN_GAP,
  SUITS,
  NUMBERS,
  NUMBER_A,
  NUMBER_K,
  NUMBER_Q,
  NUMBER_J,
  SUIT_CLUBS,
  SUIT_DIAMONDS,
  SUIT_HEARTS,
  SUIT_SPADES,
} from './constants';

import CardSuitSpadesImage from '../images/cards/spades.png';
import CardSuitHeartsImage from '../images/cards/hearts.png';
import CardSuitDiamondsImage from '../images/cards/diamonds.png';
import CardSuitClubsImage from '../images/cards/clubs.png';

// calc left based on given column
export function colToLeft(col, row) {
  // adjust for UP_DOWN_GAPs
  let adjust = 0;
  const gap = UP_DOWN_GAP + 16;

  // only applies to rows 0 to 3
  if (row <= 3) {
    if (col <= 0) {
      adjust = -gap;
    } else if (col >= 4) {
      adjust = gap;
    }
  }

  return 21 + (col * CARD_WIDTH) + adjust;
}

// calc top based on given row - adjusting for row 5
export function rowToTop(row) {
  return 20 + (row * CARD_HEIGHT) + (row >= 5 ? ROW5_Y_OFFSET : 0);
}

export const cardNumberToString = (number) => {
  if (number === NUMBER_A) return 'A';
  if (number === NUMBER_K) return 'K';
  if (number === NUMBER_Q) return 'Q';
  if (number === NUMBER_J) return 'J';
  return number;
};

export const cardSuitToImage = (suit) => {
  if (suit === SUIT_CLUBS) return CardSuitClubsImage;
  if (suit === SUIT_DIAMONDS) return CardSuitDiamondsImage;
  if (suit === SUIT_HEARTS) return CardSuitHeartsImage;
  return CardSuitSpadesImage;
};

export const cardSuitToFillColour = (suit) => {
  if (suit === SUIT_CLUBS || SUIT_SPADES) return 'black';
  return 'red';
};

// the simple algorithm to generate the player and opponent card id from the card's suit and number
export const generateCardId = (deckN, suit, number) => `deck_${deckN}_card_${suit}_${number}`;

// helper function to create a suffled deck
export const createShuffledDeck = () => {
  // put all the cards in the deck, placing them at the deal pile col/row
  let deck = [];
  SUITS.map((suit) =>
    NUMBERS.map((number) =>
      deck.push({
        id: generateCardId(1, suit, number),
        suit,
        number,
        prevCol: 0,
        prevRow: 4,
      })));

  // in fact, we want two packs :-)
  SUITS.map((suit) =>
    NUMBERS.map((number) =>
      deck.push({
        id: generateCardId(2, suit, number),
        suit,
        number,
        prevCol: 0,
        prevRow: 4,
      })));

  // now shuffle them
  deck = shuffle(deck);

  return deck;
};
