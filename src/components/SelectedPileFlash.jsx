import React, { useContext } from 'react';

import { motion } from 'framer-motion';

import styled from 'styled-components';
import { ArrowUnsorted } from '@styled-icons/typicons';

import CardBlankImage from '../images/cards/cardblank.png';

import { colToLeft, rowToTop } from '../shared/card-functions';
import { pileIdToColRow } from '../shared/pile-functions';
import { PLAYAREA_X_OFFSET } from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

const StyledArrowUnsorted = styled(ArrowUnsorted)`
  color: rgb(85,107,47);
  font-weight: bold;
`;

// puts an infinite empty card white flash on the selected pile, if it exists - so user can see where the selected/sorted pile is going back to
const SelectedPileFlash = () => {
  const { selectedPileId, isSortedPlayPile, showSortedIcons } = useContext(GameStateContext);

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

  const sortdivstyle = {
    position: 'absolute',
    left: '41px',
    top: '52px',
    width: '24px',
    height: '16px',
    pointerEvents: 'none',
  };

  // show the sorted icon, if ...
  let sortedIcon = null;
  if (isSortedPlayPile(selectedPileId) && showSortedIcons) {
    sortedIcon = (
      <div style={sortdivstyle}>
        <StyledArrowUnsorted />
      </div>
    );
  }

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
      {sortedIcon}
    </motion.div>
  );
};

export default SelectedPileFlash;
