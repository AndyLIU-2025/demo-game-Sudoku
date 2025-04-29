import isValidMove from "./isValidMove";

export default function findConflicts(board) {
  const conflicts = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const val = board[i][j];
      if (val !== 0) {
        board[i][j] = 0;
        if (!isValidMove(board.flat(), i, j, val)) {
          conflicts.push([i, j]);
        }
        board[i][j] = val;
      }
    }
  }
  return conflicts;
}
