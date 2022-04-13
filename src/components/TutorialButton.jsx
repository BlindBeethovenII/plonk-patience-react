import React, { useContext } from 'react';

import styled from 'styled-components';

import {
  paragraphs,
  registerTutorials,
  registerFinaliseCallback,
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

const TutorialButton = () => {
  const { gameHasStarted, dealCards, resetGameState } = useContext(GameStateContext);

  // don't show if the game has started
  if (gameHasStarted) {
    return null;
  }

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
          annotate: {
            p: paragraphs(`
              This is the Deal Pile.
  
              At the start of each game, the 104 cards of two decks of cards are shuffled and placed face down on this Deal Pile.

              Clicking on the Deal Pile deals the cards (the tutorial will do this later).
            `),
          },
          annotateSkip: { trans: 'Okay' },
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
          annotate: {
            p: paragraphs(`
              Each pile can optionally show a count label, to indicate how many cards are in that pile.
            `),
          },
          annotateSkip: { trans: 'Okay' },
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
          annotateRight: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              Here is the Show Count Labels configuration option.
  
              The game is a little harder if the Count Labels are not shown.
  
              Note: The configuration options that you set are stored in the browser local storage,
              so, if you play the game again using the same browser, your previous configuration options are remembered.
            `),
          },
          annotateSkip: { trans: 'Okay' },
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
          annotate: {
            p: paragraphs(`
              Plonk! has two sets of build piles.
  
              There are 4 build up piles.  These build up from Aces to Kings, one pile for each suit.
            `),
          },
          annotateSkip: { trans: 'Okay' },
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
          annotate: {
            p: paragraphs(`
              And there are 4 build down piles.  These build down from Kings to Aces, pile one for each suit.
  
              You have completed a game of Plonk! if all build up and build down piles contain 13 cards.
            `),
          },
          annotateSkip: { trans: 'Okay' },
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
          annotate: {
            p: paragraphs(`
              The cards are now dealing.  The first card goes to the Plonk! pile.
            `),
          },
          annotateSkip: { trans: 'Okay' },
          additionalBeforeHandler: dealCards,
          activeWhen: [
            {
              compare: 'checkpointComplete',
              checkpoint: 'plonk_playareadown',
            },
          ],
        },
        {
          key: 'dealspeed',
          highlight: '#deal_speed_slider',
          highlightBack: '#fff',
          annotateRight: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              The speed of the deal is set by this configuration slider.
              
              A slow speed allows you to consider the cards dealt into each play pile.

              You can hide the tutorial now, if you wish, and change the deal speed, then return to the tutorial.
            `),
          },
          annotateSkip: { trans: 'Okay' },
          activeWhen: [
            {
              compare: 'checkpointComplete',
              checkpoint: 'plonk_plonkpile',
            },
          ],
        },
        {
          key: 'playpile1',
          highlight: '#PLAY_PILE_1',
          highlightBack: '#fff',
          annotateBottom: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              There are 12 play piles, each corresponds to a card number, or in the case of the first play pile, two card numbers.

              This is the first play pile, which corresponds to an Ace or a Two.
            `),
          },
          annotateSkip: { trans: 'Okay' },
          activeWhen: [
            {
              compare: 'checkpointComplete',
              checkpoint: 'plonk_dealspeed',
            },
          ],
        },
        {
          key: 'playpile2',
          highlight: '#PLAY_PILE_2',
          highlightBack: '#fff',
          annotateBottom: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              This play pile corresponds to a Three.
            `),
          },
          annotateSkip: { trans: 'Okay' },
          activeWhen: [
            {
              compare: 'checkpointComplete',
              checkpoint: 'plonk_playpile1',
            },
          ],
        },
        {
          key: 'playpile3',
          highlight: '#PLAY_PILE_3',
          highlightBack: '#fff',
          annotateBottom: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              This play pile corresponds to a Four.
            `),
          },
          annotateSkip: { trans: 'Okay' },
          activeWhen: [
            {
              compare: 'checkpointComplete',
              checkpoint: 'plonk_playpile2',
            },
          ],
        },
        {
          key: 'playpile12',
          highlight: '#PLAY_PILE_12',
          highlightBack: '#fff',
          annotateRight: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              And so on, up to the last play pile, which corresponds to a King.

              During the deal, if a card is dealt onto a play pile which corresponds to that cards number, then the card is moved to the Plonk! Pile.  
              
              The more cards on the Plonk! Pile at the end of the deal, the more chance you have of completing the game.
            `),
          },
          annotateSkip: { trans: 'Okay' },
          activeWhen: [
            {
              compare: 'checkpointComplete',
              checkpoint: 'plonk_playpile3',
            },
          ],
        },
        {
          key: 'playspeed',
          highlight: '#play_speed_slider',
          highlightBack: '#fff',
          annotateRight: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              Once the deal is complete, if a top card of a play pile can be used to build up or build down, then clicking on that card will build that card.

              Note: The speed of animation is now set by this configuration slider.

              If you can see a card that can build up or down, then you could Hide the tutorial and click on that card to see the build happen.
            `),
          },
          annotateSkip: { trans: 'Okay' },
          activeWhen: [
            {
              compare: 'checkpointComplete',
              checkpoint: 'plonk_playpile12',
            },
          ],
        },
        {
          key: 'buildupanddown',
          highlight: '#PLONK_PILE',
          highlightBack: '#fff',
          annotateRight: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              Note that if the card could build on both an up pile and an down pile (which happens a lot in the game) then clicking on the card will build on the up pile.  
              You can then click on the card on the up pile to move it to the down pile.

              A key part to completing a game is deciding when to move cards between the up and down piles.
            `),
          },
          annotateSkip: { trans: 'Okay' },
          activeWhen: [
            {
              compare: 'checkpointComplete',
              checkpoint: 'plonk_playspeed',
            },
          ],
        },
      ],
      complete: {
        on: 'checkpointReached',
        checkpoint: 'playTODO',
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

  // and reset the deck once tutorial is complete (Note: wanted to do this on tutorial exit - but current module doesn't allow that - see my notes)
  registerFinaliseCallback(() => resetGameState());

  return (
    <div style={divstyle}>
      <Button onClick={() => startTutorial('plonk')}>Start Tutorial</Button>
    </div>
  );
};

export default TutorialButton;
