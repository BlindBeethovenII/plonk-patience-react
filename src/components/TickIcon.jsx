import React from 'react';

import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Tick } from '@styled-icons/typicons';

import { colToLeft, rowToTop } from '../shared/card-functions';
import { PLAYAREA_X_OFFSET } from '../shared/constants';

const StyledTick = styled(Tick)`
  color: rgb(85,107,47);
  font-weight: bold;
  zIndex: 6;
`;

const TickIcon = (props) => {
  const {
    col,
    row,
  } = props;

  const left = colToLeft(col, row) + PLAYAREA_X_OFFSET - 4;
  const top = rowToTop(row) + 16;

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: '30px',
    height: '20px',
    pointerEvents: 'none',
    zIndex: 5,
  };

  return (
    <div style={divstyle}>
      <StyledTick />
    </div>
  );
};

TickIcon.propTypes = {
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
};

export default TickIcon;
