/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';

import Checkbox from './Checkbox';

import { colToLeft, rowToTop } from '../shared/card-functions';
import { PLAYAREA_X_OFFSET } from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

const ShowSortedIconsCheckbox = () => {
  const { showSortedIcons, setShowSortedIcons } = useContext(GameStateContext);

  const left = colToLeft(5, 0) + PLAYAREA_X_OFFSET + 24;
  const top = rowToTop(0) + 48;

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
  };

  const handleCheckboxChange = (event) => {
    // console.log(`handleCheckboxChange ${event.target.checked}`);
    setShowSortedIcons(event.target.checked);
  };

  return (
    <div style={divstyle}>
      <label>
        <Checkbox
          checked={showSortedIcons}
          onChange={handleCheckboxChange}
        />
        <span style={{ marginLeft: 8 }}>Show Sorted Icons</span>
      </label>
    </div>
  );
};

export default ShowSortedIconsCheckbox;
