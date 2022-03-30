/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';

import Checkbox from './Checkbox';

import { colToLeft, rowToTop } from '../shared/card-functions';
import { PLAYAREA_X_OFFSET } from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

const FileEmptyPilesCheckbox = () => {
  const { fillEmptyPiles, setFillEmptyPiles } = useContext(GameStateContext);

  const left = colToLeft(5, 0) + PLAYAREA_X_OFFSET + 24;
  const top = rowToTop(0) + 80;

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    fontSize: '0.8em',
  };

  const handleCheckboxChange = (event) => {
    setFillEmptyPiles(event.target.checked);
  };

  return (
    <div style={divstyle}>
      <label>
        <Checkbox
          checked={fillEmptyPiles}
          onChange={handleCheckboxChange}
        />
        <span style={{ marginLeft: 8 }}>Fill Empty Piles</span>
      </label>
    </div>
  );
};

export default FileEmptyPilesCheckbox;
