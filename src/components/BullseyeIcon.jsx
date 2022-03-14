import React from 'react';

import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Bullseye } from '@styled-icons/boxicons-regular';

import { colToLeft, rowToTop } from '../shared/card-functions';
import { PLAYAREA_X_OFFSET } from '../shared/constants';

const StyledBullseye = styled(Bullseye)`
  color: rgb(85,107,47);
  font-weight: bold;
`;

const BullseyeIcon = (props) => {
  const {
    col,
    row,
  } = props;

  const left = colToLeft(col, row) + PLAYAREA_X_OFFSET + 11;
  const top = rowToTop(row) + 20;

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: '42px',
    height: '30px',
    pointerEvents: 'none',
  };

  return (
    <div style={divstyle}>
      <StyledBullseye />
    </div>
  );
};

BullseyeIcon.propTypes = {
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
};

export default BullseyeIcon;
