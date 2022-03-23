import React from 'react';

import PlayArea from './components/PlayArea';
import GitInfo from './components/GitInfo';
import Piles from './components/Piles';
import DealButton from './components/DealButton';
import DebugButton from './components/DebugButton';
import DealSpeedSlider from './components/DealSpeedSlider';
import PlaySpeedSlider from './components/PlaySpeedSlider';
import SelectedPileFlash from './components/SelectedPileFlash';
import PercentageComplete from './components/PercentageComplete';
import ShowCountLabelsCheckbox from './components/ShowCountLabelsCheckbox';
import ShowSortedIconsCheckbox from './components/ShowSortedIconsCheckbox';
import ScoreHistory from './components/ScoreHistory';
import SaveScoreButton from './components/SaveScoreButton';

// import MainMenuModal from './components/MainMenuModal';

import { GameStateContextProvider } from './contexts/GameStateContext';

const App = () => (
  <GameStateContextProvider>
    <PlayArea />
    <GitInfo />
    <Piles />
    <SelectedPileFlash />
    <DealButton />
    <DealSpeedSlider />
    <PlaySpeedSlider />
    <PercentageComplete />
    <ShowCountLabelsCheckbox />
    <ShowSortedIconsCheckbox />
    <ScoreHistory />
    <SaveScoreButton />
    <DebugButton />
  </GameStateContextProvider>
);

export default App;
