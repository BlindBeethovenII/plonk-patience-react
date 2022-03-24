import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(11, 4) + 12;
const top = rowToTop(4);

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

const SaveScoreButton = () => {
  const { gameInEndGame, setScoreHistory } = useContext(GameStateContext);

  // nothing to show if we are not in the end game
  if (!gameInEndGame) {
    return null;
  }

  return (
    <div style={divstyle}>
      <Button onClick={setScoreHistory}>Save Score to History</Button>
    </div>
  );
};

export default SaveScoreButton;
