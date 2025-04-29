export default function findEmptyCell(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i * 9 + j] === 0) return [i, j];
      }
    }
    return null;
  }
  