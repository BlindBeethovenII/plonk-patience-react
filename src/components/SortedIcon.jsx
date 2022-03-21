import React from 'react';

import PropTypes from 'prop-types';

import styled from 'styled-components';
import { ArrowUnsorted } from '@styled-icons/typicons';

import { colToLeft, rowToTop } from '../shared/card-functions';
import { PLAYAREA_X_OFFSET } from '../shared/constants';

const StyledArrowUnsorted = styled(ArrowUnsorted)`
  color: rgb(85,107,47);
  font-weight: bold;
`;

const SortedIcon = (props) => {
  const {
    col,
    row,
  } = props;

  const left = colToLeft(col, row) + PLAYAREA_X_OFFSET + 41;
  const top = rowToTop(row) + 54;

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: '24px',
    height: '16px',
    pointerEvents: 'none',
  };

  return (
    <div style={divstyle}>
      <StyledArrowUnsorted />
    </div>
  );
};

SortedIcon.propTypes = {
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
};

export default SortedIcon;
