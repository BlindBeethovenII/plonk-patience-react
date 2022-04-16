import React from 'react';

import PropTypes from 'prop-types';

import CardBaseImage from '../images/cards/cardbase.png';

import { colToLeft, rowToTop, cardSuitToImage } from '../shared/card-functions';
import { PLAYAREA_X_OFFSET, SUIT_SPADES, SUIT_CLUBS } from '../shared/constants';

const BlankSpace = (props) => {
  // compute the card blank space using absolute positioning based on grid (col, row) values
  const {
    col,
    row,
    suit,
    shadowText,
  } = props;

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

  // if shadow text defined, then we show a faded text in the middle of the blank space
  if (shadowText) {
    let leftAdjust = 12;
    if (shadowText === 'A 2') {
      leftAdjust = 0;
    } else if (shadowText === '10') {
      leftAdjust = 2;
    } else if (shadowText === 'Q') {
      leftAdjust = 6;
    } else if (shadowText === 'K') {
      leftAdjust = 8;
    }

    let letterSpacing = '0';
    if (shadowText === 'A 2') {
      letterSpacing = '-0.1em';
    } else if (shadowText === '10') {
      letterSpacing = '-0.1em';
    }

    const shadowTextDivStyle = {
      position: 'absolute',
      zIndex: 0,
      left: colToLeft(col, row) + PLAYAREA_X_OFFSET + leftAdjust,
      top: rowToTop(row) + 20,
      width: '40px',
      height: '40px',
      fontWeight: 'bold',
      fontSize: '36px',
      letterSpacing,
      opacity: 0.5,
      userSelect: 'none',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none',
      msUserSelect: 'none',
    };

    const shadowTextDiv = (
      <div
        key={`blankspace_shadowtext_${col}_${row}`}
        id={`blankspace_shadowtext_${col}_${row}`}
        style={shadowTextDivStyle}
      >
        <svg width="66px" height="40px">
          <text x="10" y="30">
            {shadowText}
          </text>
        </svg>
      </div>
    );

    divsToShow.push(shadowTextDiv);
  }

  return divsToShow;
};

BlankSpace.propTypes = {
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  suit: PropTypes.string,
  shadowText: PropTypes.string,
};

BlankSpace.defaultProps = {
  suit: null,
  shadowText: null,
};

export default BlankSpace;
