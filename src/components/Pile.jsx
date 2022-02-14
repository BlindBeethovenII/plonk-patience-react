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

  // we just return the top card
  return <Card key={card.id} card={card} zIndex={0} faceUp={faceUp} col={col} row={row} />;
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
