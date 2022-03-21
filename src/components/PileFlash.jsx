import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import { motion } from 'framer-motion';

import styled from 'styled-components';
import { Cross } from '@styled-icons/icomoon';

import { colToLeft, rowToTop } from '../shared/card-functions';
import { pileIdToColRow } from '../shared/pile-functions';
import { PLAYAREA_X_OFFSET } from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

const StyledCross = styled(Cross)`
  color: red;
  font-weight: bold;
`;

const PileFlash = (props) => {
  const { pileId } = props;

  const { pileFlashAnimationComplete } = useContext(GameStateContext);

  // convert the pile's cols and rows into left/top
  const { col, row } = pileIdToColRow(pileId);
  const left = colToLeft(col, row) + PLAYAREA_X_OFFSET;
  const top = rowToTop(row);

  const motiondivstyle = {
    position: 'absolute',
    left,
    top,
    zIndex: 7,
  };

  const crossstyle = {
    position: 'relative',
    left: '4px',
    top: '12px',
    width: '56px',
    height: '56px',
    zIndex: 7,
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
        opacity: [1, 0, 1, 0, 1, 0],
      }}
      transition={{ duration: 0.8 }}
      onAnimationStart={onAnimationStart}
      onAnimationComplete={onAnimationComplete}
    >
      <div style={crossstyle}>
        <StyledCross />
      </div>
    </motion.div>
  );
};

PileFlash.propTypes = {
  pileId: PropTypes.string.isRequired,
};

export default PileFlash;
