export default function usedInGrid(board, startRow, startCol, num) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[(startRow + i) * 9 + (startCol + j)] === num) return true;
      }
    }
    return false;
  }
  