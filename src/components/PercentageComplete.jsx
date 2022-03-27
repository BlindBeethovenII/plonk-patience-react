import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';
import { PLAYAREA_X_OFFSET } from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

const Container = styled.div`
  height: 22px;
  width: 100%;
  position: relative;
`;

const BaseBox = styled.div`
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 3px;
  transition: width 0.5s ease-in-out;
`;

const Background = styled(BaseBox)`
  background: #ccced0;
  width: 100%;
`;

const Progress = styled(BaseBox)`
  background: #ffc069;
  width: ${({ percent }) => percent}%;
  text-align: center;
`;

// const Label = styled.div`
//   color: white;
//   font-size: 1em;
//   margin: 0.6em;
//   zIndex: 6,
// `;

const PercentageComplete = () => {
  const { percentageComplete } = useContext(GameStateContext);

  const left = colToLeft(0, 6) + PLAYAREA_X_OFFSET;
  const top = rowToTop(6) + 16;

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: '340px',
    height: '20px',
    textAlign: 'left',
    zIndex: 5,
  };

  return (
    <div style={divstyle}>
      <Container>
        <Background />
        <Progress percent={percentageComplete}>{`${percentageComplete}%`}</Progress>
      </Container>
    </div>
  );
};

export default PercentageComplete;
