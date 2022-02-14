import React from 'react';

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

const Card = (props) => {
  const { card, col, row } = props;
  const { suit, number, id } = card;

  // convert the col/row into left/top
  const left = col2Left(col) + PLAYAREA_X_OFFSET;
  const top = row2Top(row);

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

  // if we are moving set our zIndex so we appear on top of everything else
  const { zIndex } = props;

  return (
    <motion.div id={id} style={{ position: 'absolute', zIndex }} animate={{ left, top }} initial={false}>
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
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    suit: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }).isRequired,
  zIndex: PropTypes.number.isRequired,
  // faceUp: PropTypes.bool.isRequired,
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
};

export default Card;
