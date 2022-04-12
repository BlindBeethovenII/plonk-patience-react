import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';
import { PLAYAREA_X_OFFSET } from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(5, 6) + PLAYAREA_X_OFFSET;
const top = rowToTop(6) - 16;

const Label = styled.p`
  background: #761d38;
  color: white;
  font-size: 0.7em;
  margin: 1em;
  padding: 0.2em 1em 0.2em 0.2em;
  border: 1px solid #761d38;
  border-radius: 2px;
  pointer-events: none;
`;

const ScoreHistory = () => {
  const { scoreHistory } = useContext(GameStateContext);

  // nothing to show if no score history yet
  if (!scoreHistory.length) {
    return null;
  }

  // count the number of wins
  const reducer = (accumulator, currentValue) => accumulator + (currentValue === 104 ? 1 : 0);
  const nWins = scoreHistory.reduce(reducer, 0);

  // and the number of plays
  const nPlays = scoreHistory.length;

  // the wins string
  const wins = `Won ${nWins} / ${nPlays} (${((nWins * 100) / nPlays).toFixed(0)}%)`;

  // and the average
  const reducer2 = (accumulator, currentValue) => accumulator + currentValue;
  const total = scoreHistory.reduce(reducer2, 0);

  // the average string
  const average = `Average Score ${((total * 100) / (scoreHistory.length * 104)).toFixed(0)}%`;

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    height: '16px',
    textAlign: 'left',
    pointerEvents: 'none',
    zIndex: 5,
  };

  return (
    <div id="score_history" style={divstyle}>
      <Label>
        {average}
        <br />
        {wins}
      </Label>
    </div>
  );
};

export default ScoreHistory;
