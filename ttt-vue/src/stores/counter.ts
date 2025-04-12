import { defineStore } from 'pinia'

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    mode: '' as string,
    player1: '' as string,
    player2: '' as string,
  }),

  getters: {
    gameMode: (state) => state.mode,
  },

  actions: {
    setMode(selectedMode: string) {
      this.mode = selectedMode
    },
    setPlayers(player1: string, player2:string) {
      this.player1 = player1
      this.player2 = player2
    },
  }
})
