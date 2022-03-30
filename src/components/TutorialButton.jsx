import React, { useContext } from 'react';

import styled from 'styled-components';

import {
  paragraphs,
  registerTutorials,
  startTutorial,
} from 'react-interactive-tutorials';

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

const TUTORIALS = {
  plonkTutorial: {
    key: 'plonkTutorial',
    title: 'Plonk Tutorial',
    steps: [
      {
        key: 'anywhere',
        announce: paragraphs`
          The tutorial will present itself as a series of modals with annotations and prompts on how
          to progress. This, in fact, is an announcement-style tutorial step.

          Feel free to hide / show this modal at any point to attempt to break the flow of the
          tutorial. You should not be able to force the tutorial into any situtation it cannot
          recover from.
        `,
        announceDismiss: "Okay, let's begin",
        activeWhen: [],
      },
    ],
  },
};

registerTutorials(TUTORIALS);

const TutorialButton = () => {
  const { gameHasStarted } = useContext(GameStateContext);

  // don't show if the game has started
  if (gameHasStarted) {
    return null;
  }

  return (
    <div style={divstyle}>
      <Button onClick={() => startTutorial('plonkTutorial')}>Start Tutorial</Button>
    </div>
  );
};

export default TutorialButton;
