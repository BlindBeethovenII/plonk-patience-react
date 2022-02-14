import React from 'react';

import PlayArea from './components/PlayArea';
import GitInfo from './components/GitInfo';
import Piles from './components/Piles';
import DealButton from './components/DealButton';
import CountLabel from './components/CountLabel';

// import MainMenuModal from './components/MainMenuModal';

import { GameStateContextProvider } from './contexts/GameStateContext';

const App = () => (
  <GameStateContextProvider>
    <PlayArea />
    <GitInfo />
    <Piles />
    <DealButton />
    <CountLabel />
  </GameStateContextProvider>
);

export default App;
