// useful card functions

import {
  CARD_WIDTH,
  CARD_HEIGHT,
} from './constants';

// calc left based on given column
export function col2Left(col) {
  return 21 + col * CARD_WIDTH;
}

// calc top based on given row
export function row2Top(row) {
  return 20 + row * CARD_HEIGHT;
}
