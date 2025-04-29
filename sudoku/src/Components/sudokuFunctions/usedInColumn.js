export default function usedInColumn(board, col, num) {
    for (let i = 0; i < 9; i++) {
      if (board[i * 9 + col] === num) return true;
    }
    return false;
  }
  