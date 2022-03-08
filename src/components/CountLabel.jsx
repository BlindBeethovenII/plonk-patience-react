import React from 'react';

import PropTypes from 'prop-types';

import styled from 'styled-components';

import { col2Left, row2Top } from '../shared/card-functions';
import { PLAYAREA_X_OFFSET } from '../shared/constants';

const Label = styled.h2`
  background: #761d38;
  color: white;
  font-size: 0.6em;
  margin: 0.6em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
`;

const CountLabel = (props) => {
  const {
    count,
    col,
    row,
  } = props;

  const left = col2Left(col) + PLAYAREA_X_OFFSET - 6;
  const top = row2Top(row) + 16;

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: '20px',
    height: '20px',
    textAlign: 'center',
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
