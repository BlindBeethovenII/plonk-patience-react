import React, { useState, useMemo, useCallback } from 'react';

import PropTypes from 'prop-types';

import { createShuffledDeck } from '../shared/card-functions';
import {
  numberMatchesDealPile,
  numberToPlayPileId,
  suitToUpPileId,
  suitToDownPileId,
  isSortPileId,
} from '../shared/pile-functions';
import {
  ACTION_DEAL_CARD,
  ACTION_MOVE_CARD,
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

  // the current move action - so we know if the animation complete is for the current move action, and so we should perform the next action
  const [currentMoveAction, setCurrentMoveAction] = useState(null);

  // the next pile to deal a card to
  const [nextDealPileId, setNextDealPileId] = useState(PILE_ID_PLONK_PILE);

  // if the game is playing
  const [gamePlaying, setGamePlaying] = useState(false);

  // the animation speed percentage
  const [animationSpeedPercentage, setAnimationSpeedPercentage] = React.useState(50);

  // the piles to flash (we only flash one for now)
  const [pileFlashes, setPileFlashes] = useState([]);

  // the selected pile
  const [selectedPileId, setSelectedPileId] = useState(null);

  // if we are to show the count labels
  const [showCountLabels, setShowCountLabels] = useState(true);

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

  // reset the cards to the starting position
  const resetCards = () => {
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
    setPileFlashes([]);
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
    setCurrentMoveAction(null);
    setNextDealPileId(PILE_ID_PLONK_PILE);
    setPileFlashes([]);
    setSelectedPileId(null);
  };

  // move a card from pile1 to pile 2
  const moveCard = useCallback((fromPileId, toPileId) => {
    const { pile: fromPile, col, row } = getPileWithInfo(fromPileId);
    const { pile: toPile } = getPileWithInfo(toPileId);

    // this only makes sense if we have some cards in the from pile to move to the to pile
    if (!fromPile?.length) {
      return;
    }

    // create new objects for context rendering
    const newFromPile = [...fromPile];
    const newToPile = [...toPile];

    // take the top card from the first pile
    const topCard = newFromPile.shift();

    // and put it on the second pile
    newToPile.unshift({ ...topCard, prevCol: col, prevRow: row });

    setPile(fromPileId, newFromPile);
    setPile(toPileId, newToPile);
  }, [getPileWithInfo]);

  // do the next action (if any)
  // this is called from useCallback functions in this GameStateContext
  // and so, the set state functions will not have effected by this call (which I don't fully understand)
  // so we pass in the current/new values for those states and set them here
  const performNextAction = useCallback((theActions) => {
    // if there already is an action in progress, then ignore this call - it will be called again when that action completes
    // Note: we no longer call performNextAction when there is a currentAction in place - so commenting out this code
    // if (currentAction) {
    //   console.log(`performNextAction there is a currentAction ${JSON.stringify(currentAction)}`);
    //   return;
    // }

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
      console.log('performNextAction: there are no actions to perform');
      return;
    }

    // okay - we have at least one next action - so do it
    // take the top action
    let newActions = [...theActions];

    // we need to continue processing the actions until we have actually started to move a card
    let cardMoving = false;

    while (!cardMoving) {
      // below could result in empty newActions - so check here
      if (!newActions.length) {
        break;
      }

      // get and process the next action
      const nextAction = newActions.shift();
      console.log(`performNextAction: processing nextAction ${JSON.stringify(nextAction)}`);
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
        moveCard(fromPileId, toPileId);

        // remember we are moving this card
        setCurrentMoveAction(nextAction);
        cardMoving = true;
      } else if (action === ACTION_REALIGN_RIGHT_SORT) {
        // a card has just moved out of the right of the sort piles, so we need to realign that
        // this algorithm assumes there is only one empty pile - which is the one named in the action
        // we convert this to the required MOVE_CARD actions
        const moveActions = [];
        let { nowEmptySortPileId } = nextAction;
        while (nowEmptySortPileId) {
          // while we have an empty sort pile id to fill - fill if the next to the left has content
          let addedAction = false;
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_13 && sortPile12.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_12, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_12;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_12 && sortPile11.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_11, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_11;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_11 && sortPile10.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_10, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_10;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_10 && sortPile9.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_9, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_9;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_9 && sortPile8.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_8, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_8;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_8 && sortPile7.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_7, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_7;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_7 && sortPile6.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_6, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_6;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_6 && sortPile5.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_5, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_5;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_5 && sortPile4.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_4, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_4;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_4 && sortPile3.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_3, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_3;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_3 && sortPile2.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_2, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_2;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_2 && sortPile1.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_1, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = null;
            addedAction = true;
          }
          // if didn't add an action from this time round, then stop the loop
          if (!addedAction) {
            nowEmptySortPileId = null; // need to stop here - at the end of the list
          }
        }
        // put these new move actions to the front of the newsactions
        newActions = [...moveActions, ...newActions];
        console.log(`performNextAction: newActions new ${JSON.stringify(newActions)}`);
      } else if (action === ACTION_REALIGN_LEFT_SORT) {
        // a card has just moved out of the left of the sort piles, so we need to realign that
        // this algorithm assumes there is only one empty pile - which is the one named in the action
        // we convert this to the required MOVE_CARD actions
        const moveActions = [];
        let { nowEmptySortPileId } = nextAction;
        while (nowEmptySortPileId) {
          // while we have an empty sort pile id to fill - fill if the next to the left has content
          let addedAction = false;
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_1 && sortPile2.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_2, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_2;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_2 && sortPile3.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_3, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_3;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_3 && sortPile4.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_4, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_4;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_4 && sortPile5.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_5, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_5;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_5 && sortPile6.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_6, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_6;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_6 && sortPile7.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_7, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_7;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_7 && sortPile8.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_8, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_8;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_8 && sortPile9.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_9, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_9;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_9 && sortPile10.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_10, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_10;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_10 && sortPile11.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_11, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_11;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_11 && sortPile12.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_12, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = PILE_ID_SORT_PILE_12;
            addedAction = true;
          }
          if (nowEmptySortPileId === PILE_ID_SORT_PILE_12 && sortPile13.length) {
            moveActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_SORT_PILE_13, toPileId: nowEmptySortPileId });
            nowEmptySortPileId = null; // need to stop here - at the end of the list
            addedAction = true;
          }
          // if didn't add an action from this time round, then stop the loop
          if (!addedAction) {
            nowEmptySortPileId = null;
          }
        }
        // put these new move actions to the front of the newsactions
        newActions = [...moveActions, ...newActions];
        console.log(`performNextAction: newActions new ${JSON.stringify(newActions)}`);
      } else {
        console.error(`performNextAction unknown action ${action}`);
      }
    }

    // remember the new actions
    setActions(newActions);
  }, [
    moveCard,
    nextDealPileId,
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
  ]);

  // the animation has completed for a card - if this card is the current MOVE_CARD action to pileId then that action is complete, so perform the next action (if there is one)
  const cardAnimationComplete = useCallback((pileId) => {
    // if there is no current action, then nothing to do
    if (!currentMoveAction) {
      console.log(`cardAnimationComplete pileId ${pileId}: no current move action`);
      return;
    }

    const { toPileId } = currentMoveAction;

    // if the current action is for a different pile, the nothing to do
    if (toPileId !== pileId) {
      console.log(`cardAnimationComplete pileId ${pileId}: toPileId ${toPileId} of current move action is not pileId`);
      return;
    }

    // current MOVE_CARD action is complete
    console.log(`cardAnimationComplete: currentMoveAction ${JSON.stringify(currentMoveAction)} complete`);

    // because performNextAction no longer cares if there is a current action (as it can never be called when there is one)
    // and because setCurrentAction(null) here will not be effected before performNextAction() is called anyway - we don't setCurrentAction(null) now
    // setCurrentAction(null);

    // the top card of this pile is now considered at this col/row
    // get the pile
    const { pile, col, row } = getPileWithInfo(pileId);

    // there should be at least one card in this pile by here - but checking anyway
    if (!pile?.length) {
      console.error(`cardAnimationComplete: ${pileId} is empty but it should have at least one card in it`);
      return;
    }

    // danger: going to update in situ - is okay - as that card is already at that position anyway
    const topCard = pile[0];
    topCard.prevCol = col;
    topCard.prevRow = row;

    // perform the next action
    performNextAction(actions);
  }, [currentMoveAction, performNextAction, actions, getPileWithInfo]);

  // the pile flash animation has completed for the given pileId
  const pileFlashAnimationComplete = useCallback((pileId) => {
    // console.log(`pileFlashAnimationComplete: pile flash complete for ${pileId}`);
    // remove this one from the piles that are flashing
    const newPileFlashes = pileFlashes.filter((pileFlashId) => pileFlashId !== pileId);
    setPileFlashes(newPileFlashes);
  }, [pileFlashes]);

  // deal the cards
  const dealCards = useCallback(() => {
    // this only makes sense if we have cards to deal
    if (!dealPile?.length) {
      return;
    }

    // these will be our new actions
    const newActions = [...actions];

    // add in a DEAL_CARD action for every card in the deal pile, except the last one
    const nCards = dealPile.length;
    for (let i = 0; i < nCards - 1; i += 1) {
      newActions.push({ action: ACTION_DEAL_CARD });
    }
    // the last deal card always goes to the plonk pile
    newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_DEAL_PILE, toPileId: PILE_ID_PLONK_PILE });

    // we are now playing the game
    setGamePlaying(true);

    // perform the next action (i.e. first of these actions)
    // we know here there there is no current action in place, as we've just started to deal the cards - so these are the first actions
    performNextAction(newActions);
  }, [dealPile, actions, performNextAction]);

  // click on a card
  const clickOnCard = useCallback((clickPileId) => {
    console.log(`clickOnCard: called for pile ${clickPileId}`);

    // if deal pile is not empty, then we are not allowed to click - just ignore
    if (dealPile?.length) {
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
      // the deal pile can never be clicked on
      return;
    }

    if (clickPileId === PILE_ID_PLONK_PILE) {
      // should never be empty - but let's check anyway
      if (!plonkPile?.length) {
        console.error(`clickOnCard: ${clickPileId} is empty but it should have at least one card in it`);
        return;
      }

      // the actions for this click
      const newActions = [];

      // helper function to create the actions to put the selected pile back
      const createActionsToPutSelectedPileBack = () => {
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
      };

      // if there is a selected pile then put it back here
      if (selectedPileId) {
        createActionsToPutSelectedPileBack();
      }

      // get the top card from the plonk pile, and convert to play pile id
      const { number: plonkPileNumber } = plonkPile[0];
      const playPileId = numberToPlayPileId(plonkPileNumber);
      console.log(`clickOnCard: clicked on ${plonkPileNumber} on plonk pile so selected pile is ${playPileId}`);

      // need to know if this is the same as the currently selected pile
      const isSameSelectedPile = (playPileId === selectedPileId);
      setSelectedPileId(playPileId);

      // move the top plonk card and all the selected pile's cards to the sort piles
      newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_PLONK_PILE, toPileId: PILE_ID_SORT_PILE_13 });

      let nextSortPileId = PILE_ID_SORT_PILE_12;

      // move to next sort pile (we move from right to left)
      const moveToNextSortPileId = () => {
        switch (nextSortPileId) {
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

      // if the new selected pile is the same as the previous pile then that pile will actually be empty
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

    if (clickPileId === PILE_ID_UP_PILE_S || clickPileId === PILE_ID_UP_PILE_H || clickPileId === PILE_ID_UP_PILE_D || clickPileId === PILE_ID_UP_PILE_C) {
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
        newPileFlashes.push(clickPileId);
        setPileFlashes(newPileFlashes);
      }

      return;
    }

    if (clickPileId === PILE_ID_DOWN_PILE_S || clickPileId === PILE_ID_DOWN_PILE_H || clickPileId === PILE_ID_DOWN_PILE_D || clickPileId === PILE_ID_DOWN_PILE_C) {
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
        newPileFlashes.push(clickPileId);
        setPileFlashes(newPileFlashes);
      }

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

    console.log(`clickOnCard: clicked on ${clickPileNumber} ${clickPileSuit}`);

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

    // cannot move the card clicked on - so flash it, for user feedback for the click
    console.log(`clickOnCard: flashing pile ${clickPileId}`);
    const newPileFlashes = [...pileFlashes];
    newPileFlashes.push(clickPileId);
    setPileFlashes(newPileFlashes);
  }, [
    dealPile,
    getPileWithInfo,
    actions,
    performNextAction,
    pileFlashes,
    plonkPile,
    selectedPileId,
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
    currentMoveAction,

    // further game state
    gamePlaying,
    isDebugMode: false,

    // the animation speed
    animationSpeedPercentage,
    setAnimationSpeedPercentage,

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

    // show count labels
    showCountLabels,
    setShowCountLabels,

    // card functions
    resetCards,
    performNextAction,
    cardAnimationComplete,
    pileFlashAnimationComplete,
    dealCards,
    clickOnCard,
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
    currentMoveAction,
    gamePlaying,
    animationSpeedPercentage,
    setAnimationSpeedPercentage,
    pileFlashes,
    selectedPileId,
    performNextAction,
    cardAnimationComplete,
    pileFlashAnimationComplete,
    dealCards,
    clickOnCard,
    showCountLabels,
    setShowCountLabels,
  ]);

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
