import React, { useContext, useState } from 'react';

import PropTypes from 'prop-types';

import { motion } from 'framer-motion';

import CardBlankImage from '../images/cards/cardblank.png';
import CardBackImage from '../images/cards/cardback.png';

import {
  colToLeft,
  rowToTop,
  cardNumberToString,
  cardSuitToImage,
  cardSuitToFillColour,
} from '../shared/card-functions';

import { pileIdToColRow, isFaceDownPileId } from '../shared/pile-functions';

import {
  SUIT_SPADES,
  SUIT_CLUBS,
  PLAYAREA_X_OFFSET,
} from '../shared/constants';

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
    prevPileId,
  } = card;

  const {
    animationSpeedPercentage,
    cardAnimationComplete,
    clickOnCard,
    canClickOnCard,
    gameDealing,
  } = useContext(GameStateContext);

  // we need to know if we are animating - both for the zIndex, and for card clicking
  const [isAnimating, setIsAnimating] = useState(false);

  // look up our col/row, and our prevCol/prevRow
  const { col, row } = pileIdToColRow(pileId);
  const { col: prevCol, row: prevRow } = pileIdToColRow(prevPileId);

  // convert the cols and rows into left/top
  const left = colToLeft(col, row) + PLAYAREA_X_OFFSET;
  const top = rowToTop(row);
  const prevLeft = colToLeft(prevCol, prevRow) + PLAYAREA_X_OFFSET;
  const prevTop = rowToTop(prevRow);

  // our pileId indicates if we are faceDown or not
  const faceDown = isFaceDownPileId(pileId);
  const prevFaceDown = isFaceDownPileId(prevPileId);

  const cardbasestyle = {
    position: 'relative',
    left: '0px',
    top: '0px',
  };

  const cardbackstyle = {
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
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
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
    setIsAnimating(true);
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

  // showCard
  const cardShowing = (
    <>
      {cardblank}
      {cardnumber}
      {cardsuit}
    </>
  );

  // showCardBack
  const cardBackShowing = <img src={CardBackImage} alt="cardback" style={cardbackstyle} />;

  // we don't need to animate if we are already in place, or we are the undercard
  if ((prevCol === col && prevRow === row) || underCard) {
    const inPlaceDivStyle = {
      position: 'absolute',
      zIndex: 0,
      left,
      top,
      cursor: gameDealing || !canClickOnCard(pileId) ? 'auto' : 'pointer',
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
        {faceDown ? cardBackShowing : cardShowing }
      </div>
    );
  }

  const containerDivStyle = {
    width: '63px',
    height: '81px',
    position: 'absolute',
    zIndex: isAnimating ? 2 : 0, // if we are animating make sure they are on top of all other cards
    left,
    top,
    cursor: gameDealing || !canClickOnCard(pileId) || isAnimating ? 'auto' : 'pointer',
  };

  const flipperDivStyle = {
    height: '100%',
    position: 'relative',
    width: '100%',
  };

  const frontDivStyle = {
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    height: '100%',
    left: '0',
    position: faceDown ? 'absolute' : 'relative',
    top: '0',
    transformStyle: 'preserve-3d',
    width: '100%',
    zIndex: '2',
  };

  const backDivStyle = {
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    height: '100%',
    left: '0',
    position: faceDown ? 'relative' : 'absolute',
    top: '0',
    transformStyle: 'preserve-3d',
    width: '100%',
  };

  // decide what we are showing in the prevLeft,prevTop to left,top animation
  // the default is just to show the card (front that is)
  let body = cardShowing;
  if (faceDown && !isAnimating) {
    // we have finished animating and we are faceDown, so show the card back
    body = cardBackShowing;
  } else if (prevFaceDown !== faceDown) {
    // we are flipping
    body = (
      <div style={flipperDivStyle}>
        <motion.div
          id={`${id}_flip_front`}
          style={frontDivStyle}
          initial={{ rotateY: faceDown ? 0 : 180 }}
          animate={{ rotateY: faceDown ? 180 : 0 }}
          transition={{ duration }}
        >
          {cardShowing}
        </motion.div>
        <motion.div
          id={`${id}_flip_back`}
          style={backDivStyle}
          initial={{ rotateY: faceDown ? -180 : 0 }}
          animate={{ rotateY: faceDown ? 0 : -180 }}
          transition={{ duration }}
        >
          {cardBackShowing}
        </motion.div>
      </div>
    );
  } else if (faceDown) {
    // we are animating a face down card move
    body = cardBackShowing;
  }

  return (
    <motion.div
      id={id}
      style={containerDivStyle}
      initial={{ left: prevLeft, top: prevTop }}
      animate={{ left, top }}
      transition={{ duration }}
      onAnimationComplete={onAnimationComplete}
      onAnimationStart={onAnimationStart}
      role="button"
      onClick={cardClicked}
      onKeyDown={cardClicked}
    >
      { body }
    </motion.div>
  );
};

Card.propTypes = {
  pileId: PropTypes.string.isRequired,
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    suit: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    prevPileId: PropTypes.string.isRequired,
  }).isRequired,
  underCard: PropTypes.bool,
};

Card.defaultProps = {
  underCard: false,
};

export default Card;
