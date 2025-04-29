import usedInRow from "./usedInRow";
import usedInColumn from "./usedInColumn";
import usedInGrid from "./usedInGrid";

export default function isValidMove(board, row, col, num) {
  return (
    !usedInRow(board, row, num) &&
    !usedInColumn(board, col, num) &&
    !usedInGrid(board, row - (row % 3), col - (col % 3), num)
  );
}
