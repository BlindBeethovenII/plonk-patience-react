import React, { useContext } from 'react';

import styled from 'styled-components';

import { col2Left, row2Top } from '../shared/card-functions';
import { PLAYAREA_X_OFFSET } from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

const left = col2Left(5) + PLAYAREA_X_OFFSET;
const top = row2Top(4) + 16;

const divstyle = {
  position: 'absolute',
  left: `${left}px`,
  top: `${top}px`,
  width: '40px',
  height: '40px',
};

const Button = styled.button`
  background: #761d38;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
`;

const CountLabel = () => {
  const { plonkPile } = useContext(GameStateContext);

  return (
    <div style={divstyle}>
      <Button>{plonkPile?.length}</Button>
    </div>
  );
};

export default CountLabel;
