import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(12, 4) - 14;
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

// NO LONGER USED

const DealButton = () => {
  const { dealCards, gameHasStarted } = useContext(GameStateContext);

  // TODO this needs to be renamed when I change the approach to card dealing at the start of the game
  const dealCardAndAction = () => {
    dealCards();
  };

  // don't show the deal button if the game has started
  if (gameHasStarted) {
    return null;
  }

  return (
    <div style={divstyle}>
      <Button onClick={dealCardAndAction}>Deal</Button>
    </div>
  );
};

export default DealButton;
