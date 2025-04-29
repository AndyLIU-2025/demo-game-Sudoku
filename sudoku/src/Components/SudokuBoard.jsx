import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import '../styles/SudokuBoard.css';
import generateRandomPuzzle from './sudokuFunctions/generateRandomPuzzle';
import solveSudoku from './sudokuFunctions/solveSudoku';
import Conflicts from './sudokuFunctions/Conflicts';

function SudokuBoard({ mode }) {
  const emptyBoard = Array(9).fill(0).map(() => Array(9).fill(0));
  const [board, setBoard] = useState(emptyBoard);
  const [givenCells, setGivenCells] = useState(Array(9).fill(0).map(() => Array(9).fill(false)));
  const [history, setHistory] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [pencilMarks, setPencilMarks] = useState(
    Array(9).fill(0).map(() => Array(9).fill(null).map(() => []))
  );
  const [randomPuzzleGenerated, setRandomPuzzleGenerated] = useState(false);

  useEffect(() => {
    if (mode === 'random' && !randomPuzzleGenerated) {
      const puzzle = generateRandomPuzzle();
      setBoard(puzzle);
      setGivenCells(puzzle.map(row => row.map(cell => cell !== 0)));
      setRandomPuzzleGenerated(true);  // Mark that the puzzle has been generated
    } else if (mode === 'input') {
      setBoard(emptyBoard);
      setGivenCells(Array(9).fill(0).map(() => Array(9).fill(false)));
      setRandomPuzzleGenerated(false);  // Reset the random puzzle state
    }
    setHistory([]);
    setConflicts([]);
    setPencilMarks(Array(9).fill(0).map(() => Array(9).fill(null).map(() => [])));
  }, [mode, randomPuzzleGenerated, emptyBoard]);  // Include emptyBoard in the dependency array
  

  const handleChange = (row, col, value) => {
    const newBoard = board.map(r => [...r]);
    setHistory([...history, board]);
    newBoard[row][col] = value;
    setBoard(newBoard);
    setConflicts(Conflicts(newBoard));
  };

  const handlePencilMark = (row, col, value) => {
    const marks = [...pencilMarks];
    const cellMarks = marks[row][col];
    if (cellMarks.includes(value)) {
      marks[row][col] = cellMarks.filter(v => v !== value);
    } else {
      marks[row][col] = [...cellMarks, value];
    }
    setPencilMarks(marks);
  };

  const handleClear = () => {
    setBoard(emptyBoard);
    setGivenCells(Array(9).fill(0).map(() => Array(9).fill(false)));
    setHistory([]);
    setConflicts([]);
    setPencilMarks(Array(9).fill(0).map(() => Array(9).fill(null).map(() => [])));
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const prev = history.pop();
      setBoard(prev);
      setHistory([...history]);
    }
  };

  const handleSolve = () => {
    const flatBoard = board.flat();
    if (solveSudoku(flatBoard)) {
      const solved = [];
      for (let i = 0; i < 9; i++) {
        solved.push(flatBoard.slice(i * 9, (i + 1) * 9));
      }
      setBoard(solved);
      setConflicts([]);
    } else {
      alert("This puzzle is unsolvable.");
    }
  };

  return (
    <div className="board-wrapper">
      <div className="sudoku-board">
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              value={value}
              given={givenCells[rowIndex][colIndex]}
              onChange={handleChange}
              onPencil={handlePencilMark}
              conflicts={conflicts.some(([r, c]) => r === rowIndex && c === colIndex)}
              pencilMarks={pencilMarks[rowIndex][colIndex]}
            />
          ))
        )}
      </div>
      <div className="board-controls">
        <button onClick={handleSolve}>Solve Sudoku</button>
        <button onClick={handleClear}>Clear Board</button>
        <button onClick={handleUndo}>Undo</button>
      </div>
    </div>
  );
}

export default SudokuBoard;
