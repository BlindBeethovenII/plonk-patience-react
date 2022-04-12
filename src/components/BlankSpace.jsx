import React from 'react';

import PropTypes from 'prop-types';

import CardBaseImage from '../images/cards/cardbase.png';

import { colToLeft, rowToTop, cardSuitToImage } from '../shared/card-functions';
import { PLAYAREA_X_OFFSET, SUIT_SPADES, SUIT_CLUBS } from '../shared/constants';

const BlankSpace = (props) => {
  // compute the card blank space using absolute positioning based on grid (col, row) values
  const { col, row, suit } = props;

  // we can show up to two things
  const divsToShow = [];

  // first the outline div

  // calc the left and top values
  const left = colToLeft(col, row) + PLAYAREA_X_OFFSET;
  const top = rowToTop(row);

  const blankspacestyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    pointerEvents: 'none',
  };

  const cardbasestyle = {
    position: 'relative',
    left: '0px',
    top: '0px',
  };

  const outlineDiv = (
    <div
      key={`blankspace_outline_${col}_${row}`}
      id={`blankspace_outline_${col}_${row}`}
      style={blankspacestyle}
    >
      <img src={CardBaseImage} alt="cardbase" style={cardbasestyle} />
    </div>
  );

  divsToShow.push(outlineDiv);

  // if suit defined, then we show a faded single suit image in the middle of the blank space
  if (suit) {
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
      left: colToLeft(col, row) + PLAYAREA_X_OFFSET,
      top: rowToTop(row),
    };

    const shadowSuitDiv = (
      <div
        key={`blankspace_shadowsuit_${col}_${row}`}
        id={`blankspace_shadowsuit_${col}_${row}`}
        style={shadowSuitDivStyle}
      >
        {cardsuit}
      </div>
    );

    divsToShow.push(shadowSuitDiv);
  }

  return divsToShow;
};

BlankSpace.propTypes = {
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  suit: PropTypes.string,
};

BlankSpace.defaultProps = {
  suit: null,
};

export default BlankSpace;
