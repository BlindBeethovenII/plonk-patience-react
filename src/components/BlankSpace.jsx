import React from 'react';

import PropTypes from 'prop-types';

import CardBaseImage from '../images/cards/cardbase.png';

import { colToLeft, rowToTop } from '../shared/card-functions';
import { PLAYAREA_X_OFFSET } from '../shared/constants';

const BlankSpace = (props) => {
  // compute the card blank space using absolute positioning based on grid (col, row) values
  const { col, row } = props;

  // calc the left and top values
  const left = colToLeft(col, row) + PLAYAREA_X_OFFSET;
  const top = rowToTop(row);

  const blankspacestyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
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
