import React, { useContext } from 'react';

import { motion } from 'framer-motion';

import CardBlankImage from '../images/cards/cardblank.png';

import { colToLeft, rowToTop } from '../shared/card-functions';
import { pileIdToColRow } from '../shared/pile-functions';
import { PLAYAREA_X_OFFSET } from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

// puts an infinite empty card white flash on the selected pile, if it exists - so user can see where the selected/sorted pile is going back to
const SelectedPileFlash = () => {
  const { selectedPileId } = useContext(GameStateContext);

  // if not selected pile, then nothing to show
  if (!selectedPileId) {
    return null;
  }

  // convert the pile's cols and rows into left/top
  const { col, row } = pileIdToColRow(selectedPileId);
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

  return (
    <motion.div
      id={`selected_pile_flash_motion_${selectedPileId}`}
      style={motiondivstyle}
      animate={{
        opacity: [0.5, 0.1, 0.5],
      }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <img src={CardBlankImage} alt="cardblank" style={cardbasestyle} />
    </motion.div>
  );
};

export default SelectedPileFlash;
