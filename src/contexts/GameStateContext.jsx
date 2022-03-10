import React, { useState, useMemo, useCallback } from 'react';

import PropTypes from 'prop-types';

import { createShuffledDeck } from '../shared/card-functions';
import {
  ACTION_DEAL_CARD,
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
  PILE_ID_UP_PILE_S,
  PILE_ID_UP_PILE_H,
  PILE_ID_UP_PILE_D,
  PILE_ID_UP_PILE_C,
  PILE_ID_DOWN_PILE_S,
  PILE_ID_DOWN_PILE_H,
  PILE_ID_DOWN_PILE_D,
  PILE_ID_DOWN_PILE_C,
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
  const [upPileSpades, setUpPileSpades] = useState([]);
  const [upPileHearts, setUpPileHearts] = useState([]);
  const [upPileDiamonds, setUpPileDiamonds] = useState([]);
  const [upPileClubs, setUpPileClubs] = useState([]);
  const [downPileSpades, setDownPileSpades] = useState([]);
  const [downPileHearts, setDownPileHearts] = useState([]);
  const [downPileDiamonds, setDownPileDiamonds] = useState([]);
  const [downPileClubs, setDownPileClubs] = useState([]);

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

      default:
        console.error(`setPile cannot cope with pileId ${pileId}`);
        break;
    }
  };

  // helper function (might move it to card-functions later)
  const numberMatchesDealPile = (n, pileId) => {
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

  // helper function (might move it to card-functions later)
  const suitToUpPileId = (suit) => {
    if (suit === SUIT_CLUBS) return PILE_ID_UP_PILE_C;
    if (suit === SUIT_DIAMONDS) return PILE_ID_UP_PILE_D;
    if (suit === SUIT_HEARTS) return PILE_ID_UP_PILE_H;
    return PILE_ID_UP_PILE_S;
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
    const newActions = [...theActions];

    // we need to continue processing the actions until we have actually started to move a card
    let cardMoving = false;

    while (!cardMoving) {
      // get and process the next action
      const nextAction = newActions.shift();
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
      } else {
        console.error(`performNextAction unknown action ${action}`);
      }
    }

    // remember the new actions
    setActions(newActions);
  }, [moveCard, nextDealPileId, dealPile]);

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

    // danger: going to update in situ - let's see what happens
    const topCard = pile[0];
    topCard.prevCol = col;
    topCard.prevRow = row;

    // perform the next action
    performNextAction(actions);
  }, [currentMoveAction, performNextAction, actions, getPileWithInfo]);

  // deal the cards
  const dealCards = useCallback(() => {
    // this only makes sense if we have cards to deal
    if (!dealPile?.length) {
      return;
    }

    // these will be our new actions
    const newActions = [...actions];

    // add in a DEAL_CARD action for every card in the deal pile
    const nCards = dealPile.length;
    for (let i = 0; i < nCards; i += 1) {
      newActions.push({ action: ACTION_DEAL_CARD });
    }

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

    // process the pile clicked on

    if (clickPileId === PILE_ID_DEAL_PILE) {
      // the deal pile can never be clicked on
      return;
    }

    if (clickPileId === PILE_ID_PLONK_PILE) {
      // TODO
      console.log('clickOnCard: TODO code clicking on the plonk pile');
      return;
    }

    if (clickPileId === PILE_ID_UP_PILE_S || clickPileId === PILE_ID_UP_PILE_H || clickPileId === PILE_ID_UP_PILE_D || clickPileId === PILE_ID_UP_PILE_C) {
      // TODO
      console.log('clickOnCard: TODO code clicking on an up pile');
      return;
    }

    if (clickPileId === PILE_ID_DOWN_PILE_S || clickPileId === PILE_ID_DOWN_PILE_H || clickPileId === PILE_ID_DOWN_PILE_D || clickPileId === PILE_ID_DOWN_PILE_C) {
      // TODO
      console.log('clickOnCard: TODO code clicking on a down pile');
      return;
    }

    // we must be one of the 12 piles by this point
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

    // this holds our decision to move this card to the up pile
    let cardIsForUpPile = false;

    // the up pile might be empty, if so, we want to move the Ace
    if (!upPile.length && clickPileNumber === NUMBER_A) {
      cardIsForUpPile = true;
    }

    // if the up pile is not empty, then we can move the next card
    if (upPile.length) {
      // get the top card from the up pile
      const { number: upPileNumber } = upPile[0];

      if (clickPileNumber === upPileNumber + 1) {
        cardIsForUpPile = true;
      }
    }

    if (cardIsForUpPile) {
      // yet, move this card onto the up pile
      const newActions = [...actions];
      newActions.unshift({ action: ACTION_MOVE_CARD, fromPileId: clickPileId, toPileId: upPileId });
      performNextAction(newActions);
      return;
    }

    console.log('clickOnCard: STILL MORE TODO');
  }, [dealPile, getPileWithInfo, actions, performNextAction]);

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

    // the actions
    actions,
    currentMoveAction,

    // further game state
    gamePlaying,
    isDebugMode: true,

    // the animation speed
    animationSpeedPercentage,
    setAnimationSpeedPercentage,

    // card functions
    resetCards,
    performNextAction,
    cardAnimationComplete,
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
    actions,
    currentMoveAction,
    gamePlaying,
    animationSpeedPercentage,
    setAnimationSpeedPercentage,
    performNextAction,
    cardAnimationComplete,
    dealCards,
    clickOnCard,
  ]);

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
