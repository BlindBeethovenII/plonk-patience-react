import React, { useContext } from 'react';

import styled from 'styled-components';

import { col2Left, row2Top } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const left = col2Left(2) + 32;
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

const DealButton = () => {
  const { dealCards } = useContext(GameStateContext);

  const dealCardAndAction = () => {
    dealCards();
  };

  return (
    <div style={divstyle}>
      <Button onClick={dealCardAndAction}>Deal</Button>
    </div>
  );
};

export default DealButton;
