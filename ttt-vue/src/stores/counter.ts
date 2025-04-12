import { defineStore } from 'pinia'

const BOARD_WIDTH = 5
const BOARD_HEIGHT = 5
export const useGameStore = defineStore('gameStore', {
  state: () => ({
    mode: '' as string,
    player1: '' as string,
    player2: '' as string,

    board: [] as string[][],
    currentPlayer: 'X' as 'X' | 'O',
    gameOver: false,
    winner: '' as string,
    moveCount: 0,

    gridLeft: 1,
    gridTop: 1,
    gridWidth: 3,
    gridHeight: 3,
  }),

  getters: {
    gameMode: (state) => state.mode,

    getBoard(state) {
      return state.board
    },

    isWithinBoundsGrid: (state) => (x: number, y: number) => {
      const left = state.gridLeft;
      const right = left + state.gridWidth;
      const top = state.gridTop;
      const bottom =  top + state.gridHeight;
      return x >= left && x < right &&
             y >= top && y < bottom;
    }
  },

  actions: {
    setMode(selectedMode: string) {
      this.mode = selectedMode
    },

    setPlayers(player1: string, player2:string) {
      this.player1 = player1
      this.player2 = player2
    },

    startNewGame() {
      this.currentPlayer = 'X'
      this.gameOver = false
      this.winner = ''
      this.moveCount = 0
      this.gridLeft = 1
      this.gridTop = 1
      this.gridWidth = 3
      this.gridHeight = 3
      this.board = Array.from( { length: BOARD_WIDTH }, ()=>
        Array.from({ length: BOARD_HEIGHT }, () => 'Empty'))
    },

    makeMove(x: number, y: number) {
      if (this.gameOver) return
      if (this.board[x][y] !== 'Empty') return
      this.board[x][y] = this.currentPlayer
      this.checkForWin(x, y)
      this.moveCount++
      if (!this.gameOver) {
        this.currentPlayer = (this.currentPlayer === 'X') ? 'O' : 'X'
      }
    },

    checkForWin(x: number, y: number) {
      return null
    },

    movePiece(startX: number, startY: number, targetX: number, targetY: number) {
      if (this.gameOver ||
          this.board[startX][startY] !== this.currentPlayer ||
          this.board[targetX][targetY] !== 'Empty') return;

      this.board[targetX][targetY] = this.currentPlayer;
      this.board[startX][startY] = 'Empty';
      this.checkForWin(targetX, targetY);
      this.moveCount++;

      if (!this.gameOver) {
        this.currentPlayer = (this.currentPlayer === 'X') ? 'O' : 'X';
      }
    },

    moveGrid(direction: string) {
      if (this.gameOver) return
      return ''
    }
  }
})
