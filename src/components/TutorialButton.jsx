import React, { useContext, useState } from 'react';

import styled from 'styled-components';

import {
  paragraphs,
  registerTutorials,
  registerFinaliseCallback,
  startTutorial,
} from 'react-interactive-tutorials-cont';

import { colToLeft, rowToTop } from '../shared/card-functions';

import logIfDevEnv from '../shared/logIfDevEnv';

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
  const {
    gameHasStarted,
    dealCards,
    resetGameState,
  } = useContext(GameStateContext);

  // we only want to register the tutorial once
  // and we have to do it in here, so we can use GameStateContext functions in the tutorial steps
  const [tutorialRegistered, setTutorialRegistered] = useState(false);

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
          annotateIn: '#for_tutorial',
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
          annotateIn: '#for_tutorial',
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
          annotateIn: '#for_tutorial',
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
          annotateIn: '#for_tutorial',
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
          annotateIn: '#for_tutorial',
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
          annotateIn: '#for_tutorial',
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
          annotateIn: '#for_tutorial',
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
          annotateIn: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              .

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
          annotateIn: '#for_tutorial',
          annotate: {
            p: paragraphs(`
            .

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
          annotateIn: '#for_tutorial',
          annotate: {
            p: paragraphs(`
            .

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
          annotateIn: '#for_tutorial',
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
          annotateIn: '#for_tutorial',
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
          annotateIn: '#for_tutorial',
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
        {
          key: 'plonkclick',
          highlight: '#PLONK_PILE',
          highlightBack: '#fff',
          annotateIn: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              Each card in the Plonk! Pile allows you to sort the play pile that corresponds to that card's number.
              
              It is your turn now.  Once the deal has completed, please hide the tutorial and click on the Plonk! Pile.  This should move a play pile to the sort area.

              When you've done that show the tutorial again, then click the Okay button.
            `),
          },
          annotateSkip: { trans: 'Okay' },
          activeWhen: [
            {
              compare: 'checkpointComplete',
              checkpoint: 'plonk_buildupanddown',
            },
          ],
        },
        {
          key: 'sortpiles',
          highlight: '#sort_area',
          highlightBack: '#fff',
          annotateIn: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              This is the sort area.
              
              If a card can be built up or down then a click on that card will do the build.
              
              Otherwise the card will be moved to the left, if it is on the right, or moved to the right, if it is on the left.  

              Another key part of the game is deciding the sort order of the cards that, you hope, will give you the best chance of completing the game.
            `),
          },
          annotateSkip: { trans: 'Okay' },
          activeWhen: [
            {
              compare: 'checkpointComplete',
              checkpoint: 'plonk_plonkclick',
            },
          ],
        },
        {
          key: 'sortpiles2',
          highlight: '#sort_area',
          highlightBack: '#fff',
          annotateIn: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              Once you are happy with the sort order for the current pile then a click on the Plonk! Pile will put that pile back and open the next pile to sort.
              
              The pile you are currently sorting will be slowly flashing in the play area.
            `),
          },
          annotateSkip: { trans: 'Okay' },
          activeWhen: [
            {
              compare: 'checkpointComplete',
              checkpoint: 'plonk_sortpiles',
            },
          ],
        },
        {
          key: 'sortedicon',
          highlight: '#show_sorted_icons',
          highlightBack: '#fff',
          annotateIn: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              There is an option to determine if a sorted pile has an icon to indicate that it is sorted.
              
              The game is slightly harder if the sorted icon is not shown on a sorted pile.
            `),
          },
          annotateSkip: { trans: 'Okay' },
          activeWhen: [
            {
              compare: 'checkpointComplete',
              checkpoint: 'plonk_sortpiles2',
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
  if (!tutorialRegistered) {
    registerTutorials(TUTORIALS, tutorialOptions, (s) => s, 'en');
    logIfDevEnv('registerTutorials called');

    // and reset the deck once tutorial is complete (Note: wanted to do this on tutorial exit - but current module doesn't allow that - see my notes)
    registerFinaliseCallback(() => resetGameState());

    // remember we have registered the tutorial
    setTutorialRegistered(true);
  }

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
