import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import Card from './Card';
import CountLabel from './CountLabel';

import {
  col2Left,
  row2Top,
  cardSuitToImage,
} from '../shared/card-functions';

import {
  PILE_ID_UP_PILE_S,
  PILE_ID_UP_PILE_H,
  PILE_ID_UP_PILE_D,
  PILE_ID_UP_PILE_C,
  PILE_ID_DOWN_PILE_S,
  PILE_ID_DOWN_PILE_H,
  PILE_ID_DOWN_PILE_D,
  PILE_ID_DOWN_PILE_C,
  SUIT_CLUBS,
  SUIT_DIAMONDS,
  SUIT_HEARTS,
  SUIT_SPADES,
  PLAYAREA_X_OFFSET,
} from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

const Pile = (props) => {
  const {
    pileId,
    cards,
    faceUp,
    col,
    row,
  } = props;

  const { isDebugMode } = useContext(GameStateContext);

  if (!cards?.length) {
    // if there are no cards - if we are a up pile or a down pile, then show our suit
    if (pileId === PILE_ID_UP_PILE_S
      || pileId === PILE_ID_UP_PILE_H
      || pileId === PILE_ID_UP_PILE_D
      || pileId === PILE_ID_UP_PILE_C
      || pileId === PILE_ID_DOWN_PILE_S
      || pileId === PILE_ID_DOWN_PILE_H
      || pileId === PILE_ID_DOWN_PILE_D
      || pileId === PILE_ID_DOWN_PILE_C
    ) {
      let suit = SUIT_SPADES;
      if (pileId === PILE_ID_UP_PILE_H || pileId === PILE_ID_DOWN_PILE_H) {
        suit = SUIT_HEARTS;
      }
      if (pileId === PILE_ID_UP_PILE_D || pileId === PILE_ID_DOWN_PILE_D) {
        suit = SUIT_DIAMONDS;
      }
      if (pileId === PILE_ID_UP_PILE_C || pileId === PILE_ID_DOWN_PILE_C) {
        suit = SUIT_CLUBS;
      }

      // this is the same code from Card.jsx - with minor adjustments
      let height = '42px';
      if (suit === SUIT_SPADES) {
        height = '38px';
      } else if (suit === SUIT_CLUBS) {
        height = '40px';
      }

      const cardsuitstyle = {
        position: 'absolute',
        left: '12px',
        top: suit === SUIT_SPADES ? '22px' : '20px',
        width: '40px',
        height,
        opacity: 0.5,
      };

      const cardsuit = <img src={cardSuitToImage(suit)} alt="cardsuit" style={cardsuitstyle} />;

      const shadowSuitDivStyle = {
        position: 'absolute',
        zIndex: 0,
        left: col2Left(col) + PLAYAREA_X_OFFSET,
        top: row2Top(row),
      };

      return (
        <div style={shadowSuitDivStyle}>
          {cardsuit}
        </div>
      );
    }

    // otherwise nothing to show
    return null;
  }

  const card = cards[0];

  // we now return an array of cards (at most 2 for now) - so the 2nd card is visible as the top card animates into position; and a count label (if we in debug mode)
  const componentsToShow = [];

  const card2 = cards[1];
  if (card2) {
    componentsToShow.push(<Card key={card2.id} pileId={pileId} card={card2} faceUp={faceUp} col={col} row={row} />);
  }

  // and now the top card
  componentsToShow.push(<Card key={card.id} pileId={pileId} card={card} faceUp={faceUp} col={col} row={row} />);

  if (isDebugMode) {
    componentsToShow.push(<CountLabel key={`count_label_${card.id}`} count={cards.length} col={col} row={row} />);
  }

  // and return them
  return componentsToShow;
};

Pile.propTypes = {
  pileId: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    suit: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  })).isRequired,
  faceUp: PropTypes.bool.isRequired,
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
};

export default Pile;
