export default function handleChange(board, row, col, value) {
    const updated = board.map((r) => [...r]);
    updated[row][col] = value;
    return updated;
  }
  