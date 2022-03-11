import React, { useContext, useState } from 'react';

import PropTypes from 'prop-types';

import { motion } from 'framer-motion';

import CardBlankImage from '../images/cards/cardblank.png';

import {
  colToLeft,
  rowToTop,
  cardNumberToString,
  cardSuitToImage,
  cardSuitToFillColour,
} from '../shared/card-functions';

import { pileIdToColRow } from '../shared/pile-functions';

import { SUIT_CLUBS, SUIT_SPADES, PLAYAREA_X_OFFSET } from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

const Card = (props) => {
  // we are given the card and the col/row it is to be shown at
  const {
    pileId,
    card,
    underCard,
  } = props;

  // there are the card details - including where it was showing before
  const {
    id,
    suit,
    number,
    prevCol,
    prevRow,
  } = card;

  const { animationSpeedPercentage, cardAnimationComplete, clickOnCard } = useContext(GameStateContext);

  // we need to know if we are animating - both for the zIndex, and for card clicking
  const [isAnimating, setIsAnimating] = useState(false);

  // look up our col/row
  const { col, row } = pileIdToColRow(pileId);

  // convert the cols and rows into left/top
  const left = colToLeft(col) + PLAYAREA_X_OFFSET;
  const top = rowToTop(row);
  const prevLeft = colToLeft(prevCol) + PLAYAREA_X_OFFSET;
  const prevTop = rowToTop(prevRow);

  const cardbasestyle = {
    position: 'relative',
    left: '0px',
    top: '0px',
  };

  const cardnumberstyle = {
    position: 'absolute',
    left: '0px',
    top: '40px',
    width: '40px',
    height: '40px',
    fontWeight: 'bold',
    fontSize: '36px',
    letterSpacing: '-0.1em',
  };

  let height = '42px';
  if (suit === SUIT_SPADES) {
    height = '38px';
  } else if (suit === SUIT_CLUBS) {
    height = '40px';
  }

  const cardsuitstyle = {
    position: 'absolute',
    left: '22px',
    top: suit === SUIT_SPADES ? '2px' : '0px',
    width: '40px',
    height,
  };

  const onAnimationStart = () => {
    // console.log(`onAnimationStart card ${cardNumberToString(number)} ${suit} on pile ${pileId} (${prevCol},${prevRow}) (${col},${row})`);

    // we are moving - so make sure we are on top of all the 'at rest' cards
    setIsAnimating(1);
  };

  const onAnimationComplete = () => {
    // console.log(`onAnimationComplete card ${cardNumberToString(number)} ${suit} on pile ${pileId} (${prevCol},${prevRow}) (${col},${row})`);

    // we have arrived, so go back to 'at rest'
    setIsAnimating(false);

    cardAnimationComplete(pileId);
  };

  const cardClicked = () => {
    if (!isAnimating) {
      clickOnCard(pileId);
    }
  };

  // duration of animation is based on the deal speed percentage - using reverse percentage - so slider to right is faster
  const duration = (2 * (100 - animationSpeedPercentage)) / 100;

  // the inside of the motion.div or div is the same regardless of if we animate the card into position
  const cardblank = <img src={CardBlankImage} alt="cardblank" style={cardbasestyle} />;
  const cardnumber = (
    <div style={cardnumberstyle}>
      <svg width="60px" height="40px">
        <text x="10" y="30" fill={cardSuitToFillColour(suit)}>
          {cardNumberToString(number)}
        </text>
      </svg>
    </div>
  );
  const cardsuit = <img src={cardSuitToImage(suit)} alt="cardsuit" style={cardsuitstyle} />;

  // we don't need to animate if we are already in place, or we are the undercard
  if ((prevCol === col && prevRow === row) || underCard) {
    const inPlaceDivStyle = {
      position: 'absolute',
      zIndex: 0,
      left,
      top,
    };

    return (
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus
      <div
        id={id}
        style={inPlaceDivStyle}
        role="button"
        onClick={cardClicked}
        onKeyDown={cardClicked}
      >
        {cardblank}
        {cardnumber}
        {cardsuit}
      </div>
    );
  }

  // if we are animating, use a zIndex of 1, so we are on top of all other cards
  const zIndex = isAnimating ? 1 : 0;

  return (
    <motion.div
      id={id}
      style={{ position: 'absolute', zIndex }}
      initial={{ left: prevLeft, top: prevTop }}
      animate={{ left, top }}
      transition={{ duration }}
      onAnimationComplete={onAnimationComplete}
      onAnimationStart={onAnimationStart}
      role="button"
      onClick={cardClicked}
      onKeyDown={cardClicked}
    >
      {cardblank}
      {cardnumber}
      {cardsuit}
    </motion.div>
  );
};

Card.propTypes = {
  pileId: PropTypes.string.isRequired,
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    suit: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    prevCol: PropTypes.number.isRequired,
    prevRow: PropTypes.number.isRequired,
  }).isRequired,
  // faceUp: PropTypes.bool.isRequired,
  underCard: PropTypes.bool,
};

Card.defaultProps = {
  underCard: false,
};

export default Card;
