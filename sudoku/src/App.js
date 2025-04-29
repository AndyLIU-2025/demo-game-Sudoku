// App.js
import React, { useState } from 'react';
import SudokuBoard from './Components/SudokuBoard';
import './App.css';

function App() {
  const [mode, setMode] = useState('input'); // 'input' or 'random'

  const toggleMode = () => {
    setMode((prev) => (prev === 'input' ? 'random' : 'input'));
  };

  return (
    <div className="app-container">
      <h1>Sudoku Solver</h1>
      <div className="controls">
        <button onClick={toggleMode}>
          Switch to {mode === 'input' ? 'Random Mode' : 'Input Mode'}
        </button>
      </div>
      <SudokuBoard mode={mode} />
    </div>
  );
}

export default App;
