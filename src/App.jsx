import React from 'react';

import { ModalProvider } from 'styled-react-modal';

import PlayArea from './components/PlayArea';
import GitInfo from './components/GitInfo';
import Piles from './components/Piles';
import DebugButton from './components/DebugButton';
import DealSpeedSlider from './components/DealSpeedSlider';
import PlaySpeedSlider from './components/PlaySpeedSlider';
import SelectedPileFlash from './components/SelectedPileFlash';
import PercentageComplete from './components/PercentageComplete';
import ShowCountLabelsCheckbox from './components/ShowCountLabelsCheckbox';
import ShowSortedIconsCheckbox from './components/ShowSortedIconsCheckbox';
import FileEmptyPilesCheckbox from './components/FillEmptyPilesCheckbox';
import ScoreHistory from './components/ScoreHistory';
import SaveScoreButton from './components/SaveScoreButton';
import WinModal from './components/WinModal';
import RedealButton from './components/RedealButton';

import { GameStateContextProvider } from './contexts/GameStateContext';

const App = () => (
  <ModalProvider>
    <GameStateContextProvider>
      <PlayArea />
      <GitInfo />
      <Piles />
      <SelectedPileFlash />
      <DealSpeedSlider />
      <PlaySpeedSlider />
      <PercentageComplete />
      <ShowCountLabelsCheckbox />
      <ShowSortedIconsCheckbox />
      <FileEmptyPilesCheckbox />
      <ScoreHistory />
      <SaveScoreButton />
      <DebugButton />
      <WinModal />
      <RedealButton />
    </GameStateContextProvider>
  </ModalProvider>
);

export default App;
