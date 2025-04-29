import findEmptyCell from "./findEmptyCell";
import isValidMove from "./isValidMove";

export default function solveSudoku(board) {
  const empty = findEmptyCell(board);
  if (!empty) return true;

  const [row, col] = empty;
  for (let num = 1; num <= 9; num++) {
    if (isValidMove(board, row, col, num)) {
      board[row * 9 + col] = num;
      if (solveSudoku(board)) return true;
      board[row * 9 + col] = 0;
    }
  }
  return false;
}
