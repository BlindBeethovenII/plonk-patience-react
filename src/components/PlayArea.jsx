import React, { useContext } from 'react';

import styled from 'styled-components';

import PlayAreaImage from '../images/playarea.png';
import BorderTopLeftImage from '../images/borders/topleft.png';
import BorderTopImage from '../images/borders/top.png';
import BorderLeftImage from '../images/borders/left.png';
import BorderBottomLeftImage from '../images/borders/bottomleft.png';
import BorderBottomImage from '../images/borders/bottom.png';
import BorderTopRightImage from '../images/borders/topright.png';
import BorderBottomRightImage from '../images/borders/bottomright.png';
import BorderRightImage from '../images/borders/right.png';

import {
  PLAYAREA_X_OFFSET,
  UP_DOWN_GAP,
  CARD_HEIGHT,
  CARD_WIDTH,
  SUIT_SPADES,
  SUIT_HEARTS,
  SUIT_DIAMONDS,
  SUIT_CLUBS,
  PILE_ID_DEAL_PILE,
  PILE_ID_PLONK_PILE,
  PILE_ID_PLAY_PILE_1,
  PILE_ID_PLAY_PILE_2,
  PILE_ID_PLAY_PILE_3,
  PILE_ID_PLAY_PILE_4,
  PILE_ID_PLAY_PILE_5,
  PILE_ID_PLAY_PILE_6,
  PILE_ID_PLAY_PILE_7,
  PILE_ID_PLAY_PILE_8,
  PILE_ID_PLAY_PILE_9,
  PILE_ID_PLAY_PILE_10,
  PILE_ID_PLAY_PILE_11,
  PILE_ID_PLAY_PILE_12,
  PILE_ID_UP_PILE_S,
  PILE_ID_UP_PILE_H,
  PILE_ID_UP_PILE_D,
  PILE_ID_UP_PILE_C,
  PILE_ID_DOWN_PILE_S,
  PILE_ID_DOWN_PILE_H,
  PILE_ID_DOWN_PILE_D,
  PILE_ID_DOWN_PILE_C,
  PILE_ID_SORT_PILE_1,
  PILE_ID_SORT_PILE_2,
  PILE_ID_SORT_PILE_3,
  PILE_ID_SORT_PILE_4,
  PILE_ID_SORT_PILE_5,
  PILE_ID_SORT_PILE_6,
  PILE_ID_SORT_PILE_7,
  PILE_ID_SORT_PILE_8,
  PILE_ID_SORT_PILE_9,
  PILE_ID_SORT_PILE_10,
  PILE_ID_SORT_PILE_11,
  PILE_ID_SORT_PILE_12,
  PILE_ID_SORT_PILE_13,
} from '../shared/constants';

import BlankSpace from './BlankSpace';

import GameStateContext from '../contexts/GameStateContext';
import Pile from './Pile';

const bordertopleft = {
  position: 'absolute',
  top: '4px',
  left: '8px',
};

const bordertop = {
  position: 'absolute',
  top: '4px',
  left: '14px',
  width: '904px',
  height: '10px',
};

const borderleft = {
  position: 'absolute',
  top: '14px',
  left: '8px',
  width: '10px',
  height: '602px',
};

const borderbottomleft = {
  position: 'absolute',
  top: '616px',
  left: '8px',
};

const borderbottom = {
  position: 'absolute',
  top: '616px',
  left: '14px',
  width: '904px',
  height: '10px',
};

const bordertopright = {
  position: 'absolute',
  top: '4px',
  left: '918px',
};

const borderbottomright = {
  position: 'absolute',
  top: '616px',
  left: '918px',
};

const borderright = {
  position: 'absolute',
  top: '14px',
  left: '918px',
  width: '10px',
  height: '602px',
};

const playbackgroundsvg = {
  position: 'absolute',
  top: '4px',
  left: '8px',
  width: '950px',
  height: '622px',
};

const playbackgroundrect = {
  width: '920px',
  height: '622px',
  fill: 'rgb(85,107,47)',
};

