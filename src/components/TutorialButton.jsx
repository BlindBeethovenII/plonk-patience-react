import React, { useContext } from 'react';

import styled from 'styled-components';

import {
  paragraphs,
  registerTutorials,
  startTutorial,
} from 'react-interactive-tutorials-cont';

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
    title: { trans: 'Plonk! Tutorial' },
    steps: [
      {
        key: 'intro',
        announce: {
          p: paragraphs(`
            Welcome to Plonk!

            Plonk! is a two card patience for a single player.
            You will need both skill and luck to complete a game.
      
            It is a difficult patience to complete.
            You will be doing well if you complete the game 1 go in every 10 goes.
          `),
        },
        announceDismiss: { trans: 'Do Tell Me More' },
        activeWhen: [],
      },
      {
        key: 'dealpile',
        highlight: '#DEAL_PILE',
        highlightBack: '#fff',
        annotateBottom: '#DEAL_PILE',
        announce: {
          p: paragraphs(`
            This is the Deal Pile.

            At the start of each game, the 104 cards of two decks of cards are shuffled and placed face down on this Deal Pile.
          `),
        },
        announceDismiss: { trans: 'Okay' },
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
        annotateBottom: '#DEAL_PILE',
        announce: {
          p: paragraphs(`
            Each pile can optionally show a count label, to indicate how many cards are in that pile.
          `),
        },
        announceDismiss: { trans: 'Okay' },
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
        annotateBottom: '#show_count_labels',
        announce: {
          p: paragraphs(`
            Here is the Show Count Labels configuration option.

            The game is a little harder if the Count Labels are not shown.

            Note: The configuration options that you set are stored in the browser local storage,
            so, if you play the game again using the same browser, your previous configuration options are remembered.
          `),
        },
        announceDismiss: { trans: 'Okay' },
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
        annotateBottom: '#play_area_up',
        announce: {
          p: paragraphs(`
            Plonk! has two sets of build piles.

            There are 4 build up piles.  These build up from Aces to Kings, one pile for each suit.
          `),
        },
        announceDismiss: { trans: 'Okay' },
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
        annotateBottom: '#play_area_down',
        announce: {
          p: paragraphs(`
            And there are 4 build down piles.  These build down from Kings to Aces, pile one for each suit.

            You have completed a game of Plonk! if all build up and build down piles contain 13 cards.
          `),
        },
        announceDismiss: { trans: 'Okay' },
        activeWhen: [
          {
            compare: 'checkpointComplete',
            checkpoint: 'plonk_playareaup',
          },
        ],
      },
      {
        key: 'plonkpile',
        highlight: '#PLONK_PILE',
        highlightBack: '#fff',
        annotateBottom: '#PLONK_PILE',
        announce: {
          p: paragraphs(`
            This is the Plonk! pile.
          `),
        },
        announceDismiss: { trans: 'Okay' },
        activeWhen: [
          {
            compare: 'checkpointComplete',
            checkpoint: 'plonk_playareadown',
          },
        ],
      },
      {
        key: 'playarea',
        highlight: '#play_area',
        highlightBack: '#fff',
        annotateBottom: '#play_area',
        announce: {
          p: paragraphs(`
            There are 12 play piles in the central area.
          `),
        },
        announceDismiss: { trans: 'Okay' },
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
      checkpoint: 'playarea',
      title: { trans: 'Plonk! Tutorial Complete' },
      message: { p: 'Actually - still working on the tutorial - so it is not complete!' },
    },
  },
};

// the tutorial options
const tutorialOptions = {
  centralizeAnnouncements: true,
  translations: {
    complete: 'End Tutorial',
    hideHelp: 'Hide Tutorial',
    showHelp: 'Show Tutorial',
  },
};

// register my tutorial, with my options, and translate function and language to use
registerTutorials(TUTORIALS, tutorialOptions, (s) => s, 'en');

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
