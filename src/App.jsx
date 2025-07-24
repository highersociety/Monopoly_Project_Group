import React from 'react';
import { GameProvider } from './context/GameContext';
import Board from './components/Board';

const App = () => (

     <GameProvider>
    <div className="App">
      <h1>Monopoly Game</h1>
      <Board />
    </div>
  </GameProvider>
);

export default App;