import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';
import { PLAYAREA_X_OFFSET } from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

const Label = styled.h2`
  background: #761d38;
  color: white;
  font-size: 2em;
  margin: 0.6em;
  padding: 0.2em 1em 0.2em 0.2em;
  border: 1px solid #761d38;
  border-radius: 2px;
`;

const PercentageComplete = () => {
  const { percentageComplete } = useContext(GameStateContext);

  const left = colToLeft(6) + PLAYAREA_X_OFFSET;
  const top = rowToTop(0) + 16;

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: '120px',
    height: '20px',
    textAlign: 'left',
    zIndex: 5,
  };

  return (
    <div style={divstyle}>
      <Label>{`${percentageComplete}%`}</Label>
    </div>
  );
};

export default PercentageComplete;
