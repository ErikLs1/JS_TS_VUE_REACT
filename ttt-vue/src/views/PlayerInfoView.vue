<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from 'vue'
import { useGameStore } from "@/stores/counter.ts";

const router = useRouter();
const store = useGameStore();

const mode = store.mode;
const player1 = ref('');
const player2 = ref('');

function startGame() {
  store.setPlayers(player1.value, player2.value)
  router.push({ name: 'GameBoardView' })
}
</script>

<template>
  <div>
    <h2>Player Info</h2>
    <p>Selected Mode: {{ mode }}</p>

    <div v-if="mode === 'HUMAN_VS_HUMAN'">
      <div class="mb-3">
        <label>Player 1 Name</label>
        <input type="text" class="form-control" v-model="player1"/>
      </div>
      <div class="mb-3">
        <label>Player 2 Name</label>
        <input type="text" class="form-control" v-model="player2"/>
      </div>
    </div>

    <div v-else-if="mode === 'HUMAN_VS_AI' || mode === 'AI_VS_HUMAN'">
      <div class="mb-3">
        <label>Your name</label>
        <input type="text" class="form-control" v-model="player1"/>
      </div>
    </div>

    <button class="btn btn-primary mt-3" @click="startGame">Start Game</button>
  </div>
</template>
