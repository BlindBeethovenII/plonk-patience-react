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
        key: 'dealpilelabel',
        highlight: '#DEAL_PILE',
        highlightBack: '#fff',
        annotateAfter: '#DEAL_PILE',
        announce: paragraphs`
          Each pile can optionally show a count label, to indicate how many cards are in that pile.
        `,
        announceDismiss: 'Okay',
        activeWhen: [
          {
            compare: 'checkpointComplete',
            checkpoint: 'plonk_dealpile',
          },
        ],
      },
      {
        key: 'showcountlabelcheckbox',
        highlight: '#show_count_labels',
        highlightBack: '#fff',
        annotateAfter: '#show_count_labels',
        announce: paragraphs`
          Here is the Show Count Labels configuration option.

          The game is a little harder if the Count Labels are NOT shown.

          Note: Configurations are stored in the browser local storage,
          so these are remembered if you play the game again using the same browser.
        `,
        announceDismiss: 'Okay',
        activeWhen: [
          {
            compare: 'checkpointComplete',
            checkpoint: 'plonk_dealpilelabel',
          },
        ],
      },
      {
        key: 'playareaup',
        highlight: '#play_area_up',
        highlightBack: '#fff',
        annotateAfter: '#play_area_up',
        announce: paragraphs`
          Plonk! has two sets of build piles.

          There are 4 build up piles.  These build up from Aces to Kings, one pile for each suit.
        `,
        announceDismiss: 'Okay',
        activeWhen: [
          {
            compare: 'checkpointComplete',
            checkpoint: 'plonk_showcountlabelcheckbox',
          },
        ],
      },
      {
        key: 'playareadown',
        highlight: '#play_area_down',
        highlightBack: '#fff',
        annotateAfter: '#play_area_down',
        announce: paragraphs`
          And there are 4 build down piles.  These build down from Kings to Aces, pile one for each suit.
        `,
        announceDismiss: 'Okay',
        activeWhen: [
          {
            compare: 'checkpointComplete',
            checkpoint: 'plonk_playareaup',
          },
        ],
      },
    ],
    complete: {
      on: 'checkpointReached',
      checkpoint: 'TODO',
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
