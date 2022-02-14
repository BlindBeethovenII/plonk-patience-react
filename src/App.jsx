import React from 'react';

import PlayArea from './components/PlayArea';
import GitInfo from './components/GitInfo';
import Piles from './components/Piles';

import DealButton from './components/DealButton';

// import MainMenuModal from './components/MainMenuModal';

import { GameStateContextProvider } from './contexts/GameStateContext';

const App = () => (
  <GameStateContextProvider>
    <PlayArea />
    <GitInfo />
    <Piles />
    <DealButton />
  </GameStateContextProvider>
);

export default App;
