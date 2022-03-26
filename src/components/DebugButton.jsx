import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(10, 3) - 16;
const top = rowToTop(3) + 24;

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
  const { isDebugMode, setShowWin } = useContext(GameStateContext);

  const doDebug = () => {
    setShowWin(true);
  };

  // nothing to show if not in debug mode
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