const playarea = {
  position: 'absolute',
  top: '0px',
  left: `${PLAYAREA_X_OFFSET}px`,
};

const playareaup = {
  position: 'absolute',
  top: '2px',
  left: `${PLAYAREA_X_OFFSET - UP_DOWN_GAP - 4}px`,
  width: `${UP_DOWN_GAP + 14}px`,
  height: `${5 * CARD_HEIGHT}px`,
};

const playareadown = {
  position: 'absolute',
  top: '2px',
  left: `${PLAYAREA_X_OFFSET + (5 * CARD_WIDTH) + 28}px`,
  width: `${UP_DOWN_GAP + 14}px`,
  height: `${5 * CARD_HEIGHT}px`,
};

const UpDownLabel = styled.h2`
  color: white;
  font-size: 1.5em;
  margin: 0.6em;
  padding: 0.2em 1em 0.2em 0.2em;
`;

const uplabelstyle = {
  position: 'absolute',
  left: `${PLAYAREA_X_OFFSET - UP_DOWN_GAP}px`,
  top: `${4 * CARD_HEIGHT + 6}px`,
  width: '30px',
  height: '20px',
  textAlign: 'left',
  zIndex: 5,
  fontSize: '0.9em',
  userSelect: 'none',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
};

const downlabelstyle = {
  position: 'absolute',
  left: `${PLAYAREA_X_OFFSET + (5 * CARD_WIDTH) + 16}px`,
  top: `${4 * CARD_HEIGHT + 6}px`,
  width: '30px',
  height: '20px',
  textAlign: 'left',
  zIndex: 5,
  fontSize: '0.9em',
  userSelect: 'none',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
};

