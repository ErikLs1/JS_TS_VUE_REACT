<script setup lang="ts">
import { useGameStore } from "@/stores/counter.ts";
import {computed, onMounted} from "vue";
import {GameController} from "@/gameBrain/GameController.ts";

const store = useGameStore()
onMounted(() => {
  if (!store.brain) {
    store.startNewGame()
  }
})

const gameBoard = computed(() => store.gameBoard)
const currentPlayer = computed(() => store.currentPlayer)
const gameOver = computed(() => store.gameOver)
const winner = computed(() => store.winner)
const showActionButtons = computed(() => store.moveCount >= 4)
const controller = new GameController(store)
</script>

<template>
  <div class="container mt-5">
    <h2>Game Board</h2>
    <p>Player 1: {{ store.player1 }}</p>
    <p>Player 2: {{ store.player2 }}</p>
    <div>
      <p>Current Player: {{ currentPlayer }}</p>
    </div>
    <div class="board">
      <div v-for="(row, x) in gameBoard" :key="x" class="board-row">
        <div
            v-for="(value, y) in row"
            :key="y"
            class="board-cell"
            :class="{ inner: store.isWithinBoundsGrid(x, y) }"
            @click="controller.handleCellClick(x, y)">
          {{ value === 'Empty' ? '' : value }}
        </div>
      </div>
    </div>

    <div v-if="!store.gameOver && showActionButtons && store.actionActive === null">
      <button @click="store.actionActive = false">Make a Move</button>
      <button @click="store.actionActive = 'grid'">Move the Grid</button>
      <button @click="store.actionActive = 'movePiece'">Move a Piece</button>
    </div>

    <div v-if="store.actionActive === 'grid'">
      <p>Select direction</p>
      <button @click="controller.handleGridMove('Up')">Up</button>
      <button @click="controller.handleGridMove('Down')">Down</button>
      <button @click="controller.handleGridMove('Left')">Left</button>
      <button @click="controller.handleGridMove('Right')">Right</button>
      <button @click="controller.handleGridMove('Up-Left')">Up Left</button>
      <button @click="controller.handleGridMove('Up-Right')">Up Right</button>
      <button @click="controller.handleGridMove('Down-Left')">Down Left</button>
      <button @click="controller.handleGridMove('Down-Right')">Down Right</button>
    </div>

  </div>
</template>

<style scoped>
.board-row {
  display: flex;
}
.board-cell {
  width: 40px;
  height: 40px;
  margin: 2px;
  border: 1px solid #666;
  display: flex;
  align-items: center;
  justify-content: center;
}
.board-cell.inner {
  background-color: #eef; /* highlight if in the 3x3 grid */
}
</style>