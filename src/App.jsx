import React from 'react';

import PlayArea from './components/PlayArea';
import GitInfo from './components/GitInfo';
import Piles from './components/Piles';
import DealButton from './components/DealButton';
import DebugButton from './components/DebugButton';
import Slider from './components/Slider';

// import MainMenuModal from './components/MainMenuModal';

import { GameStateContextProvider } from './contexts/GameStateContext';

const App = () => (
  <GameStateContextProvider>
    <PlayArea />
    <GitInfo />
    <Piles />
    <DealButton />
    <Slider />
    <DebugButton />
  </GameStateContextProvider>
);

export default App;
