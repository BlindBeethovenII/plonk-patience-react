import React from 'react';

import PropTypes from 'prop-types';

import CardBaseImage from '../images/cards/cardbase.png';

import { col2Left, row2Top } from '../shared/card-functions';

const BlankSpace = (props) => {
  // compute the card blank space using absolute positioning based on grid (col, row) values
  const { col, row } = props;

  const blankspacestyle = {
    position: 'absolute',
    left: `${col2Left(col)}px`,
    top: `${row2Top(row)}px`,
  };

  const cardbasestyle = {
    position: 'relative',
    left: '0px',
    top: '0px',
  };

  return (
    <div
      id={`blankspace_${col}_${row}`}
      style={blankspacestyle}
    >
      <img src={CardBaseImage} alt="cardbase" style={cardbasestyle} />
    </div>
  );
};

BlankSpace.propTypes = {
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
};

export default BlankSpace;
