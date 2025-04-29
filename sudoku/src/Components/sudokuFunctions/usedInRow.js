export default function usedInRow(board, row, num) {
    return board.slice(row * 9, row * 9 + 9).includes(num);
  }
  