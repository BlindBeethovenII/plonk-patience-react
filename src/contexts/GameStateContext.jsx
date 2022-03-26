import React, { useState, useMemo, useCallback } from 'react';

import PropTypes from 'prop-types';

import useLocalStorage from 'use-local-storage';

import logIfDevEnv from '../shared/logIfDevEnv';
import { createShuffledDeck } from '../shared/card-functions';
import {
  numberMatchesDealPile,
  numberToPlayPileId,
  suitToUpPileId,
  suitToDownPileId,
  isSortPileId,
  isUpPileId,
  isDownPileId,
  isPlayPileId,
} from '../shared/pile-functions';
import {
  ACTION_DEAL_CARD,
  ACTION_MOVE_CARD,
  ACTION_MOVE_CARDS,
  ACTION_REALIGN_RIGHT_SORT,
  ACTION_REALIGN_LEFT_SORT,
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
  PILE_ID_SORT_PILE_12,
  PILE_ID_SORT_PILE_13,
  NUMBER_A,
  NUMBER_K,
  GAME_STATE_START,
  GAME_STATE_DEALING,
  GAME_STATE_PLAYING,
  GAME_STATE_ANALYSING,
  GAME_STATE_ENDGAME,
  FLASH_ICON_CROSS,
  FLASH_ICON_HAND,
} from '../shared/constants';

const GameStateContext = React.createContext({});

