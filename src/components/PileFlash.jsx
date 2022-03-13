import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import { motion } from 'framer-motion';

import CardBlankImage from '../images/cards/cardblank.png';

import { colToLeft, rowToTop } from '../shared/card-functions';
import { pileIdToColRow } from '../shared/pile-functions';
import { PLAYAREA_X_OFFSET } from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

const PileFlash = (props) => {
  const { pileId } = props;

  const { pileFlashAnimationComplete } = useContext(GameStateContext);

  // convert the pile's cols and rows into left/top
  const { col, row } = pileIdToColRow(pileId);
  const left = colToLeft(col, row) + PLAYAREA_X_OFFSET;
  const top = rowToTop(row);

  const cardbasestyle = {
    position: 'relative',
    left: '0px',
    top: '0px',
  };

  const motiondivstyle = {
    position: 'absolute',
    left,
    top,
    zIndex: 2,
  };

  const onAnimationStart = () => {
    // console.log(`PileFlash onAnimationStart for pile ${pileId}`);
  };

  const onAnimationComplete = () => {
    // console.log(`PileFlash onAnimationComplete for pile ${pileId}`);
    pileFlashAnimationComplete(pileId);
  };

  return (
    <motion.div
      id={`pile_flash_motion_${pileId}`}
      style={motiondivstyle}
      animate={{
        opacity: [1, 0, 1, 0],
      }}
      transition={{ duration: 0.4 }}
      onAnimationStart={onAnimationStart}
      onAnimationComplete={onAnimationComplete}
    >
      <img src={CardBlankImage} alt="cardblank" style={cardbasestyle} />
    </motion.div>
  );
};

PileFlash.propTypes = {
  pileId: PropTypes.string.isRequired,
};

export default PileFlash;
