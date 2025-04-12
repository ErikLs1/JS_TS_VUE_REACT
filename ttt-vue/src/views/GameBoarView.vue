<script setup lang="ts">
import { useGameStore } from "@/stores/counter.ts";
import { onMounted } from "vue";
import GameBoard from "@/components/GameBoard.vue";
import ActionButton from "@/components/ActionButton.vue";
import DirectionButton from "@/components/DirectionButton.vue";

const store = useGameStore()
onMounted(() => {
  if (!store.board || store.board.length === 0) {
    store.startNewGame()
  }
})
</script>

<template>
  <div class="container mt-5">
    <h2>Game Board</h2>
    <p>Player 1: {{ store.player1 }}</p>
    <p>Player 2: {{ store.player2 }}</p>
    <div>
      <p>Current Player: {{ store.currentPlayer }}</p>
    </div>

    <GameBoard/>
    <div v-if="store.moveCount >= 4">
      <ActionButton action="Make A Move"/>
      <ActionButton action="Move The Grid"/>
      <ActionButton action="Move The Piece"/>
    </div>

    <div v-if="store.moveCount >= 30">
      <DirectionButton direction="Up"/>
      <DirectionButton direction="Down"/>
      <DirectionButton direction="Left"/>
      <DirectionButton direction="Right"/>
      <DirectionButton direction="Up Left"/>
      <DirectionButton direction="Up Right"/>
      <DirectionButton direction="Down Left"/>
      <DirectionButton direction="Down Right"/>
    </div>

  </div>
</template>