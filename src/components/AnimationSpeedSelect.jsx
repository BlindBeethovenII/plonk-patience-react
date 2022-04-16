import React, { useContext, useState } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import {
  ANIMATION_SPEED_SLOW,
  ANIMATION_SPEED_REGULAR,
  ANIMATION_SPEED_FAST,
} from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

const DropDownContainer = styled('div')`
  width: 5em;
  margin: 0 auto;
`;

const DropDownHeader = styled('div')`
  position: relative;
  top: -10px;
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1rem;
  background: lightgrey;
  cursor: pointer;
`;

const DropDownListContainer = styled('div')`
  position: relative;
  top: -100px;
`;

const DropDownList = styled('ul')`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.2em;
  }
`;

const ListItem = styled('li')`
  list-style: none;
  margin-bottom: 0.2em;
  cursor: pointer;
`;

const Title = styled('p')`
  font-size: 1rem;
`;

const left = colToLeft(9, 2) + 52;

const top = rowToTop(1) + 26;

const topDivStyle = {
  position: 'absolute',
  left,
  top,
};

const AnimationSpeedSelect = () => {
  const { animationSpeed, setAnimationSpeed } = useContext(GameStateContext);

  // animationSpeed is an int: 0 for Slow, 1 for Regular, 2 for Fast, 3 for Instant

  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setAnimationSpeed(value);
    setIsOpen(false);
  };

  // convert animation speed to option string
  let selectedOption = 'Instant';
  if (animationSpeed === ANIMATION_SPEED_FAST) {
    selectedOption = 'Fast';
  } else if (animationSpeed === ANIMATION_SPEED_REGULAR) {
    selectedOption = 'Regular';
  } else if (animationSpeed === ANIMATION_SPEED_SLOW) {
    selectedOption = 'Slow';
  }

  return (
    <div id="animtation_speed_select" style={topDivStyle}>
      <Title>Animation Speed</Title>
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          {selectedOption}
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              <ListItem onClick={onOptionClicked(0)} key="animation_speed_option_slow">Slow</ListItem>
              <ListItem onClick={onOptionClicked(1)} key="animation_speed_option_regular">Regular</ListItem>
              <ListItem onClick={onOptionClicked(2)} key="animation_speed_option_fast">Fast</ListItem>
              <ListItem onClick={onOptionClicked(3)} key="animation_speed_option_instant">Instant</ListItem>
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </div>
  );
};

export default AnimationSpeedSelect;
