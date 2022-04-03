import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import Card from './Card';
import CountLabel from './CountLabel';
import TickIcon from './TickIcon';
import SortedIcon from './SortedIcon';

import {
  pileIdToColRow,
  isSortPileId,
  isUpPileId,
  isDownPileId,
} from '../shared/pile-functions';

import GameStateContext from '../contexts/GameStateContext';

const Pile = (props) => {
  const {
    pileId,
    cards,
    showTick,
  } = props;

  const { showCountLabels, isSortedPlayPile, showSortedIcons } = useContext(GameStateContext);

  // look up our col/row
  const { col, row } = pileIdToColRow(pileId);

  if (!cards?.length) {
    // if there are no cards then nothing to show
    return null;
  }

  const card = cards[0];

  // we now return an array of cards (at most 2 for now) - so the 2nd card is visible as the top card animates into position; and a count label (if we in debug mode)
  const componentsToShow = [];

  const card2 = cards[1];
  if (card2) {
    componentsToShow.push(<Card key={card2.id} pileId={pileId} card={card2} underCard />);
  }

  // and now the top card
  componentsToShow.push(<Card key={card.id} pileId={pileId} card={card} />);

  // only show count label if we are not showing the 'complete' tick, and we are not on a sort pile
  if (showCountLabels && !showTick && !isSortPileId(pileId) && !isUpPileId(pileId) && !isDownPileId(pileId)) {
    componentsToShow.push(<CountLabel key={`count_label_${card.id}`} count={cards.length} col={col} row={row} />);
  }

  if (showTick) {
    componentsToShow.push(<TickIcon key={`tick_icon_${card.id}`} col={col} row={row} />);
  }

  if (isSortedPlayPile(pileId) && showSortedIcons) {
    componentsToShow.push(<SortedIcon key={`sorted_icon_${card.id}`} col={col} row={row} />);
  }

  // and return them
  return (
    <div id={pileId}>
      {componentsToShow}
    </div>
  );
};

Pile.propTypes = {
  pileId: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    suit: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  })).isRequired,
  showTick: PropTypes.bool,
};

Pile.defaultProps = {
  showTick: false,
};

export default Pile;
