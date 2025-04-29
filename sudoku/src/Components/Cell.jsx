import React, { useState } from 'react';
import '../styles/Cell.css';

function Cell({
  row,
  col,
  value,
  given,
  onChange,
  onPencil,
  conflicts,
  pencilMarks
}) {
  const [inputMode, setInputMode] = useState('normal'); // 'normal' or 'pencil'

  const handleKeyDown = (e) => {
    const val = parseInt(e.key, 10);
    if (e.key === 'Backspace' || e.key === 'Delete') {
      onChange(row, col, 0);
    } else if (!isNaN(val) && val >= 1 && val <= 9) {
      if (inputMode === 'normal') {
        onChange(row, col, val);
      } else {
        onPencil(row, col, val);
      }
    }
  };

  const toggleMode = (e) => {
    e.preventDefault();
    setInputMode(prev => (prev === 'normal' ? 'pencil' : 'normal'));
  };

  return (
    <div
      className={`cell ${given ? 'given' : ''} ${conflicts ? 'conflict' : ''}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onContextMenu={toggleMode}
    >
      {value !== 0 ? (
        <span className="cell-value">{value}</span>
      ) : (
        <div className="pencil-marks">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <span
              key={num}
              className={`pencil-mark ${pencilMarks.includes(num) ? 'active' : ''}`}
            >
              {pencilMarks.includes(num) ? num : ''}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cell;
