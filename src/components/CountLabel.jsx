import React from 'react';

import PropTypes from 'prop-types';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';
import { PLAYAREA_X_OFFSET } from '../shared/constants';

const Label = styled.h2`
  background: rgb(85,107,47);
  color: white;
  font-size: 0.6em;
  margin: 0.6em;
  padding: 0.2em 1em 0.2em 0.2em;
  border: 1px solid #761d38;
  border-radius: 2px;
  pointer-events: none;
`;

const CountLabel = (props) => {
  const {
    count,
    col,
    row,
  } = props;

  const left = colToLeft(col, row) + PLAYAREA_X_OFFSET - 4;
  const top = rowToTop(row) + 16;

  // adjust the width for 1, 2, 3 digit numbers
  let width = 30;
  if (count > 99) {
    width = 36;
  } else if (count < 10) {
    width = 24;
  }

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: '20px',
    textAlign: 'left',
    pointerEvents: 'none',
    zIndex: 5,
  };

  return (
    <div style={divstyle}>
      <Label>{count}</Label>
    </div>
  );
};

CountLabel.propTypes = {
  count: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
};

export default CountLabel;
