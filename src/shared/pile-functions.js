// useful pile functions

import {
  NUMBER_A,
  NUMBER_2,
  NUMBER_3,
  NUMBER_4,
  NUMBER_5,
  NUMBER_6,
  NUMBER_7,
  NUMBER_8,
  NUMBER_9,
  NUMBER_10,
  NUMBER_J,
  NUMBER_Q,
  NUMBER_K,
  SUIT_CLUBS,
  SUIT_DIAMONDS,
  SUIT_HEARTS,
  // SUIT_SPADES,
  PILE_ID_DEAL_PILE,
  PILE_ID_PLONK_PILE,
  PILE_ID_PLAY_PILE_1,
  PILE_ID_PLAY_PILE_2,
  PILE_ID_PLAY_PILE_3,
  PILE_ID_PLAY_PILE_4,
  PILE_ID_PLAY_PILE_5,
  PILE_ID_PLAY_PILE_6,
  PILE_ID_PLAY_PILE_7,
  PILE_ID_PLAY_PILE_8,
  PILE_ID_PLAY_PILE_9,
  PILE_ID_PLAY_PILE_10,
  PILE_ID_PLAY_PILE_11,
  PILE_ID_PLAY_PILE_12,
  PILE_ID_UP_PILE_S,
  PILE_ID_UP_PILE_H,
  PILE_ID_UP_PILE_D,
  PILE_ID_UP_PILE_C,
  PILE_ID_DOWN_PILE_S,
  PILE_ID_DOWN_PILE_H,
  PILE_ID_DOWN_PILE_D,
  PILE_ID_DOWN_PILE_C,
  PILE_ID_SORT_PILE_1,
  PILE_ID_SORT_PILE_2,
  PILE_ID_SORT_PILE_3,
  PILE_ID_SORT_PILE_4,
  PILE_ID_SORT_PILE_5,
  PILE_ID_SORT_PILE_6,
  PILE_ID_SORT_PILE_7,
  PILE_ID_SORT_PILE_8,
  PILE_ID_SORT_PILE_9,
  PILE_ID_SORT_PILE_10,
  PILE_ID_SORT_PILE_11,
} from './constants';

// does the given card number match the play pile id
export const numberMatchesDealPile = (n, pileId) => {
  if ((n === NUMBER_A || n === NUMBER_2) && pileId === PILE_ID_PLAY_PILE_1) {
    return true;
  }

  if (n === NUMBER_3 && pileId === PILE_ID_PLAY_PILE_2) {
    return true;
  }

  if (n === NUMBER_4 && pileId === PILE_ID_PLAY_PILE_3) {
    return true;
  }

  if (n === NUMBER_5 && pileId === PILE_ID_PLAY_PILE_4) {
    return true;
  }

  if (n === NUMBER_6 && pileId === PILE_ID_PLAY_PILE_5) {
    return true;
  }

  if (n === NUMBER_7 && pileId === PILE_ID_PLAY_PILE_6) {
    return true;
  }

  if (n === NUMBER_8 && pileId === PILE_ID_PLAY_PILE_7) {
    return true;
  }

  if (n === NUMBER_9 && pileId === PILE_ID_PLAY_PILE_8) {
    return true;
  }

  if (n === NUMBER_10 && pileId === PILE_ID_PLAY_PILE_9) {
    return true;
  }

  if (n === NUMBER_J && pileId === PILE_ID_PLAY_PILE_10) {
    return true;
  }

  if (n === NUMBER_Q && pileId === PILE_ID_PLAY_PILE_11) {
    return true;
  }

  if (n === NUMBER_K && pileId === PILE_ID_PLAY_PILE_12) {
    return true;
  }

  // doesn't match
  return false;
};

// return the up pile id for the given suit
export const suitToUpPileId = (suit) => {
  if (suit === SUIT_CLUBS) return PILE_ID_UP_PILE_C;
  if (suit === SUIT_DIAMONDS) return PILE_ID_UP_PILE_D;
  if (suit === SUIT_HEARTS) return PILE_ID_UP_PILE_H;
  return PILE_ID_UP_PILE_S;
};

// return the down pile id for the given suit
export const suitToDownPileId = (suit) => {
  if (suit === SUIT_CLUBS) return PILE_ID_DOWN_PILE_C;
  if (suit === SUIT_DIAMONDS) return PILE_ID_DOWN_PILE_D;
  if (suit === SUIT_HEARTS) return PILE_ID_DOWN_PILE_H;
  return PILE_ID_DOWN_PILE_S;
};

// return (col,row) for the given pile id
export const pileIdToColRow = (pileId) => {
  switch (pileId) {
    case PILE_ID_DEAL_PILE:
      return { col: 0, row: 4 };

    case PILE_ID_PLONK_PILE:
      return { col: 4, row: 4 };

    case PILE_ID_PLAY_PILE_1:
      return { col: 1, row: 0 };

    case PILE_ID_PLAY_PILE_2:
      return { col: 2, row: 0 };

    case PILE_ID_PLAY_PILE_3:
      return { col: 3, row: 0 };

    case PILE_ID_PLAY_PILE_4:
      return { col: 1, row: 1 };

    case PILE_ID_PLAY_PILE_5:
      return { col: 2, row: 1 };

    case PILE_ID_PLAY_PILE_6:
      return { col: 3, row: 1 };

    case PILE_ID_PLAY_PILE_7:
      return { col: 1, row: 2 };

    case PILE_ID_PLAY_PILE_8:
      return { col: 2, row: 2 };

    case PILE_ID_PLAY_PILE_9:
      return { col: 3, row: 2 };

    case PILE_ID_PLAY_PILE_10:
      return { col: 1, row: 3 };

    case PILE_ID_PLAY_PILE_11:
      return { col: 2, row: 3 };

    case PILE_ID_PLAY_PILE_12:
      return { col: 3, row: 3 };

    case PILE_ID_UP_PILE_S:
      return { col: 0, row: 0 };

    case PILE_ID_UP_PILE_H:
      return { col: 0, row: 1 };

    case PILE_ID_UP_PILE_D:
      return { col: 0, row: 2 };

    case PILE_ID_UP_PILE_C:
      return { col: 0, row: 3 };

    case PILE_ID_DOWN_PILE_S:
      return { col: 4, row: 0 };

    case PILE_ID_DOWN_PILE_H:
      return { col: 4, row: 1 };

    case PILE_ID_DOWN_PILE_D:
      return { col: 4, row: 2 };

    case PILE_ID_DOWN_PILE_C:
      return { col: 4, row: 3 };

    case PILE_ID_SORT_PILE_1:
      return { col: -3, row: 5 };

    case PILE_ID_SORT_PILE_2:
      return { col: -2, row: 5 };

    case PILE_ID_SORT_PILE_3:
      return { col: -1, row: 5 };

    case PILE_ID_SORT_PILE_4:
      return { col: 0, row: 5 };

    case PILE_ID_SORT_PILE_5:
      return { col: 1, row: 5 };

    case PILE_ID_SORT_PILE_6:
      return { col: 2, row: 5 };

    case PILE_ID_SORT_PILE_7:
      return { col: 3, row: 5 };

    case PILE_ID_SORT_PILE_8:
      return { col: 4, row: 5 };

    case PILE_ID_SORT_PILE_9:
      return { col: 5, row: 5 };

    case PILE_ID_SORT_PILE_10:
      return { col: 6, row: 5 };

    case PILE_ID_SORT_PILE_11:
      return { col: 7, row: 5 };

    default:
      return null;
  }
};
