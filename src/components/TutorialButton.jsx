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
  plonk: {
    key: 'plonk',
    title: 'Plonk Tutorial',
    steps: [
      {
        key: 'intro',
        announce: paragraphs`
          Welcome to Plonk! 
          
          Plonk! is a two card patience for a single player. 
          It is fairly balanced between skill and luck.

          However it is a difficult patience to complete.
          You will be doing well if you complete the game 1 go in every 10 goes.
        `,
        announceDismiss: 'Do Tell Me More',
        activeWhen: [],
      },
      {
        key: 'dealpile',
        highlight: '#DEAL_PILE',
        highlightBack: '#fff',
        annotateAfter: '#DEAL_PILE',
        announce: paragraphs`
          This is the Deal Pile.
          
          At the start of each game, the 104 cards of two decks of cards are shuffled and placed face down on this Deal Pile.
        `,
        announceDismiss: 'Okay',
        activeWhen: [
          {
            compare: 'checkpointComplete',
            checkpoint: 'plonk_intro',
          },
        ],
      },
      {
        key: 'laststep',
        announce: paragraphs`
          Tutorial Last Step.
        `,
        announceDismiss: 'Okay',
        activeWhen: [
          {
            compare: 'checkpointComplete',
            checkpoint: 'plonk_plonkpile',
          },
        ],
      },
    ],
    complete: {
      on: 'checkpointReached',
      checkpoint: 'laststep',
      title: 'Plonk! Tutorial Complete',
      message: paragraphs`
        Good Luck
      `,
    },
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
      <Button onClick={() => startTutorial('plonk')}>Start Tutorial</Button>
    </div>
  );
};

export default TutorialButton;
