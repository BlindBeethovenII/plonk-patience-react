import React, { useState, useMemo, useCallback } from 'react';

import PropTypes from 'prop-types';

import { createShuffledDeck } from '../shared/card-functions';
import {
  ACTION_MOVE_CARD,
  PILE_ID_DEAL_PILE,
  PILE_ID_PLAY_PILE_1,
  PILE_ID_PLAY_PILE_2,
  PILE_ID_PLAY_PILE_3,
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

  // the actions to be done when the current animation stops
  const [actions, setActions] = useState([]);

  // the current action - so we know if the animation complete is for the current action, and so we should perform the next action
  const [currentAction, setCurrentAction] = useState(null);

  // convert a pile constant to the actual pile, with its col/row info
  const getPileWithInfo = useCallback((pileId) => {
    switch (pileId) {
      case PILE_ID_DEAL_PILE:
        return { pile: dealPile, col: 0, row: 4 };

      case PILE_ID_PLAY_PILE_1:
        return { pile: playPile1, col: 1, row: 0 };

      case PILE_ID_PLAY_PILE_2:
        return { pile: playPile2, col: 2, row: 0 };

      case PILE_ID_PLAY_PILE_3:
        return { pile: playPile3, col: 2, row: 0 };

      default:
        return null;
    }
  }, [dealPile, playPile1, playPile2, playPile3]);

  // set the given pile
  const setPile = (pileId, pile) => {
    switch (pileId) {
      case PILE_ID_DEAL_PILE:
        setDealPile(pile);
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
    // this only makes sense if we have enough cards to deal the 3 cards out
    if (dealPile?.length >= 3) {
      // just for now - we add the actions, then perform the next action - being the first one - the rest are then done as the animations complete
      const newActions = [...actions];
      newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_DEAL_PILE, toPileId: PILE_ID_PLAY_PILE_1 });
      newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_DEAL_PILE, toPileId: PILE_ID_PLAY_PILE_2 });
      newActions.push({ action: ACTION_MOVE_CARD, fromPileId: PILE_ID_DEAL_PILE, toPileId: PILE_ID_PLAY_PILE_3 });

      // perform the next action (i.e. first of these actions)
      // we know here there there is no current action in place, as we've just started to deal the cards - so these are the first actions
      performNextAction(newActions);
    }
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
