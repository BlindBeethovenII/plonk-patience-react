export const CARD_WIDTH = 68;
export const CARD_HEIGHT = 86;

export const SUIT_SPADES = 'S';
export const SUIT_HEARTS = 'H';
export const SUIT_DIAMONDS = 'D';
export const SUIT_CLUBS = 'C';
export const SUITS = [SUIT_SPADES, SUIT_HEARTS, SUIT_DIAMONDS, SUIT_CLUBS];
export const SUIT_NONE = 'NONE';

export const NUMBER_A = 1;
export const NUMBER_2 = 2;
export const NUMBER_3 = 3;
export const NUMBER_4 = 4;
export const NUMBER_5 = 5;
export const NUMBER_6 = 6;
export const NUMBER_7 = 7;
export const NUMBER_8 = 8;
export const NUMBER_9 = 9;
export const NUMBER_10 = 10;
export const NUMBER_J = 11;
export const NUMBER_Q = 12;
export const NUMBER_K = 13;
export const NUMBERS = [
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
];
export const NUMBER_NONE = -1;

export const CARD_NONE = { suit: SUIT_NONE, number: NUMBER_NONE };

export const DEAL_COL = 0;
export const DEAL_ROW = 4;

export const PLAYAREA_X_OFFSET = 278;
export const ROW5_Y_OFFSET = 18;
export const UP_DOWN_GAP = CARD_WIDTH;

export const ACTION_DEAL_CARD = 'DEAL_CARD';
export const ACTION_MOVE_CARD = 'MOVE_CARD';
export const ACTION_MOVE_CARDS = 'MOVE_CARDS';
export const ACTION_REALIGN_RIGHT_SORT = 'REALIGN_RIGHT_SORT';
export const ACTION_REALIGN_LEFT_SORT = 'REALIGN_LEFT_SORT';

export const GAME_STATE_START = 'START';
export const GAME_STATE_DEALING = 'DEALING';
export const GAME_STATE_PLAYING = 'PLAYING';
export const GAME_STATE_ENDGAME = 'ENDGAME';
export const GAME_STATE_ANALYSING = 'ANALYSING';

export const FLASH_ICON_CROSS = 'CROSS';
export const FLASH_ICON_HAND = 'HAND';

export const PILE_ID_DEAL_PILE = 'DEAL_PILE';
export const PILE_ID_PLONK_PILE = 'PLONK_PILE';
export const PILE_ID_PLAY_PILE_1 = 'PLAY_PILE_1';
export const PILE_ID_PLAY_PILE_2 = 'PLAY_PILE_2';
export const PILE_ID_PLAY_PILE_3 = 'PLAY_PILE_3';
export const PILE_ID_PLAY_PILE_4 = 'PLAY_PILE_4';
export const PILE_ID_PLAY_PILE_5 = 'PLAY_PILE_5';
export const PILE_ID_PLAY_PILE_6 = 'PLAY_PILE_6';
export const PILE_ID_PLAY_PILE_7 = 'PLAY_PILE_7';
export const PILE_ID_PLAY_PILE_8 = 'PLAY_PILE_8';
export const PILE_ID_PLAY_PILE_9 = 'PLAY_PILE_9';
export const PILE_ID_PLAY_PILE_10 = 'PLAY_PILE_10';
export const PILE_ID_PLAY_PILE_11 = 'PLAY_PILE_11';
export const PILE_ID_PLAY_PILE_12 = 'PLAY_PILE_12';
export const PILE_ID_UP_PILE_S = 'UP_PILE_S';
export const PILE_ID_UP_PILE_H = 'UP_PILE_H';
export const PILE_ID_UP_PILE_D = 'UP_PILE_D';
export const PILE_ID_UP_PILE_C = 'UP_PILE_C';
export const PILE_ID_DOWN_PILE_S = 'DOWN_PILE_S';
export const PILE_ID_DOWN_PILE_H = 'DOWN_PILE_H';
export const PILE_ID_DOWN_PILE_D = 'DOWN_PILE_D';
export const PILE_ID_DOWN_PILE_C = 'DOWN_PILE_C';
export const PILE_ID_SORT_PILE_1 = 'SORT_PILE_1';
export const PILE_ID_SORT_PILE_2 = 'SORT_PILE_2';
export const PILE_ID_SORT_PILE_3 = 'SORT_PILE_3';
export const PILE_ID_SORT_PILE_4 = 'SORT_PILE_4';
export const PILE_ID_SORT_PILE_5 = 'SORT_PILE_5';
export const PILE_ID_SORT_PILE_6 = 'SORT_PILE_6';
export const PILE_ID_SORT_PILE_7 = 'SORT_PILE_7';
export const PILE_ID_SORT_PILE_8 = 'SORT_PILE_8';
export const PILE_ID_SORT_PILE_9 = 'SORT_PILE_9';
export const PILE_ID_SORT_PILE_10 = 'SORT_PILE_10';
export const PILE_ID_SORT_PILE_11 = 'SORT_PILE_11';
export const PILE_ID_SORT_PILE_12 = 'SORT_PILE_12';
export const PILE_ID_SORT_PILE_13 = 'SORT_PILE_13';

export const ANIMATION_SPEED_SLOW = 0;
export const ANIMATION_SPEED_REGULAR = 1;
export const ANIMATION_SPEED_FAST = 2;
export const ANIMATION_SPEED_INSTANT = 3;
