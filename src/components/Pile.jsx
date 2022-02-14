import React from 'react';

import PropTypes from 'prop-types';

import Card from './Card';

const Pile = (props) => {
  const {
    cards,
    faceUp,
    col,
    row,
  } = props;

  // if there are no cards - then nothing to show
  if (!cards?.length) {
    return null;
  }

  const card = cards[0];

  // we now return an array of cards (at most 2 for now) - so the 2nd card is visible as the top card animates into position
  const cardsToShow = [];

  const card2 = cards[1];
  if (card2) {
    cardsToShow.push(<Card key={card2.id} card={card2} zIndex={0} faceUp={faceUp} col={col} row={row} />);
  }

  // and now the top card
  cardsToShow.push(<Card key={card.id} card={card} zIndex={0} faceUp={faceUp} col={col} row={row} />);

  // and return them
  return cardsToShow;
};

Pile.propTypes = {
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
