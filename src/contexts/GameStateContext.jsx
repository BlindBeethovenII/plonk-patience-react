import React, { useState, useMemo, useCallback } from 'react';

import PropTypes from 'prop-types';

import { createShuffledDeck } from '../shared/card-functions';
import {
  ACTION_MOVE_CARD,
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
} from '../shared/constants';

const GameStateContext = React.createContext({});

export const GameStateContextProvider = ({ children }) => {
  // the deal pile starts as a shuffled array of cards - two packs worth
  const [dealPile, setDealPile] = useState(createShuffledDeck());

  // the plonk pile starts empty
  const [plonkPile, setPlonkPile] = useState([]);

  // the play piles also start empty - so we have an array of 12 empty arrays
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

  // the actions to be done when the current animation stops
  const [actions, setActions] = useState([]);

  // the current action - so we know if the animation complete is for the current action, and so we should perform the next action
  const [currentAction, setCurrentAction] = useState(null);

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

      default:
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

    // protect ourselves for when there are no actions left to perform
    if (!theActions?.length) {
      console.log('performNextAction there are no actions to perform');
      return;
    }

    // okay - we have at least one next action - so do it
    // take the top action
    const newActions = [...theActions];
    const nextAction = newActions.shift();
    setCurrentAction(nextAction);
    setActions(newActions);

    // currently we can only process a MOVE_CARD action
    const { action, fromPileId, toPileId } = nextAction;
    if (action === ACTION_MOVE_CARD) {
      moveCard(fromPileId, toPileId);
    }
  }, [moveCard]);

  // the animation has completed for a card - if this card is the current MOVE_CARD action to pileId then that action is complete, so perform the next action (if there is one)
  const cardAnimationComplete = useCallback((pileId) => {
    // if there is no current action, then nothing to do
    if (!currentAction) {
      console.log(`cardAnimationComplete pileId ${pileId}: no currentAction`);
      return;
    }

    const { action, toPileId } = currentAction;

    // if the current action is not a MOVE_CARD action, the nothing to do
    if (action !== ACTION_MOVE_CARD) {
      console.log(`cardAnimationComplete pileId ${pileId}: action !== ACTION_MOVE_CARD`);
      return;
    }

    // if the current action is for a different pile, the nothing to do
    if (toPileId !== pileId) {
      console.log(`cardAnimationComplete pileId ${pileId}: toPileId ${toPileId} not pileId`);
      return;
    }

    // current MOVE_CARD action is complete
    console.log(`cardAnimationComplete currentAction ${JSON.stringify(currentAction)} complete`);

    // because performNextAction no longer cares if there is a current action (as it can never be called when there is one)
    // and because setCurrentAction(null) here will not be effected before performNextAction() is called anyway - we don't setCurrentAction(null) now
    // setCurrentAction(null);

    // perform the next action
    performNextAction(actions);
  }, [currentAction, performNextAction, actions]);

  // deal the cards
  const dealCards = useCallback(() => {
    // this only makes sense if we have cards to deal
    if (!dealPile?.length) {
      return;
    }

    // these will be our new actions
    const newActions = [...actions];

    newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_DEAL_PILE, toPileId: PILE_ID_PLONK_PILE });
    newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_DEAL_PILE, toPileId: PILE_ID_PLAY_PILE_1 });
    newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_DEAL_PILE, toPileId: PILE_ID_PLAY_PILE_2 });
    newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_DEAL_PILE, toPileId: PILE_ID_PLAY_PILE_3 });
    newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_DEAL_PILE, toPileId: PILE_ID_PLAY_PILE_4 });
    newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_DEAL_PILE, toPileId: PILE_ID_PLAY_PILE_5 });
    newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_DEAL_PILE, toPileId: PILE_ID_PLAY_PILE_6 });
    newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_DEAL_PILE, toPileId: PILE_ID_PLAY_PILE_7 });
    newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_DEAL_PILE, toPileId: PILE_ID_PLAY_PILE_8 });
    newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_DEAL_PILE, toPileId: PILE_ID_PLAY_PILE_9 });
    newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_DEAL_PILE, toPileId: PILE_ID_PLAY_PILE_10 });
    newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_DEAL_PILE, toPileId: PILE_ID_PLAY_PILE_11 });
    newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_DEAL_PILE, toPileId: PILE_ID_PLAY_PILE_12 });

    // perform the next action (i.e. first of these actions)
    // we know here there there is no current action in place, as we've just started to deal the cards - so these are the first actions
    performNextAction(newActions);
  }, [dealPile, actions, performNextAction]);

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

    // the actions
    actions,
    currentAction,

    // card functions
    resetCards,
    performNextAction,
    cardAnimationComplete,
    dealCards,
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
    actions,
    currentAction,
    performNextAction,
    cardAnimationComplete,
    dealCards,
  ]);

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
