<script setup lang="ts">
import {useGameStore} from "@/stores/counter.ts";

const store = useGameStore()

const mode = store.mode;
const player1 = store.player1;
const player2 = store.player2;
</script>

<template>
  <div class="container mt-5">
    <h2>Game Board</h2>
    <p>Player 1: {{ player1 }}</p>
    <p>Player 2: {{ player2 }}</p>
  </div>
</template>