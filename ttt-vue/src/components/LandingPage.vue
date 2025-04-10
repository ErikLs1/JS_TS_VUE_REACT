<script lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function chooseMode(mode: string) {
  router.push({
    name: 'PlayerInfo',
    params: { mode }
  })
}

</script>

<template>
  <div class="container mt-5 text-center">
    <h1 class="mb-4">Welcome to Tic-Tac-Two!</h1>

    <div class="d-grid gap-3 col-6 mx-auto">
      <button
        class="btn btn-primary"
        @click="chooseMode('HUMAN_VS_HUMAN')">
        Human vs Human
      </button>
      <button
          class="btn btn-primary"
          @click="chooseMode('HUMAN_VS_AI')">
        Human vs AI
      </button>
      <button
          class="btn btn-primary"
          @click="chooseMode('AI_VS_HUMAN')">
        AI vs Human
      </button>
      <button
          class="btn btn-primary"
          @click="chooseMode('AI_VS_AI')">
        AI vs AI
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>