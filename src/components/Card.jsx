import React, { useContext, useState } from 'react';

import PropTypes from 'prop-types';

import { motion } from 'framer-motion';

import CardBlankImage from '../images/cards/cardblank.png';

import {
  col2Left,
  row2Top,
  cardNumberToString,
  cardSuitToImage,
  cardSuitToFillColour,
} from '../shared/card-functions';

import { SUIT_CLUBS, SUIT_SPADES, PLAYAREA_X_OFFSET } from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

const Card = (props) => {
  const { cardAnimationComplete, dealSpeedPercentage } = useContext(GameStateContext);

  // we manage our own zIndex while we are moving
  const [zIndex, setZIndex] = useState(0);

  // we are given the card and the col/row it is to be shown at
  const {
    pileId,
    card,
    col,
    row,
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

  // convert the cols and rows into left/top
  const left = col2Left(col) + PLAYAREA_X_OFFSET;
  const top = row2Top(row);
  const prevLeft = col2Left(prevCol) + PLAYAREA_X_OFFSET;
  const prevTop = row2Top(prevRow);

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
    // console.log(`onAnimationStart card ${cardNumberToString(number)} ${suit} on pile ${pileId}`);
    // only move the z-index to 1, if we are not the under-card
    // the reason for this, is that every card animates, even if it is already in position and has nowhere to go
    if (!underCard) {
      setZIndex(1);
    }
  };

  const onAnimationComplete = () => {
    // console.log(`onAnimationComplete card ${cardNumberToString(number)} ${suit} on pile ${pileId}`);
    setZIndex(0);
    cardAnimationComplete(pileId);
  };

  // duration of animation is based on the deal speed percentage - using reverse percentage - so slider to right is faster
  const duration = (2 * (100 - dealSpeedPercentage)) / 100;

  return (
    <motion.div
      id={id}
      style={{ position: 'absolute', zIndex }}
      initial={{ left: prevLeft, top: prevTop }}
      animate={{ left, top }}
      transition={{ duration }}
      onAnimationComplete={onAnimationComplete}
      onAnimationStart={onAnimationStart}
    >
      <img src={CardBlankImage} alt="cardblank" style={cardbasestyle} />
      <div style={cardnumberstyle}>
        <svg width="60px" height="40px">
          <text x="10" y="30" fill={cardSuitToFillColour(suit)}>
            {cardNumberToString(number)}
          </text>
        </svg>
      </div>
      <img src={cardSuitToImage(suit)} alt="cardsuit" style={cardsuitstyle} />
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
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  underCard: PropTypes.bool.isRequired, // true if this card is the 2nd card, the under-card, which is been shown as the top card could still is be moving onto the pile
};

export default Card;
