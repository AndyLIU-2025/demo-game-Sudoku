export default function generateRandomPuzzle() {
    const board = Array(9).fill(0).map(() => Array(9).fill(0));
    for (let i = 0; i < 9; i++) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      const num = Math.floor(Math.random() * 9) + 1;
      board[row][col] = num;
    }
    return board;
  }
  