export const GameStateContextProvider = ({ children }) => {
  // the deal pile starts as a shuffled array of cards - two packs worth
  const [dealPile, setDealPile] = useState(createShuffledDeck());

  // the plonk pile starts empty
  const [plonkPile, setPlonkPile] = useState([]);

  // the play piles also start empty
  const [playPile1, setPlayPile1] = useState([]);
  const [playPile2, setPlayPile2] = useState([]);
  const [playPile3, setPlayPile3] = useState([]);
  const [playPile4, setPlayPile4] = useState([]);
  const [playPile5, setPlayPile5] = useState([]);
  const [playPile6, setPlayPile6] = useState([]);
  const [playPile7, setPlayPile7] = useState([]);
  const [playPile8, setPlayPile8] = useState([]);
  const [playPile9, setPlayPile9] = useState([]);
  const [playPile10, setPlayPile10] = useState([]);
  const [playPile11, setPlayPile11] = useState([]);
  const [playPile12, setPlayPile12] = useState([]);

  // the up and down piles also start empty
  const [upPileSpades, setUpPileSpades] = useState([]);
  const [upPileHearts, setUpPileHearts] = useState([]);
  const [upPileDiamonds, setUpPileDiamonds] = useState([]);
  const [upPileClubs, setUpPileClubs] = useState([]);
  const [downPileSpades, setDownPileSpades] = useState([]);
  const [downPileHearts, setDownPileHearts] = useState([]);
  const [downPileDiamonds, setDownPileDiamonds] = useState([]);
  const [downPileClubs, setDownPileClubs] = useState([]);

  // the sort piles also start empty
  const [sortPile1, setSortPile1] = useState([]);
  const [sortPile2, setSortPile2] = useState([]);
  const [sortPile3, setSortPile3] = useState([]);
  const [sortPile4, setSortPile4] = useState([]);
  const [sortPile5, setSortPile5] = useState([]);
  const [sortPile6, setSortPile6] = useState([]);
  const [sortPile7, setSortPile7] = useState([]);
  const [sortPile8, setSortPile8] = useState([]);
  const [sortPile9, setSortPile9] = useState([]);
  const [sortPile10, setSortPile10] = useState([]);
  const [sortPile11, setSortPile11] = useState([]);
  const [sortPile12, setSortPile12] = useState([]);
  const [sortPile13, setSortPile13] = useState([]);

  // the actions to be done when the current animation stops
  const [actions, setActions] = useState([]);

  // the cards that are currently moving - the array contains the toPileId
  // this is used to process each animation complete, until there are none left, and then we can perform the next action
  const [movingCards, setMovingCards] = useState([]);

  // the next pile to deal a card to
  const [nextDealPileId, setNextDealPileId] = useState(PILE_ID_PLONK_PILE);

  // the game state
  const [gameState, setGameState] = useState(GAME_STATE_START);

  // the animation speeds
  const [dealSpeedPercentage, setDealSpeedPercentage] = useLocalStorage('dealSpeedPercentage', 50);
  const [playSpeedPercentage, setPlaySpeedPercentage] = useLocalStorage('playSpeedPercentage', 50);

  // the piles to flash, naming icon to flash
  const [pileFlashes, setPileFlashes] = useState([]);

  // the selected pile
  const [selectedPileId, setSelectedPileId] = useState(null);

  // the checkboxes
  const [showCountLabels, setShowCountLabels] = useLocalStorage('showCountLabels', true);
  const [showSortedIcons, setShowSortedIcons] = useLocalStorage('showSortedIcons', true);
  const [fillEmptyPiles, setFillEmptyPiles] = useLocalStorage('fillEmptyPiles', true);

  // the sorted piles
  const [sortedPlayPileIds, setSortedPlayPileIds] = useState([]);

  // historical scores
  const [scoreHistory, _setScoreHistory] = useLocalStorage('scoreHistory', []);

  // show a win
  const [showWin, setShowWin] = useState(false);

  // show the redeal button
  const [showRedealButton, setShowRedealButton] = useState(false);

  // add the current score to the score history
  const setScoreHistory = useCallback(() => {
    // calc the current score
    const currentScore = upPileSpades.length
    + upPileHearts.length
    + upPileDiamonds.length
    + upPileClubs.length
    + downPileSpades.length
    + downPileHearts.length
    + downPileDiamonds.length
    + downPileClubs.length;

    // add it and remember it
    const newScoreHistory = [...scoreHistory, currentScore];
    _setScoreHistory(newScoreHistory);

    // and we are now in the analysing part of the game
    setGameState(GAME_STATE_ANALYSING);

    // was it a win
    if (currentScore === 104) {
      setShowWin(true);
    }

    // we now need to show the redeal button
    setShowRedealButton(true);
  }, [
    upPileSpades,
    upPileHearts,
    upPileDiamonds,
    upPileClubs,
    downPileSpades,
    downPileHearts,
    downPileDiamonds,
    downPileClubs,
    scoreHistory,
    _setScoreHistory,
  ]);

  // convert a pile constant to the actual pile, with its col/row info
  const getPileWithInfo = useCallback((pileId) => {
    switch (pileId) {
      case PILE_ID_DEAL_PILE:
        return { pile: dealPile, col: 0, row: 4 };

      case PILE_ID_PLONK_PILE:
        return { pile: plonkPile, col: 4, row: 4 };

      case PILE_ID_PLAY_PILE_1:
        return { pile: playPile1, col: 1, row: 0 };

      case PILE_ID_PLAY_PILE_2:
        return { pile: playPile2, col: 2, row: 0 };

      case PILE_ID_PLAY_PILE_3:
        return { pile: playPile3, col: 3, row: 0 };

      case PILE_ID_PLAY_PILE_4:
        return { pile: playPile4, col: 1, row: 1 };

      case PILE_ID_PLAY_PILE_5:
        return { pile: playPile5, col: 2, row: 1 };

      case PILE_ID_PLAY_PILE_6:
        return { pile: playPile6, col: 3, row: 1 };

      case PILE_ID_PLAY_PILE_7:
        return { pile: playPile7, col: 1, row: 2 };

      case PILE_ID_PLAY_PILE_8:
        return { pile: playPile8, col: 2, row: 2 };

      case PILE_ID_PLAY_PILE_9:
        return { pile: playPile9, col: 3, row: 2 };

      case PILE_ID_PLAY_PILE_10:
        return { pile: playPile10, col: 1, row: 3 };

      case PILE_ID_PLAY_PILE_11:
        return { pile: playPile11, col: 2, row: 3 };

      case PILE_ID_PLAY_PILE_12:
        return { pile: playPile12, col: 3, row: 3 };

      case PILE_ID_UP_PILE_S:
        return { pile: upPileSpades, col: 0, row: 0 };

      case PILE_ID_UP_PILE_H:
        return { pile: upPileHearts, col: 0, row: 1 };

      case PILE_ID_UP_PILE_D:
        return { pile: upPileDiamonds, col: 0, row: 2 };

      case PILE_ID_UP_PILE_C:
        return { pile: upPileClubs, col: 0, row: 3 };

      case PILE_ID_DOWN_PILE_S:
        return { pile: downPileSpades, col: 4, row: 0 };

      case PILE_ID_DOWN_PILE_H:
        return { pile: downPileHearts, col: 4, row: 1 };

      case PILE_ID_DOWN_PILE_D:
        return { pile: downPileDiamonds, col: 4, row: 2 };

      case PILE_ID_DOWN_PILE_C:
        return { pile: downPileClubs, col: 4, row: 3 };

      case PILE_ID_SORT_PILE_1:
        return { pile: sortPile1, col: -4, row: 5 };

      case PILE_ID_SORT_PILE_2:
        return { pile: sortPile2, col: -3, row: 5 };

      case PILE_ID_SORT_PILE_3:
        return { pile: sortPile3, col: -2, row: 5 };

      case PILE_ID_SORT_PILE_4:
        return { pile: sortPile4, col: -1, row: 5 };

      case PILE_ID_SORT_PILE_5:
        return { pile: sortPile5, col: 0, row: 5 };

      case PILE_ID_SORT_PILE_6:
        return { pile: sortPile6, col: 1, row: 5 };

      case PILE_ID_SORT_PILE_7:
        return { pile: sortPile7, col: 2, row: 5 };

      case PILE_ID_SORT_PILE_8:
        return { pile: sortPile8, col: 3, row: 5 };

      case PILE_ID_SORT_PILE_9:
        return { pile: sortPile9, col: 4, row: 5 };

      case PILE_ID_SORT_PILE_10:
        return { pile: sortPile10, col: 5, row: 5 };

      case PILE_ID_SORT_PILE_11:
        return { pile: sortPile11, col: 6, row: 5 };

      case PILE_ID_SORT_PILE_12:
        return { pile: sortPile12, col: 7, row: 5 };

      case PILE_ID_SORT_PILE_13:
        return { pile: sortPile13, col: 8, row: 5 };

      default:
        return null;
    }
  }, [
    dealPile,
    plonkPile,
    playPile1,
    playPile2,
    playPile3,
    playPile4,
    playPile5,
    playPile6,
    playPile7,
    playPile8,
    playPile9,
    playPile10,
    playPile11,
    playPile12,
    upPileSpades,
    upPileHearts,
    upPileDiamonds,
    upPileClubs,
    downPileSpades,
    downPileHearts,
    downPileDiamonds,
    downPileClubs,
    sortPile1,
    sortPile2,
    sortPile3,
    sortPile4,
    sortPile5,
    sortPile6,
    sortPile7,
    sortPile8,
    sortPile9,
    sortPile10,
    sortPile11,
    sortPile12,
    sortPile13,
  ]);

  // set the given pile
  const setPile = (pileId, pile) => {
    switch (pileId) {
      case PILE_ID_DEAL_PILE:
        setDealPile(pile);
        break;

      case PILE_ID_PLONK_PILE:
        setPlonkPile(pile);
        break;

      case PILE_ID_PLAY_PILE_1:
        setPlayPile1(pile);
        break;

      case PILE_ID_PLAY_PILE_2:
        setPlayPile2(pile);
        break;

      case PILE_ID_PLAY_PILE_3:
        setPlayPile3(pile);
        break;

      case PILE_ID_PLAY_PILE_4:
        setPlayPile4(pile);
        break;

      case PILE_ID_PLAY_PILE_5:
        setPlayPile5(pile);
        break;

      case PILE_ID_PLAY_PILE_6:
        setPlayPile6(pile);
        break;

      case PILE_ID_PLAY_PILE_7:
        setPlayPile7(pile);
        break;

      case PILE_ID_PLAY_PILE_8:
        setPlayPile8(pile);
        break;

      case PILE_ID_PLAY_PILE_9:
        setPlayPile9(pile);
        break;

      case PILE_ID_PLAY_PILE_10:
        setPlayPile10(pile);
        break;

      case PILE_ID_PLAY_PILE_11:
        setPlayPile11(pile);
        break;

      case PILE_ID_PLAY_PILE_12:
        setPlayPile12(pile);
        break;

      case PILE_ID_UP_PILE_S:
        setUpPileSpades(pile);
        break;

      case PILE_ID_UP_PILE_H:
        setUpPileHearts(pile);
        break;

      case PILE_ID_UP_PILE_D:
        setUpPileDiamonds(pile);
        break;

      case PILE_ID_UP_PILE_C:
        setUpPileClubs(pile);
        break;

      case PILE_ID_DOWN_PILE_S:
        setDownPileSpades(pile);
        break;

      case PILE_ID_DOWN_PILE_H:
        setDownPileHearts(pile);
        break;

      case PILE_ID_DOWN_PILE_D:
        setDownPileDiamonds(pile);
        break;

      case PILE_ID_DOWN_PILE_C:
        setDownPileClubs(pile);
        break;

      case PILE_ID_SORT_PILE_1:
        setSortPile1(pile);
        break;

      case PILE_ID_SORT_PILE_2:
        setSortPile2(pile);
        break;

      case PILE_ID_SORT_PILE_3:
        setSortPile3(pile);
        break;

      case PILE_ID_SORT_PILE_4:
        setSortPile4(pile);
        break;

      case PILE_ID_SORT_PILE_5:
        setSortPile5(pile);
        break;

      case PILE_ID_SORT_PILE_6:
        setSortPile6(pile);
        break;

      case PILE_ID_SORT_PILE_7:
        setSortPile7(pile);
        break;

      case PILE_ID_SORT_PILE_8:
        setSortPile8(pile);
        break;

      case PILE_ID_SORT_PILE_9:
        setSortPile9(pile);
        break;

      case PILE_ID_SORT_PILE_10:
        setSortPile10(pile);
        break;

      case PILE_ID_SORT_PILE_11:
        setSortPile11(pile);
        break;

      case PILE_ID_SORT_PILE_12:
        setSortPile12(pile);
        break;

      case PILE_ID_SORT_PILE_13:
        setSortPile13(pile);
        break;

      default:
        console.error(`setPile cannot cope with pileId ${pileId}`);
        break;
    }
  };

  // redeal the cards - resetting all the game state to the beginning of a new game
  const redealCards = () => {
    setDealPile(createShuffledDeck());
    setPlonkPile([]);
    setPlayPile1([]);
    setPlayPile2([]);
    setPlayPile3([]);
    setPlayPile4([]);
    setPlayPile5([]);
    setPlayPile6([]);
    setPlayPile7([]);
    setPlayPile8([]);
    setPlayPile9([]);
    setPlayPile10([]);
    setPlayPile11([]);
    setPlayPile12([]);
    setUpPileSpades([]);
    setUpPileHearts([]);
    setUpPileDiamonds([]);
    setUpPileClubs([]);
    setDownPileSpades([]);
    setDownPileHearts([]);
    setDownPileDiamonds([]);
    setDownPileClubs([]);
    setSortPile1([]);
    setSortPile2([]);
    setSortPile3([]);
    setSortPile4([]);
    setSortPile5([]);
    setSortPile6([]);
    setSortPile7([]);
    setSortPile8([]);
    setSortPile9([]);
    setSortPile10([]);
    setSortPile11([]);
    setSortPile12([]);
    setSortPile13([]);
    setActions([]);
    setMovingCards([]);
    setNextDealPileId(PILE_ID_PLONK_PILE);
    setGameState(GAME_STATE_START);
    setPileFlashes([]);
    setSelectedPileId(null);
    setSortedPlayPileIds([]);
    setShowWin(false);
    setShowRedealButton(false);
  };

  // helper function to find an empty play pile, if there is one - noting that this cannot be the selected pile (as its cards are being sorted)
  const findEmptyPlayPile = useCallback(() => {
    if (!playPile1.length && selectedPileId !== PILE_ID_PLAY_PILE_1) {
      return PILE_ID_PLAY_PILE_1;
    }
    if (!playPile2.length && selectedPileId !== PILE_ID_PLAY_PILE_2) {
      return PILE_ID_PLAY_PILE_2;
    }
    if (!playPile3.length && selectedPileId !== PILE_ID_PLAY_PILE_3) {
      return PILE_ID_PLAY_PILE_3;
    }
    if (!playPile4.length && selectedPileId !== PILE_ID_PLAY_PILE_4) {
      return PILE_ID_PLAY_PILE_4;
    }
    if (!playPile5.length && selectedPileId !== PILE_ID_PLAY_PILE_5) {
      return PILE_ID_PLAY_PILE_5;
    }
    if (!playPile6.length && selectedPileId !== PILE_ID_PLAY_PILE_6) {
      return PILE_ID_PLAY_PILE_6;
    }
    if (!playPile7.length && selectedPileId !== PILE_ID_PLAY_PILE_7) {
      return PILE_ID_PLAY_PILE_7;
    }
    if (!playPile8.length && selectedPileId !== PILE_ID_PLAY_PILE_8) {
      return PILE_ID_PLAY_PILE_8;
    }
    if (!playPile9.length && selectedPileId !== PILE_ID_PLAY_PILE_9) {
      return PILE_ID_PLAY_PILE_9;
    }
    if (!playPile10.length && selectedPileId !== PILE_ID_PLAY_PILE_10) {
      return PILE_ID_PLAY_PILE_10;
    }
    if (!playPile11.length && selectedPileId !== PILE_ID_PLAY_PILE_11) {
      return PILE_ID_PLAY_PILE_11;
    }
    if (!playPile12.length && selectedPileId !== PILE_ID_PLAY_PILE_12) {
      return PILE_ID_PLAY_PILE_12;
    }
    return null;
  }, [
    playPile1,
    playPile2,
    playPile3,
    playPile4,
    playPile5,
    playPile6,
    playPile7,
    playPile8,
    playPile9,
    playPile10,
    playPile11,
    playPile12,
    selectedPileId,
  ]);

  // move cards - the array is a list of {fromPileId, toPileId}
  const moveCards = useCallback((moves) => {
    // the list of moves can involve duplicate pileIds - we manage the new pile values in the following object
    const piles = {};

    // we need to keep track of the new moving cards toPileIds
    const newMovingCards = [];

    moves.forEach(({ fromPileId, toPileId }) => {
      // get the original info for the piles
      const { pile: fromPile, col, row } = getPileWithInfo(fromPileId);
      const { pile: toPile } = getPileWithInfo(toPileId);

      // create the new piles - taking one's we've already created if we've already processed this pile
      let newFromPile = [];
      if (piles[fromPileId]) {
        newFromPile = piles[fromPileId];
      } else {
        newFromPile = [...fromPile];
      }

      // this only makes sense if we have some cards in the from pile to move to the to pile
      if (!newFromPile?.length) {
        return;
      }

      let newToPile = [];
      if (piles[toPileId]) {
        newToPile = piles[toPileId];
      } else {
        newToPile = [...toPile];
      }

      // take the top card from the from pile
      const topCard = newFromPile.shift();

      // and put it on the to pile
      newToPile.unshift({ ...topCard, prevCol: col, prevRow: row });

      // remember the new piles
      piles[fromPileId] = newFromPile;
      piles[toPileId] = newToPile;

      // if we have just moved the last card from the plonk pile then we are now into the end game
      if (fromPileId === PILE_ID_PLONK_PILE && !newFromPile.length) {
        setGameState(GAME_STATE_ENDGAME);
      }

      // keep track of the new moving cards toPileIds
      if (!newMovingCards.includes(toPileId)) {
        newMovingCards.push(toPileId);
      }
    });

    // put all the new piles back in the game state
    Object.keys(piles).forEach((pileId) => {
      setPile(pileId, piles[pileId]);
    });

    // remember we are moving these card
    // note: cardAnimationComplete will have emptied out movingCards by now, and due to useState() behaviour, movingCards might not actually be empty - but this will reset it
    setMovingCards(newMovingCards);
  }, [getPileWithInfo]);

  // do the next action (if any)
  // this is called from useCallback functions in this GameStateContext and so, the set state functions will not have effected by this call
  // so we pass in the current/new values for those states and set them here - at the moment only actions with have been updated by this point
  const performNextAction = useCallback((theActions) => {
    // set the given pile
    const incrementNextDealPileId = () => {
      switch (nextDealPileId) {
        case PILE_ID_PLONK_PILE:
          setNextDealPileId(PILE_ID_PLAY_PILE_1);
          break;

        case PILE_ID_PLAY_PILE_1:
          setNextDealPileId(PILE_ID_PLAY_PILE_2);
          break;

        case PILE_ID_PLAY_PILE_2:
          setNextDealPileId(PILE_ID_PLAY_PILE_3);
          break;

        case PILE_ID_PLAY_PILE_3:
          setNextDealPileId(PILE_ID_PLAY_PILE_4);
          break;

        case PILE_ID_PLAY_PILE_4:
          setNextDealPileId(PILE_ID_PLAY_PILE_5);
          break;

        case PILE_ID_PLAY_PILE_5:
          setNextDealPileId(PILE_ID_PLAY_PILE_6);
          break;

        case PILE_ID_PLAY_PILE_6:
          setNextDealPileId(PILE_ID_PLAY_PILE_7);
          break;

        case PILE_ID_PLAY_PILE_7:
          setNextDealPileId(PILE_ID_PLAY_PILE_8);
          break;

        case PILE_ID_PLAY_PILE_8:
          setNextDealPileId(PILE_ID_PLAY_PILE_9);
          break;

        case PILE_ID_PLAY_PILE_9:
          setNextDealPileId(PILE_ID_PLAY_PILE_10);
          break;

        case PILE_ID_PLAY_PILE_10:
          setNextDealPileId(PILE_ID_PLAY_PILE_11);
          break;

        case PILE_ID_PLAY_PILE_11:
          setNextDealPileId(PILE_ID_PLAY_PILE_12);
          break;

        case PILE_ID_PLAY_PILE_12:
          setNextDealPileId(PILE_ID_PLONK_PILE);
          break;

        default:
          console.error(`incrementNextDealPileId: cannot cope with pileId ${nextDealPileId}`);
          break;
      }
    };

    // protect ourselves for when there are no actions left to perform
    if (!theActions?.length) {
      logIfDevEnv('performNextAction: there are no actions to perform');
      return;
    }

    // okay - we have at least one next action - so do it
    // take the top action
    let newActions = [...theActions];

    // we need to continue processing the actions until we have actually started to move a card
    let cardsMoving = false;

    while (!cardsMoving) {
      // below could result in empty newActions - so check here
      if (!newActions.length) {
        break;
      }

      // get and process the next action
      const nextAction = newActions.shift();
      logIfDevEnv(`performNextAction: processing nextAction ${JSON.stringify(nextAction)}`);
      const { action } = nextAction;
      if (action === ACTION_DEAL_CARD) {
        // this action is to deal the current top card from the deal pile to the nextDealPileId pile
        // if the top card of the deal pile matches the nextDealPileId, then it needs to be moved to the plonk pile, once it has been dealt to its pile
        // just protect ourselves
        if (dealPile.length > 0) {
          const { number } = dealPile[0];

          // we only increment the next deal pile id, if we actual dealt to the current
          let incNextDealPileId = true;

          if (numberMatchesDealPile(number, nextDealPileId)) {
            newActions.unshift({ action: ACTION_MOVE_CARD, fromPileId: nextDealPileId, toPileId: PILE_ID_PLONK_PILE });
            // in this case, we need to deal to the same pile again
            incNextDealPileId = false;
          }

          // need to put this at the top of the newActions
          newActions.unshift({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_DEAL_PILE, toPileId: nextDealPileId });

          // 'increment' the next deal pile id, if we need to
          if (incNextDealPileId) {
            incrementNextDealPileId();
          }
        }
      } else if (action === ACTION_MOVE_CARD) {
        // this action is to move the current top card from the named fromPileId to the named toPileId
        const { fromPileId, toPileId } = nextAction;
        moveCards([{ fromPileId, toPileId }]);

        // cards are now moving, so we wait for animation to be complete
        cardsMoving = true;
      } else if (action === ACTION_MOVE_CARDS) {
        // this action is to move a list of top card from the named fromPileIds to the named toPileIds
        const { moves } = nextAction;
        moveCards(moves);

        // cards are now moving, so we wait for animation to be complete
        cardsMoving = true;
      } else if (action === ACTION_REALIGN_RIGHT_SORT) {
        // a card has just moved out of the right of the sort piles, so we need to realign that
        // this algorithm assumes there is only one empty pile - which is the one named in the action
        // we convert this to a MOVE_CARDS action
        const moves = [];
        let { nowEmptySortPileId } = nextAction;
        while (nowEmptySortPileId) {
          // while we have an empty sort pile id to fill - fill if the next to the left has content
          let addedAction = false;
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_13 && sortPile12.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_12, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_12;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_12 && sortPile11.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_11, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_11;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_11 && sortPile10.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_10, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_10;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_10 && sortPile9.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_9, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_9;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_9 && sortPile8.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_8, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_8;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_8 && sortPile7.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_7, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_7;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_7 && sortPile6.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_6, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_6;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_6 && sortPile5.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_5, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_5;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_5 && sortPile4.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_4, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_4;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_4 && sortPile3.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_3, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_3;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_3 && sortPile2.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_2, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_2;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_2 && sortPile1.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_1, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = null; // need to stop here - at the end of the list
            addedAction = true;
          }
          // if didn't add an action from this time round, then stop the loop
          if (!addedAction) {
            nowEmptySortPileId = null; // need to stop here - at the end of the list
          }
        }
        // put this move cards action to the front of the news actions
        newActions = [{ action: ACTION_MOVE_CARDS, moves }, ...newActions];
        logIfDevEnv(`performNextAction: newActions new ${JSON.stringify(newActions)}`);
      } else if (action === ACTION_REALIGN_LEFT_SORT) {
        // a card has just moved out of the left of the sort piles, so we need to realign that
        // this algorithm assumes there is only one empty pile - which is the one named in the action
        // we convert this to a MOVE_CARDS actions
        const moves = [];
        let { nowEmptySortPileId } = nextAction;
        while (nowEmptySortPileId) {
          // while we have an empty sort pile id to fill - fill if the next to the left has content
          let addedAction = false;
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_1 && sortPile2.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_2, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_2;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_2 && sortPile3.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_3, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_3;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_3 && sortPile4.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_4, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_4;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_4 && sortPile5.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_5, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_5;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_5 && sortPile6.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_6, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_6;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_6 && sortPile7.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_7, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_7;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_7 && sortPile8.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_8, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_8;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_8 && sortPile9.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_9, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_9;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_9 && sortPile10.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_10, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_10;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_10 && sortPile11.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_11, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_11;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_11 && sortPile12.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_12, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_12;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_12 && sortPile13.length) {
            moves.push({ fromPileId: PILE_ID_SORT_PILE_13, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = null; // need to stop here - at the end of the list
            addedAction = true;
          }
          // if didn't add an action from this time round, then stop the loop
          if (!addedAction) {
            nowEmptySortPileId = null;
          }
        }
        // put this move cards actions to the front of the news actions
        newActions = [{ action: ACTION_MOVE_CARDS, moves }, ...newActions];
        logIfDevEnv(`performNextAction: newActions new ${JSON.stringify(newActions)}`);
      } else {
        console.error(`performNextAction unknown action ${action}`);
      }
    }

    // remember the new actions
    setActions(newActions);
  }, [
    dealPile,
    sortPile1,
    sortPile2,
    sortPile3,
    sortPile4,
    sortPile5,
    sortPile6,
    sortPile7,
    sortPile8,
    sortPile9,
    sortPile10,
    sortPile11,
    sortPile12,
    sortPile13,
    nextDealPileId,
    moveCards,
  ]);

  // the animation has completed for a card, which has now moved to the named pileId
  // we remove this pileId from the movingCards and if that is empty we can then perform the next action (if there is one)
  const cardAnimationComplete = useCallback((pileId) => {
    // if there are no cards currently moving then nothing to do
    if (!movingCards.length) {
      console.error(`cardAnimationComplete pileId ${pileId}: no cards are currently moving`);
      return;
    }

    // check we are expecting this pileId
    if (!movingCards.includes(pileId)) {
      console.error(`cardAnimationComplete pileId ${pileId} not in movingCards ${JSON.stringify(movingCards)}`);
      return;
    }

    // current MOVE_CARD action is complete
    logIfDevEnv(`cardAnimationComplete: animation complete for pileId ${pileId}`);

    // remove this pile from the moving cards
    const newMovingCards = movingCards.filter((toPileId) => pileId !== toPileId);
    setMovingCards(newMovingCards);
    // note: performNextAction doesn't care about contents of movingCards - and will overwrite if it recreats - so we don't have to pass this new movingCards to it

    // the top card of this pile is now considered at this col/row
    // so we need to update the prevCol/prevRow of the top card in this pile
    // danger: going to update in situ - is okay - as that card is already at that position anyway
    // get the pile
    const { pile, col, row } = getPileWithInfo(pileId);

    // there should be at least one card in this pile by here - but checking anyway
    if (!pile?.length) {
      console.error(`cardAnimationComplete: ${pileId} is empty but it should have at least one card in it`);
      return;
    }

    const topCard = pile[0];
    topCard.prevCol = col;
    topCard.prevRow = row;

    // if we have just completed the animation to the plonk pile while we are dealing and the deal pile is empty then we are now playing the game
    if (pileId === PILE_ID_PLONK_PILE && !dealPile.length && gameState === GAME_STATE_DEALING) {
      setGameState(GAME_STATE_PLAYING);
    }

    // perform the next action, if all cards have been moved
    if (!newMovingCards.length) {
      performNextAction(actions);
    }
  }, [
    actions,
    dealPile,
    gameState,
    movingCards,
    getPileWithInfo,
    performNextAction,
  ]);

  // the pile flash animation has completed for the given pileId
  const pileFlashAnimationComplete = useCallback((completedPileId) => {
    // remove this one from the piles that are flashing
    const newPileFlashes = pileFlashes.filter(({ pileId }) => pileId !== completedPileId);
    setPileFlashes(newPileFlashes);
  }, [pileFlashes]);

  // deal the cards
  const dealCards = useCallback(() => {
    // this only makes sense if we have cards to deal
    if (!dealPile?.length) {
      return;
    }

    // we are at the start of the game - so don't care about any current actions (there will be none)
    const newActions = [];

    // add in a DEAL_CARD action for every card in the deal pile, except the last one
    const nCards = dealPile.length;
    for (let i = 0; i < nCards - 1; i += 1) {
      newActions.push({ action: ACTION_DEAL_CARD });
    }
    // the last deal card always goes to the plonk pile
    newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_DEAL_PILE, toPileId: PILE_ID_PLONK_PILE });

    // we are now dealing
    setGameState(GAME_STATE_DEALING);

    // perform the next action (i.e. first of these actions)
    // we know here there there is no current action in place, as we've just started to deal the cards - so these are the first actions
    performNextAction(newActions);
  }, [
    dealPile,
    performNextAction,
  ]);

  // click on a card
  const clickOnCard = useCallback((clickPileId) => {
    logIfDevEnv(`clickOnCard: called for pile ${clickPileId}`);

    // not allowed to click if we still have actions to process
    if (actions?.length) {
      const newPileFlashes = [...pileFlashes];
      newPileFlashes.push({ pileId: clickPileId, icon: FLASH_ICON_HAND });
      setPileFlashes(newPileFlashes);
      return;
    }

    // helper function to return true if the given pile id is in the occupied right sort piles
    const pileIdInRightSortPiles = (pileId) => {
      if (pileId === PILE_ID_SORT_PILE_13 && sortPile13.length) {
        return true;
      }

      if (pileId === PILE_ID_SORT_PILE_12 && sortPile12.length && sortPile13.length) {
        return true;
      }

      if (pileId === PILE_ID_SORT_PILE_11 && sortPile11.length && sortPile12.length && sortPile13.length) {
        return true;
      }

      if (pileId === PILE_ID_SORT_PILE_10 && sortPile10.length && sortPile11.length && sortPile12.length && sortPile13.length) {
        return true;
      }

      if (pileId === PILE_ID_SORT_PILE_9 && sortPile9.length && sortPile10.length && sortPile11.length && sortPile12.length && sortPile13.length) {
        return true;
      }

      if (pileId === PILE_ID_SORT_PILE_8 && sortPile8.length && sortPile9.length && sortPile10.length && sortPile11.length && sortPile12.length && sortPile13.length) {
        return true;
      }

      if (pileId === PILE_ID_SORT_PILE_7
        && sortPile7.length
        && sortPile8.length
        && sortPile9.length
        && sortPile10.length
        && sortPile11.length
        && sortPile12.length
        && sortPile13.length) {
        return true;
      }

      if (pileId === PILE_ID_SORT_PILE_6
        && sortPile6.length
        && sortPile7.length
        && sortPile8.length
        && sortPile9.length
        && sortPile10.length
        && sortPile11.length
        && sortPile12.length
        && sortPile13.length) {
        return true;
      }

      if (pileId === PILE_ID_SORT_PILE_5
        && sortPile5.length
        && sortPile6.length
        && sortPile7.length
        && sortPile8.length
        && sortPile9.length
        && sortPile10.length
        && sortPile11.length
        && sortPile12.length
        && sortPile13.length) {
        return true;
      }

      if (pileId === PILE_ID_SORT_PILE_4
        && sortPile4.length
        && sortPile5.length
        && sortPile6.length
        && sortPile7.length
        && sortPile8.length
        && sortPile9.length
        && sortPile10.length
        && sortPile11.length
        && sortPile12.length
        && sortPile13.length) {
        return true;
      }

      if (pileId === PILE_ID_SORT_PILE_3
        && sortPile3.length
        && sortPile4.length
        && sortPile5.length
        && sortPile6.length
        && sortPile7.length
        && sortPile8.length
        && sortPile9.length
        && sortPile10.length
        && sortPile11.length
        && sortPile12.length
        && sortPile13.length) {
        return true;
      }

      if (pileId === PILE_ID_SORT_PILE_2
        && sortPile2.length
        && sortPile3.length
        && sortPile4.length
        && sortPile5.length
        && sortPile6.length
        && sortPile7.length
        && sortPile8.length
        && sortPile9.length
        && sortPile10.length
        && sortPile11.length
        && sortPile12.length
        && sortPile13.length) {
        return true;
      }

      if (pileId === PILE_ID_SORT_PILE_1
        && sortPile1.length
        && sortPile2.length
        && sortPile3.length
        && sortPile4.length
        && sortPile5.length
        && sortPile6.length
        && sortPile7.length
        && sortPile8.length
        && sortPile9.length
        && sortPile10.length
        && sortPile11.length
        && sortPile12.length
        && sortPile13.length) {
        return true;
      }

      // nope, not in right sort piles
      return false;
    };

    // process the pile clicked on

    if (clickPileId === PILE_ID_DEAL_PILE) {
      // click on the deal pile, deals
      dealCards();
      return;
    }

    if (clickPileId === PILE_ID_PLONK_PILE || (gameState === GAME_STATE_ANALYSING && isPlayPileId(clickPileId))) {
      // the click was on the plonk pile (which must be normal game play) or on a play pile while analysing

      // the actions for this click
      const newActions = [];

      // if there is a selected pile then put it back here
      if (selectedPileId) {
        if (sortPile1.length) {
          newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_1, toPileId: selectedPileId });
        }
        if (sortPile2.length) {
          newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_2, toPileId: selectedPileId });
        }
        if (sortPile3.length) {
          newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_3, toPileId: selectedPileId });
        }
        if (sortPile4.length) {
          newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_4, toPileId: selectedPileId });
        }
        if (sortPile5.length) {
          newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_5, toPileId: selectedPileId });
        }
        if (sortPile6.length) {
          newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_6, toPileId: selectedPileId });
        }
        if (sortPile7.length) {
          newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_7, toPileId: selectedPileId });
        }
        if (sortPile8.length) {
          newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_8, toPileId: selectedPileId });
        }
        if (sortPile9.length) {
          newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_9, toPileId: selectedPileId });
        }
        if (sortPile10.length) {
          newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_10, toPileId: selectedPileId });
        }
        if (sortPile11.length) {
          newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_11, toPileId: selectedPileId });
        }
        if (sortPile12.length) {
          newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_12, toPileId: selectedPileId });
        }
        if (sortPile13.length) {
          newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_13, toPileId: selectedPileId });
        }

        // and this selected pile is now consider sorted, if we've not already marked it as sorted, and unless we are analysing
        if (gameState !== GAME_STATE_ANALYSING && !sortedPlayPileIds.includes(selectedPileId)) {
          const newSortedPlayPileIds = [...sortedPlayPileIds];
          newSortedPlayPileIds.push(selectedPileId);
          setSortedPlayPileIds(newSortedPlayPileIds);
        }
      }

      // we need to find the play pile id, either that matches the top card or the plonk pile - or, when analysing, is actually the pile clicked on
      let playPileId = clickPileId;
      if (clickPileId === PILE_ID_PLONK_PILE) {
        // get the top card from the plonk pile, and convert to play pile id
        const { number: plonkPileNumber } = plonkPile[0];
        playPileId = numberToPlayPileId(plonkPileNumber);
        logIfDevEnv(`clickOnCard: clicked on ${plonkPileNumber} on plonk pile so selected pile is ${playPileId}`);
      }

      // need to know if this is the same as the currently selected pile (won't be during analysis as cannot click on the empty play pile that is flashing)
      const isSameSelectedPile = (playPileId === selectedPileId);
      setSelectedPileId(playPileId);

      let nextSortPileId = PILE_ID_SORT_PILE_13;
      if (clickPileId === PILE_ID_PLONK_PILE) {
        // move the top plonk card and all the selected pile's cards to the sort piles
        newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_PLONK_PILE, toPileId: PILE_ID_SORT_PILE_13 });
        nextSortPileId = PILE_ID_SORT_PILE_12;
      }

      // move to next sort pile (we move from right to left)
      const moveToNextSortPileId = () => {
        switch (nextSortPileId) {
          case PILE_ID_SORT_PILE_13:
            nextSortPileId = PILE_ID_SORT_PILE_12;
            break;

          case PILE_ID_SORT_PILE_12:
            nextSortPileId = PILE_ID_SORT_PILE_11;
            break;

          case PILE_ID_SORT_PILE_11:
            nextSortPileId = PILE_ID_SORT_PILE_10;
            break;

          case PILE_ID_SORT_PILE_10:
            nextSortPileId = PILE_ID_SORT_PILE_9;
            break;

          case PILE_ID_SORT_PILE_9:
            nextSortPileId = PILE_ID_SORT_PILE_8;
            break;

          case PILE_ID_SORT_PILE_8:
            nextSortPileId = PILE_ID_SORT_PILE_7;
            break;

          case PILE_ID_SORT_PILE_7:
            nextSortPileId = PILE_ID_SORT_PILE_6;
            break;

          case PILE_ID_SORT_PILE_6:
            nextSortPileId = PILE_ID_SORT_PILE_5;
            break;

          case PILE_ID_SORT_PILE_5:
            nextSortPileId = PILE_ID_SORT_PILE_4;
            break;

          case PILE_ID_SORT_PILE_4:
            nextSortPileId = PILE_ID_SORT_PILE_3;
            break;

          case PILE_ID_SORT_PILE_3:
            nextSortPileId = PILE_ID_SORT_PILE_2;
            break;

          case PILE_ID_SORT_PILE_2:
            nextSortPileId = PILE_ID_SORT_PILE_1;
            break;

          default:
            console.error(`moveToNextSortPileId: cannot cope with ${nextSortPileId}`);
            break;
        }
      };

      const { pile: playPile } = getPileWithInfo(playPileId);

      // if the newly selected pile is the same as the previously selected pile then that pile will actually be empty
      // so in that case the number of cards to move is the length of newActions - 1 (for the above action to move the plonk card, we've just created)
      let nMoveActionsNeeded = 0;
      if (isSameSelectedPile) {
        nMoveActionsNeeded = newActions.length - 1;
      } else {
        nMoveActionsNeeded = playPile.length;
      }

      // now add that many moves
      for (let n = 0; n < nMoveActionsNeeded; n += 1) {
        newActions.push({ action: ACTION_MOVE_CARD, fromPileId: playPileId, toPileId: nextSortPileId });
        moveToNextSortPileId();
      }

      // perform the actions we've just set up - along with any we are still to do
      performNextAction([...actions, ...newActions]);
      return;
    }

    if (isUpPileId(clickPileId)) {
      if (gameState === GAME_STATE_ANALYSING) {
        // nope - not allowed now
        logIfDevEnv(`clickOnCard: not allowed to click on up pile ${clickPileId} while analysing`);
        const newPileFlashes = [...pileFlashes];
        newPileFlashes.push({ pileId: clickPileId, icon: FLASH_ICON_CROSS });
        setPileFlashes(newPileFlashes);
        return;
      }

      // get that pile
      const { pile: upPile } = getPileWithInfo(clickPileId);

      // there should be at least one card in this pile by here - but checking anyway
      if (!upPile?.length) {
        console.error(`clickOnCard: ${clickPileId} is empty but it should have at least one card in it`);
        return;
      }

      // get the top card from the clicked up pile
      const { suit: upPileSuit, number: upPileNumber } = upPile[0];

      // get the corresponding down pile
      const downPileId = suitToDownPileId(upPileSuit);

      // get that down pile
      const { pile: downPile } = getPileWithInfo(downPileId);

      // remember our decision to move this card to the down pile
      let cardIsForDownPile = false;

      // the down pile might be empty, if so, we want to move the King
      if (!downPile.length && upPileNumber === NUMBER_K) {
        cardIsForDownPile = true;
      }

      // if the down pile is not empty, then we can move the next card down
      if (downPile.length) {
        // get the top card from the down pile
        const { number: downPileNumber } = downPile[0];

        if (upPileNumber === downPileNumber - 1) {
          cardIsForDownPile = true;
        }
      }

      if (cardIsForDownPile) {
        // yes, move this card onto the up pile
        const newActions = [...actions];
        newActions.unshift({ action: ACTION_MOVE_CARD, fromPileId: clickPileId, toPileId: downPileId });
        performNextAction(newActions);
      } else {
        // cannot move the card clicked on - so flash it, for user feedback for the click
        const newPileFlashes = [...pileFlashes];
        newPileFlashes.push({ pileId: clickPileId, icon: FLASH_ICON_CROSS });
        setPileFlashes(newPileFlashes);
      }

      return;
    }

    if (isDownPileId(clickPileId)) {
      if (gameState === GAME_STATE_ANALYSING) {
        // nope - not allowed now
        logIfDevEnv(`clickOnCard: not allowed to click on down pile ${clickPileId} while analysing`);
        const newPileFlashes = [...pileFlashes];
        newPileFlashes.push({ pileId: clickPileId, icon: FLASH_ICON_CROSS });
        setPileFlashes(newPileFlashes);
        return;
      }

      // get that pile
      const { pile: downPile } = getPileWithInfo(clickPileId);

      // there should be at least one card in this pile by here - but checking anyway
      if (!downPile?.length) {
        console.error(`clickOnCard: ${clickPileId} is empty but it should have at least one card in it`);
        return;
      }

      // get the top card from the clicked down pile
      const { suit: downPileSuit, number: downPileNumber } = downPile[0];

      // get the corresponding up pile
      const upPileId = suitToUpPileId(downPileSuit);

      // get that up pile
      const { pile: upPile } = getPileWithInfo(upPileId);

      // remember our decision to move this card to the updown pile
      let cardIsForUpPile = false;

      // the up pile might be empty, if so, we want to move the Ace
      if (!upPile.length && downPileNumber === NUMBER_A) {
        cardIsForUpPile = true;
      }

      // if the up pile is not empty, then we can move the next card up
      if (upPile.length) {
        // get the top card from the up pile
        const { number: upPileNumber } = upPile[0];

        if (downPileNumber === upPileNumber + 1) {
          cardIsForUpPile = true;
        }
      }

      if (cardIsForUpPile) {
        // yes, move this card onto the up pile
        const newActions = [...actions];
        newActions.unshift({ action: ACTION_MOVE_CARD, fromPileId: clickPileId, toPileId: upPileId });
        performNextAction(newActions);
      } else {
        // cannot move the card clicked on - so flash it, for user feedback for the click
        const newPileFlashes = [...pileFlashes];
        newPileFlashes.push({ pileId: clickPileId, icon: FLASH_ICON_CROSS });
        setPileFlashes(newPileFlashes);
      }

      return;
    }

    if (gameState === GAME_STATE_ANALYSING) {
      // in this if, the click was not the plonk pile, nor play pile, nor up or down pile, so it must be a sort pile now
      logIfDevEnv(`clickOnCard: not allowed to click on sort pile ${clickPileId} while analysing`);
      const newPileFlashes = [...pileFlashes];
      newPileFlashes.push({ pileId: clickPileId, icon: FLASH_ICON_CROSS });
      setPileFlashes(newPileFlashes);
      return;
    }

    // we must be on a play pile or a sort pile by this point
    const { pile: clickPile } = getPileWithInfo(clickPileId);

    // there should be at least one card in this pile by here - but checking anyway
    if (!clickPile?.length) {
      console.error(`clickOnCard: ${clickPileId} is empty but it should have at least one card in it`);
      return;
    }

    // get the top card from the click pile
    const { suit: clickPileSuit, number: clickPileNumber } = clickPile[0];

    logIfDevEnv(`clickOnCard: clicked on ${clickPileNumber} ${clickPileSuit}`);

    // first check the build up pile for this suit
    const upPileId = suitToUpPileId(clickPileSuit);

    // get that up pile
    const { pile: upPile } = getPileWithInfo(upPileId);

    // remember our decision to move this card to the up pile
    let cardIsForUpPile = false;

    // the up pile might be empty, if so, we want to move the Ace
    if (!upPile.length && clickPileNumber === NUMBER_A) {
      cardIsForUpPile = true;
    }

    // if the up pile is not empty, then we can move the next card up
    if (upPile.length) {
      // get the top card from the up pile
      const { number: upPileNumber } = upPile[0];

      if (clickPileNumber === upPileNumber + 1) {
        cardIsForUpPile = true;
      }
    }

    if (cardIsForUpPile) {
      // yes, move this card onto the up pile
      const newActions = [...actions];
      // and realign sort pile if this was from a sort pile
      if (isSortPileId(clickPileId)) {
        // this could be a realign on the left or the right - need to decide which
        if (pileIdInRightSortPiles(clickPileId)) {
          // this is from the right sort piles
          newActions.unshift({ action: ACTION_REALIGN_RIGHT_SORT, nowEmptySortPileId: clickPileId });
        } else {
          // this is from the left sort piles
          newActions.unshift({ action: ACTION_REALIGN_LEFT_SORT, nowEmptySortPileId: clickPileId });
        }
      }
      newActions.unshift({ action: ACTION_MOVE_CARD, fromPileId: clickPileId, toPileId: upPileId });
      performNextAction(newActions);
      return;
    }

    // now do the same for the down pile for this suit
    const downPileId = suitToDownPileId(clickPileSuit);

    // get that down pile
    const { pile: downPile } = getPileWithInfo(downPileId);

    // remember our decision to move this card to the down pile
    let cardIsForDownPile = false;

    // the down pile might be empty, if so, we want to move the King
    if (!downPile.length && clickPileNumber === NUMBER_K) {
      cardIsForDownPile = true;
    }

    // if the down pile is not empty, then we can move the next card down
    if (downPile.length) {
      // get the top card from the down pile
      const { number: downPileNumber } = downPile[0];

      if (clickPileNumber === downPileNumber - 1) {
        cardIsForDownPile = true;
      }
    }

    if (cardIsForDownPile) {
      // yes, move this card onto the up pile
      const newActions = [...actions];
      // and realign sort pile if this was from a sort pile
      if (isSortPileId(clickPileId)) {
        // this could be a realign on the left or the right - need to decide which
        if (pileIdInRightSortPiles(clickPileId)) {
          // this is from the right sort piles
          newActions.unshift({ action: ACTION_REALIGN_RIGHT_SORT, nowEmptySortPileId: clickPileId });
        } else {
          // this is from the left sort piles
          newActions.unshift({ action: ACTION_REALIGN_LEFT_SORT, nowEmptySortPileId: clickPileId });
        }
      }
      newActions.unshift({ action: ACTION_MOVE_CARD, fromPileId: clickPileId, toPileId: downPileId });
      performNextAction(newActions);
      return;
    }

    // if click is for a sort pile, and it wasn't for a build up or a build down pile, then we are sorting
    if (isSortPileId(clickPileId)) {
      if (pileIdInRightSortPiles(clickPileId)) {
        // move to the first empty sort pile from the left (remember we always realign after any moves - so there should be no gaps on the left also)
        let leftEmptySortPileId = null;
        if (!sortPile1.length) {
          leftEmptySortPileId = PILE_ID_SORT_PILE_1;
        } else if (!sortPile2.length) {
          leftEmptySortPileId = PILE_ID_SORT_PILE_2;
        } else if (!sortPile3.length) {
          leftEmptySortPileId = PILE_ID_SORT_PILE_3;
        } else if (!sortPile4.length) {
          leftEmptySortPileId = PILE_ID_SORT_PILE_4;
        } else if (!sortPile5.length) {
          leftEmptySortPileId = PILE_ID_SORT_PILE_5;
        } else if (!sortPile6.length) {
          leftEmptySortPileId = PILE_ID_SORT_PILE_6;
        } else if (!sortPile7.length) {
          leftEmptySortPileId = PILE_ID_SORT_PILE_7;
        } else if (!sortPile8.length) {
          leftEmptySortPileId = PILE_ID_SORT_PILE_8;
        } else if (!sortPile9.length) {
          leftEmptySortPileId = PILE_ID_SORT_PILE_9;
        } else if (!sortPile10.length) {
          leftEmptySortPileId = PILE_ID_SORT_PILE_10;
        } else if (!sortPile11.length) {
          leftEmptySortPileId = PILE_ID_SORT_PILE_11;
        } else if (!sortPile12.length) {
          leftEmptySortPileId = PILE_ID_SORT_PILE_12;
        }

        if (leftEmptySortPileId) {
          // yes, move this card to that sort pile, and fill the gap
          const newActions = [...actions];
          newActions.unshift({ action: ACTION_REALIGN_RIGHT_SORT, nowEmptySortPileId: clickPileId });
          newActions.unshift({ action: ACTION_MOVE_CARD, fromPileId: clickPileId, toPileId: leftEmptySortPileId });
          performNextAction(newActions);
          return;
        }
      } else {
        // move to the first empty sort pile from the right (remember we always realign after any moves - so there should be no gaps on the right)
        let rightEmptySortPileId = null;
        if (!sortPile13.length) {
          rightEmptySortPileId = PILE_ID_SORT_PILE_13;
        } else if (!sortPile12.length) {
          rightEmptySortPileId = PILE_ID_SORT_PILE_12;
        } else if (!sortPile11.length) {
          rightEmptySortPileId = PILE_ID_SORT_PILE_11;
        } else if (!sortPile10.length) {
          rightEmptySortPileId = PILE_ID_SORT_PILE_10;
        } else if (!sortPile9.length) {
          rightEmptySortPileId = PILE_ID_SORT_PILE_9;
        } else if (!sortPile8.length) {
          rightEmptySortPileId = PILE_ID_SORT_PILE_8;
        } else if (!sortPile7.length) {
          rightEmptySortPileId = PILE_ID_SORT_PILE_7;
        } else if (!sortPile6.length) {
          rightEmptySortPileId = PILE_ID_SORT_PILE_6;
        } else if (!sortPile5.length) {
          rightEmptySortPileId = PILE_ID_SORT_PILE_5;
        } else if (!sortPile4.length) {
          rightEmptySortPileId = PILE_ID_SORT_PILE_4;
        } else if (!sortPile3.length) {
          rightEmptySortPileId = PILE_ID_SORT_PILE_3;
        } else if (!sortPile2.length) {
          rightEmptySortPileId = PILE_ID_SORT_PILE_2;
        }

        if (rightEmptySortPileId) {
          // yes, move this card to that sort pile, and fill the gap
          const newActions = [...actions];
          newActions.unshift({ action: ACTION_REALIGN_LEFT_SORT, nowEmptySortPileId: clickPileId });
          newActions.unshift({ action: ACTION_MOVE_CARD, fromPileId: clickPileId, toPileId: rightEmptySortPileId });
          performNextAction(newActions);
          return;
        }
      }
    }

    // here is must be a play pile, and the game state must be PLAYING
    if (fillEmptyPiles) {
      // see if we have an empty pile available
      const emptyPileId = findEmptyPlayPile();

      if (emptyPileId) {
        // found an empty pile, so move this card to that pile
        const newActions = [...actions];
        newActions.unshift({ action: ACTION_MOVE_CARD, fromPileId: clickPileId, toPileId: emptyPileId });
        performNextAction(newActions);
        return;
      }
    }

    // cannot move the card clicked on - so flash it, for user feedback for the click
    logIfDevEnv(`clickOnCard: flashing pile ${clickPileId}`);
    const newPileFlashes = [...pileFlashes];
    newPileFlashes.push({ pileId: clickPileId, icon: FLASH_ICON_CROSS });
    setPileFlashes(newPileFlashes);
  }, [
    actions,
    pileFlashes,
    gameState,
    selectedPileId,
    plonkPile,
    sortPile1,
    sortPile2,
    sortPile3,
    sortPile4,
    sortPile5,
    sortPile6,
    sortPile7,
    sortPile8,
    sortPile9,
    sortPile10,
    sortPile11,
    sortPile12,
    sortPile13,
    sortedPlayPileIds,
    fillEmptyPiles,
    findEmptyPlayPile,
    getPileWithInfo,
    dealCards,
    performNextAction,
  ]);

  // returns true if given pile id is a sorted play pile
  const isSortedPlayPile = useCallback((pileId) => sortedPlayPileIds.includes(pileId), [sortedPlayPileIds]);

  // expose our state and state functions via the context
  // we are encouraged to do this via a useMemo now
  const context = useMemo(() => ({
    // the piles
    dealPile,
    plonkPile,
    playPile1,
    playPile2,
    playPile3,
    playPile4,
    playPile5,
    playPile6,
    playPile7,
    playPile8,
    playPile9,
    playPile10,
    playPile11,
    playPile12,
    upPileSpades,
    upPileHearts,
    upPileDiamonds,
    upPileClubs,
    downPileSpades,
    downPileHearts,
    downPileDiamonds,
    downPileClubs,
    sortPile1,
    sortPile2,
    sortPile3,
    sortPile4,
    sortPile5,
    sortPile6,
    sortPile7,
    sortPile8,
    sortPile9,
    sortPile10,
    sortPile11,
    sortPile12,
    sortPile13,

    // the actions
    actions,

    // the game state
    gameDealing: gameState === GAME_STATE_DEALING,
    gameHasStarted: gameState !== GAME_STATE_START,
    gameInEndGame: gameState === GAME_STATE_ENDGAME,

    // debug mode
    isDebugMode: process.env.NODE_ENV === 'development',

    // the animation speeds
    dealSpeedPercentage,
    setDealSpeedPercentage,
    playSpeedPercentage,
    setPlaySpeedPercentage,
    animationSpeedPercentage: gameState === GAME_STATE_DEALING ? dealSpeedPercentage : playSpeedPercentage,

    // the flashing piles
    pileFlashes,

    // the selected pile
    selectedPileId,

    // the percentage complete
    percentageComplete: (((
      upPileSpades.length
      + upPileHearts.length
      + upPileDiamonds.length
      + upPileClubs.length
      + downPileSpades.length
      + downPileHearts.length
      + downPileDiamonds.length
      + downPileClubs.length) * 100) / 104).toFixed(0),

    // up/down piles complete
    updownPilesComplete: (
      upPileSpades.length
      + upPileHearts.length
      + upPileDiamonds.length
      + upPileClubs.length
      + downPileSpades.length
      + downPileHearts.length
      + downPileDiamonds.length
      + downPileClubs.length) === 104,

    // score history
    scoreHistory,
    _setScoreHistory,
    setScoreHistory,

    // checkboxes and set functions
    showCountLabels,
    setShowCountLabels,
    showSortedIcons,
    setShowSortedIcons,
    fillEmptyPiles,
    setFillEmptyPiles,

    // have we just won
    showWin,
    setShowWin,

    // the redeal button
    showRedealButton,
    setShowRedealButton,

    // card functions
    redealCards,
    performNextAction,
    cardAnimationComplete,
    pileFlashAnimationComplete,
    dealCards,
    clickOnCard,
    isSortedPlayPile,
  }), [
    dealPile,
    plonkPile,
    playPile1,
    playPile2,
    playPile3,
    playPile4,
    playPile5,
    playPile6,
    playPile7,
    playPile8,
    playPile9,
    playPile10,
    playPile11,
    playPile12,
    upPileSpades,
    upPileHearts,
    upPileDiamonds,
    upPileClubs,
    downPileSpades,
    downPileHearts,
    downPileDiamonds,
    downPileClubs,
    sortPile1,
    sortPile2,
    sortPile3,
    sortPile4,
    sortPile5,
    sortPile6,
    sortPile7,
    sortPile8,
    sortPile9,
    sortPile10,
    sortPile11,
    sortPile12,
    sortPile13,
    actions,
    gameState,
    dealSpeedPercentage,
    setDealSpeedPercentage,
    playSpeedPercentage,
    setPlaySpeedPercentage,
    pileFlashes,
    selectedPileId,
    scoreHistory,
    _setScoreHistory,
    setScoreHistory,
    showCountLabels,
    setShowCountLabels,
    showSortedIcons,
    setShowSortedIcons,
    fillEmptyPiles,
    setFillEmptyPiles,
    showWin,
    showRedealButton,
    performNextAction,
    cardAnimationComplete,
    pileFlashAnimationComplete,
    dealCards,
    clickOnCard,
    isSortedPlayPile,
  ]);

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
