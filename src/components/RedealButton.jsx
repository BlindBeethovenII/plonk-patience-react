import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(11, 4);
const top = rowToTop(4);

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
const RedealButton = () => {
  const { redealCards, showRedealButton } = useContext(GameStateContext);

  // don't show the re-deal button until state says we should
  if (!showRedealButton) {
    return null;
  }

  return (
    <div style={divstyle}>
      <Button onClick={redealCards}>Redeal</Button>
    </div>
  );
};

export default RedealButton;