const PlayArea = () => {
  const {
    dealPile,
    plonkPile,
    playPile1,
    playPile2,
    playPile3,
    playPile4,
    playPile5,
    playPile6,
    playPile7,
    playPile8,
    playPile9,
    playPile10,
    playPile11,
    playPile12,
    upPileSpades,
    upPileHearts,
    upPileDiamonds,
    upPileClubs,
    downPileSpades,
    downPileHearts,
    downPileDiamonds,
    downPileClubs,
    sortPile1,
    sortPile2,
    sortPile3,
    sortPile4,
    sortPile5,
    sortPile6,
    sortPile7,
    sortPile8,
    sortPile9,
    sortPile10,
    sortPile11,
    sortPile12,
    sortPile13,
  } = useContext(GameStateContext);

  const forTutorialDivstyle = {
    position: 'absolute',
    left: '290px',
    top: '40px',
    width: '380px',
    height: '300px',
    pointerEvents: 'none',
  };

  const forTutorialLowerDivstyle = {
    position: 'absolute',
    left: '290px',
    top: '140px',
    width: '380px',
    height: '300px',
    pointerEvents: 'none',
  };

  return (
    <div>
      <svg style={playbackgroundsvg}>
        <rect style={playbackgroundrect} />
      </svg>
      <div id="play_area">
        <img src={PlayAreaImage} alt="playarea" style={playarea} />
        <BlankSpace key="blankspace_1_0" col={1} row={0} shadowText="A 2" />
        <BlankSpace key="blankspace_1_1" col={1} row={1} shadowText="5" />
        <BlankSpace key="blankspace_1_2" col={1} row={2} shadowText="8" />
        <BlankSpace key="blankspace_1_3" col={1} row={3} shadowText="J" />
        <BlankSpace key="blankspace_2_0" col={2} row={0} shadowText="3" />
        <BlankSpace key="blankspace_2_1" col={2} row={1} shadowText="6" />
        <BlankSpace key="blankspace_2_2" col={2} row={2} shadowText="9" />
        <BlankSpace key="blankspace_2_3" col={2} row={3} shadowText="Q" />
        <BlankSpace key="blankspace_3_0" col={3} row={0} shadowText="4" />
        <BlankSpace key="blankspace_3_1" col={3} row={1} shadowText="7" />
        <BlankSpace key="blankspace_3_2" col={3} row={2} shadowText="10" />
        <BlankSpace key="blankspace_3_3" col={3} row={3} shadowText="K" />
        <Pile key="play_pile_1" pileId={PILE_ID_PLAY_PILE_1} cards={playPile1} />
        <Pile key="play_pile_2" pileId={PILE_ID_PLAY_PILE_2} cards={playPile2} />
        <Pile key="play_pile_3" pileId={PILE_ID_PLAY_PILE_3} cards={playPile3} />
        <Pile key="play_pile_4" pileId={PILE_ID_PLAY_PILE_4} cards={playPile4} />
        <Pile key="play_pile_5" pileId={PILE_ID_PLAY_PILE_5} cards={playPile5} />
        <Pile key="play_pile_6" pileId={PILE_ID_PLAY_PILE_6} cards={playPile6} />
        <Pile key="play_pile_7" pileId={PILE_ID_PLAY_PILE_7} cards={playPile7} />
        <Pile key="play_pile_8" pileId={PILE_ID_PLAY_PILE_8} cards={playPile8} />
        <Pile key="play_pile_9" pileId={PILE_ID_PLAY_PILE_9} cards={playPile9} />
        <Pile key="play_pile_10" pileId={PILE_ID_PLAY_PILE_10} cards={playPile10} />
        <Pile key="play_pile_11" pileId={PILE_ID_PLAY_PILE_11} cards={playPile11} />
        <Pile key="play_pile_12" pileId={PILE_ID_PLAY_PILE_12} cards={playPile12} />
      </div>
      <div id="play_area_up">
        <img src={PlayAreaImage} alt="playareaup" style={playareaup} />
        <BlankSpace key="blankspace_0_0" col={0} row={0} suit={SUIT_SPADES} />
        <BlankSpace key="blankspace_0_1" col={0} row={1} suit={SUIT_HEARTS} />
        <BlankSpace key="blankspace_0_2" col={0} row={2} suit={SUIT_DIAMONDS} />
        <BlankSpace key="blankspace_0_3" col={0} row={3} suit={SUIT_CLUBS} />
        <Pile key="up_pile_s" pileId={PILE_ID_UP_PILE_S} cards={upPileSpades} showTick={upPileSpades.length === 13} />
        <Pile key="up_pile_h" pileId={PILE_ID_UP_PILE_H} cards={upPileHearts} showTick={upPileHearts.length === 13} />
        <Pile key="up_pile_d" pileId={PILE_ID_UP_PILE_D} cards={upPileDiamonds} showTick={upPileDiamonds.length === 13} />
        <Pile key="up_pile_c" pileId={PILE_ID_UP_PILE_C} cards={upPileClubs} showTick={upPileClubs.length === 13} />
        <div style={uplabelstyle}>
          <UpDownLabel>Up</UpDownLabel>
        </div>
      </div>
      <div id="play_area_down">
        <img src={PlayAreaImage} alt="playareadown" style={playareadown} />
        <BlankSpace key="blankspace_4_0" col={4} row={0} suit={SUIT_SPADES} />
        <BlankSpace key="blankspace_4_1" col={4} row={1} suit={SUIT_HEARTS} />
        <BlankSpace key="blankspace_4_2" col={4} row={2} suit={SUIT_DIAMONDS} />
        <BlankSpace key="blankspace_4_3" col={4} row={3} suit={SUIT_CLUBS} />
        <Pile key="down_pile_s" pileId={PILE_ID_DOWN_PILE_S} cards={downPileSpades} showTick={downPileSpades.length === 13} />
        <Pile key="down_pile_h" pileId={PILE_ID_DOWN_PILE_H} cards={downPileHearts} showTick={downPileHearts.length === 13} />
        <Pile key="down_pile_d" pileId={PILE_ID_DOWN_PILE_D} cards={downPileDiamonds} showTick={downPileDiamonds.length === 13} />
        <Pile key="down_pile_c" pileId={PILE_ID_DOWN_PILE_C} cards={downPileClubs} showTick={downPileClubs.length === 13} />
        <div style={downlabelstyle}>
          <UpDownLabel>Down</UpDownLabel>
        </div>
      </div>
      <img src={BorderTopLeftImage} alt="bordertopleft" style={bordertopleft} />
      <img src={BorderTopImage} alt="bordertop" style={bordertop} />
      <img src={BorderLeftImage} alt="borderleft" style={borderleft} />
      <img src={BorderBottomLeftImage} alt="borderbottomleft" style={borderbottomleft} />
      <img src={BorderBottomImage} alt="borderbottom" style={borderbottom} />
      <img src={BorderTopRightImage} alt="bordertopright" style={bordertopright} />
      <img src={BorderBottomRightImage} alt="borderbottomright" style={borderbottomright} />
      <img src={BorderRightImage} alt="borderright" style={borderright} />
      <div id="deal_area">
        <BlankSpace key="blankspace_0_4" col={0} row={4} />
        <Pile key="deal_pile" pileId={PILE_ID_DEAL_PILE} cards={dealPile} />
      </div>
      <div id="plonk_area">
        <BlankSpace key="blankspace_4_4" col={4} row={4} />
        <Pile key="plonk_pile" pileId={PILE_ID_PLONK_PILE} cards={plonkPile} />
      </div>
      <div id="sort_area">
        <BlankSpace key="blankspace_-4_5" col={-4} row={5} />
        <BlankSpace key="blankspace_-3_5" col={-3} row={5} />
        <BlankSpace key="blankspace_-2_5" col={-2} row={5} />
        <BlankSpace key="blankspace_-1_5" col={-1} row={5} />
        <BlankSpace key="blankspace_0_5" col={0} row={5} />
        <BlankSpace key="blankspace_1_5" col={1} row={5} />
        <BlankSpace key="blankspace_2_5" col={2} row={5} />
        <BlankSpace key="blankspace_3_5" col={3} row={5} />
        <BlankSpace key="blankspace_4_5" col={4} row={5} />
        <BlankSpace key="blankspace_5_5" col={5} row={5} />
        <BlankSpace key="blankspace_6_5" col={6} row={5} />
        <BlankSpace key="blankspace_7_5" col={7} row={5} />
        <BlankSpace key="blankspace_8_5" col={8} row={5} />
        <Pile key="sort_pile_1" pileId={PILE_ID_SORT_PILE_1} cards={sortPile1} />
        <Pile key="sort_pile_2" pileId={PILE_ID_SORT_PILE_2} cards={sortPile2} />
        <Pile key="sort_pile_3" pileId={PILE_ID_SORT_PILE_3} cards={sortPile3} />
        <Pile key="sort_pile_4" pileId={PILE_ID_SORT_PILE_4} cards={sortPile4} />
        <Pile key="sort_pile_5" pileId={PILE_ID_SORT_PILE_5} cards={sortPile5} />
        <Pile key="sort_pile_6" pileId={PILE_ID_SORT_PILE_6} cards={sortPile6} />
        <Pile key="sort_pile_7" pileId={PILE_ID_SORT_PILE_7} cards={sortPile7} />
        <Pile key="sort_pile_8" pileId={PILE_ID_SORT_PILE_8} cards={sortPile8} />
        <Pile key="sort_pile_9" pileId={PILE_ID_SORT_PILE_9} cards={sortPile9} />
        <Pile key="sort_pile_10" pileId={PILE_ID_SORT_PILE_10} cards={sortPile10} />
        <Pile key="sort_pile_11" pileId={PILE_ID_SORT_PILE_11} cards={sortPile11} />
        <Pile key="sort_pile_12" pileId={PILE_ID_SORT_PILE_12} cards={sortPile12} />
        <Pile key="sort_pile_13" pileId={PILE_ID_SORT_PILE_13} cards={sortPile13} />
      </div>
      <div id="for_tutorial" style={forTutorialDivstyle} />
      <div id="for_tutorial_lower" style={forTutorialLowerDivstyle} />
    </div>
  );
};

export default PlayArea;
