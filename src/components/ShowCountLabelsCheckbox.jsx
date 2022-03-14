/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';

import Checkbox from './Checkbox';

import { colToLeft, rowToTop } from '../shared/card-functions';
import { PLAYAREA_X_OFFSET } from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

const ShowCountLabelsCheckbox = () => {
  const { showCountLabels, setShowCountLabels } = useContext(GameStateContext);

  const left = colToLeft(5, 0) + PLAYAREA_X_OFFSET + 24;
  const top = rowToTop(0) + 16;

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
  };

  const handleCheckboxChange = (event) => {
    // console.log(`handleCheckboxChange ${event.target.checked}`);
    setShowCountLabels(event.target.checked);
  };

  return (
    <div style={divstyle}>
      <label>
        <Checkbox
          checked={showCountLabels}
          onChange={handleCheckboxChange}
        />
        <span style={{ marginLeft: 8 }}>Show Count Labels</span>
      </label>
    </div>
  );
};

export default ShowCountLabelsCheckbox;
