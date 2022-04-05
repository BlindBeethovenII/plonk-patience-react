import React from 'react';

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
} from '../shared/constants';

import BlankSpace from './BlankSpace';

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
};

const PlayArea = () => (
  <div>
    <svg style={playbackgroundsvg}>
      <rect style={playbackgroundrect} />
    </svg>
    <div id="play_area">
      <img src={PlayAreaImage} alt="playarea" style={playarea} />
      <BlankSpace key="blankspace_1_0" col={1} row={0} />
      <BlankSpace key="blankspace_1_1" col={1} row={1} />
      <BlankSpace key="blankspace_1_2" col={1} row={2} />
      <BlankSpace key="blankspace_1_3" col={1} row={3} />
      <BlankSpace key="blankspace_2_0" col={2} row={0} />
      <BlankSpace key="blankspace_2_1" col={2} row={1} />
      <BlankSpace key="blankspace_2_2" col={2} row={2} />
      <BlankSpace key="blankspace_2_3" col={2} row={3} />
      <BlankSpace key="blankspace_3_0" col={3} row={0} />
      <BlankSpace key="blankspace_3_1" col={3} row={1} />
      <BlankSpace key="blankspace_3_2" col={3} row={2} />
      <BlankSpace key="blankspace_3_3" col={3} row={3} />
    </div>
    <div id="play_area_up">
      <img src={PlayAreaImage} alt="playareaup" style={playareaup} />
      <BlankSpace key="blankspace_0_0" col={0} row={0} suit={SUIT_SPADES} />
      <BlankSpace key="blankspace_0_1" col={0} row={1} suit={SUIT_HEARTS} />
      <BlankSpace key="blankspace_0_2" col={0} row={2} suit={SUIT_DIAMONDS} />
      <BlankSpace key="blankspace_0_3" col={0} row={3} suit={SUIT_CLUBS} />
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
    <BlankSpace key="blankspace_0_4" col={0} row={4} />
    <BlankSpace key="blankspace_4_4" col={4} row={4} />
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
  </div>
);

export default PlayArea;
