import React, { useContext } from 'react';

import styled from 'styled-components';

import { col2Left, row2Top } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const left = col2Left(2) + 22;
const top = row2Top(3) + 16;

const divstyle = {
  position: 'absolute',
  left: `${left}px`,
  top: `${top}px`,
  width: '40px',
  height: '40px',
};

const Button = styled.button`
  background: #ff1d38;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
`;

const DebugButton = () => {
  const { isDebugMode } = useContext(GameStateContext);

  const doDebug = () => {
    console.log('No debug at the moment');
  };

  // don't show anything if not in debug mode
  if (!isDebugMode) {
    return null;
  }

  return (
    <div style={divstyle}>
      <Button onClick={doDebug}>Debug</Button>
    </div>
  );
};

export default DebugButton;
