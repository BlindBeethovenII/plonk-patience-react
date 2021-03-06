import React, { useContext, useState } from 'react';

import styled from 'styled-components';

import $ from 'jquery';

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

const RedButton = styled.button`
  background: #ff1d38;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
`;

const GreyButton = styled.button`
  background: grey;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
`;

// custom tutorial function to determine if 13th sort pile exists
const sortPile13Exists = () => {
  let result = false;
  const sortPile13 = $('#SORT_PILE_13');
  if (sortPile13.length) {
    result = true;
  }

  // console.log(`sortPile13Exists returning ${result} `);
  return result;
};

const TutorialButton = () => {
  const {
    gameHasStarted,
    dealCards,
    tutorialComplete,
    tutorialNowComplete,
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
          annotateIn: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              Welcome to Plonk!
  
              Plonk! is a two card patience for a single player.
              You will need both skill and luck to complete a game.
        
              It is a difficult patience to complete.
              You will be doing well if you complete 1 game in every 10 games.
            `),
          },
          annotateSkip: { trans: 'Do Tell Me More' },
          activeWhen: [],
        },
        {
          key: 'dealpile',
          highlight: '#DEAL_PILE',
          highlightBack: '#fff',
          annotateIn: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              This is the deal pile.
  
              At the start of each game, the 104 cards of two decks of cards are shuffled and placed face down on this deal pile.

              Clicking on the deal pile deals the cards (the tutorial will do this later).
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
              Each pile has a number showing how many cards are in it.
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
              You can turn off the pile count labels here, which makes the game a little harder.
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
              And there are 4 build down piles.  These build down from Kings to Aces, one pile for each suit.
  
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
          key: 'animationspeed',
          highlight: '#animtation_speed_select',
          highlightBack: '#fff',
          annotateIn: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              You can set the animation speed here.
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
          annotateIn: '#for_tutorial_lower',
          annotate: {
            p: paragraphs(`
              There are 12 play piles.  The first represents Ace and Two.
            `),
          },
          annotateSkip: { trans: 'Okay' },
          activeWhen: [
            {
              compare: 'checkpointComplete',
              checkpoint: 'plonk_animationspeed',
            },
          ],
        },
        {
          key: 'playpile2',
          highlight: '#PLAY_PILE_2',
          highlightBack: '#fff',
          annotateIn: '#for_tutorial_lower',
          annotate: {
            p: paragraphs(`
            Then the next pile is for Three...
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
          annotateIn: '#for_tutorial_lower',
          annotate: {
            p: paragraphs(`
            ... then Four...
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
              ...all the way up to King on the 12th pile.

              During the deal, if a card gets dealt onto its matching play pile, it moves straight to the Plonk! pile.  
              
              The more cards on the Plonk! pile at the end of the deal, the more chance you have of completing the game.
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
          key: 'buildupanddown',
          highlight: '#PLONK_PILE',
          highlightBack: '#fff',
          annotateIn: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              If the top card of a play pile can be built up or down, pressing it will move it to an up or down build pile.

              You can also move cards between up and down build piles by pressing them.
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
          key: 'plonkclick',
          highlight: '#PLONK_PILE',
          highlightBack: '#fff',
          annotateIn: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              Each card in the Plonk! pile allows you to sort the play pile that corresponds to that card's number.
              
              Try it now by pressing the Plonk! pile.
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
          key: 'sortpileswait',
          highlight: '#PLONK_PILE',
          highlightBack: '#fff',
          annotateIn: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              The tutorial is waiting for you to click on the Plonk! pile.

              Note: The deal must be complete before your can use the Plonk! pile.
            `),
          },
          annotateSkip: { trans: 'Okay' },
          activeWhen: [
            {
              compare: 'checkpointComplete',
              checkpoint: 'plonk_plonkclick',
            },
            {
              compare: 'custom',
              custom: () => !sortPile13Exists(),
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
              This is the sort area.  If a card can be built up or down, pressing it will move it to an up or down build pile.
              
              If a card can't be built, pressing it will move it to the far left of the sort area. Cards on the left of the sort area can be pressed to move them back to the right.
            `),
          },
          annotateSkip: { trans: 'Okay' },
          activeWhen: [
            {
              compare: 'checkpointComplete',
              checkpoint: 'plonk_plonkclick',
            },
            {
              compare: 'custom',
              custom: sortPile13Exists,
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
              Once you are happy with the sort order for the current pile then a click on the Plonk! pile will put the current pile back and open the next pile to sort.

              The cards from the sort area are put back into the play pile left to right.
              So the left-most card will be at the bottom of the play pile, and the right-most card at the top.
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
          key: 'sortedicons',
          highlight: '#show_sorted_icons',
          highlightBack: '#fff',
          annotateIn: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              You can turn off the indicators showing which piles you have already sorted here, which makes the game a little harder.
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
        {
          key: 'fillemptypiles',
          highlight: '#fill_empty_piles',
          highlightBack: '#fff',
          annotateIn: '#for_tutorial',
          annotate: {
            p: paragraphs(`
              If a play pile becomes empty then clicking on another card in the play area will move that card onto that empty pile.
              
              This is the option to enable/disable this.  The game is harder if empty play piles cannot be filled.
            `),
          },
          annotateSkip: { trans: 'Okay' },
          activeWhen: [
            {
              compare: 'checkpointComplete',
              checkpoint: 'plonk_sortedicons',
            },
          ],
        },
        {
          key: 'percentagecomplete',
          annotateIn: '#for_tutorial',
          highlight: '#percentage_complete',
          highlightBack: '#fff',
          annotate: {
            p: paragraphs(`
              Below the play area, you can see how close you are to winning.
              
              Plonk! also keeps track of how many times you win, along with your average completion percentage.
            `),
          },
          annotateSkip: { trans: 'Okay' },
          activeWhen: [
            {
              compare: 'checkpointComplete',
              checkpoint: 'plonk_fillemptypiles',
            },
          ],
        },
      ],
      complete: {
        on: 'checkpointReached',
        checkpoint: 'percentagecomplete',
        title: { trans: 'Plonk! Tutorial Complete' },
        message: { p: 'Good Luck!' },
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
      annotateSkip: ' ',
    },
  };

  // register my tutorial, with my options, and translate function and language to use
  if (!tutorialRegistered) {
    registerTutorials(TUTORIALS, tutorialOptions, (s) => s, 'en');
    logIfDevEnv('registerTutorials called');

    // and reset the deck once tutorial is complete (Note: wanted to do this on tutorial exit - but current module doesn't allow that - see my notes)
    registerFinaliseCallback(() => tutorialNowComplete());

    // remember we have registered the tutorial
    setTutorialRegistered(true);
  }

  // don't show if the game has started
  if (gameHasStarted) {
    return null;
  }

  // change the button based on if the tutorial is complete
  const TheButton = tutorialComplete ? GreyButton : RedButton;
  const buttonText = tutorialComplete ? 'Show Tutorial' : 'Start Tutorial';

  return (
    <div style={divstyle}>
      <TheButton tutorialComplete={tutorialComplete} onClick={() => startTutorial('plonk')}>{buttonText}</TheButton>
    </div>
  );
};

export default TutorialButton;
