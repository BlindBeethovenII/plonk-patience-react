import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import Card from './Card';
import CountLabel from './CountLabel';

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

  // if there are no cards - then nothing to show
  if (!cards?.length) {
    return null;
  }

  const card = cards[0];

  // we now return an array of cards (at most 2 for now) - so the 2nd card is visible as the top card animates into position; and a count label (if we in debug mode)
  const cardsToShow = [];

  const card2 = cards[1];
  if (card2) {
    cardsToShow.push(<Card key={card2.id} pileId={pileId} card={card2} faceUp={faceUp} col={col} row={row} />);
  }

  // and now the top card
  cardsToShow.push(<Card key={card.id} pileId={pileId} card={card} faceUp={faceUp} col={col} row={row} />);

  if (isDebugMode) {
    cardsToShow.push(<CountLabel key={`count_label_${card.id}`} count={cards.length} col={col} row={row} />);
  }

  // and return them
  return cardsToShow;
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
