<script setup lang="ts">
  import { defineProps } from 'vue';
  import { useRouter } from "vue-router";
  import {useGameStore} from "@/stores/counter.ts";
  import {GameController} from "@/gameBrain/GameController.ts";

  const props = defineProps<{
    mode: string,
    label: string,
  }>();

  const router = useRouter();
  const store = useGameStore();
  const controller = new GameController(store)

  function handleClick() {
    store.setMode(props.mode)

    // Update the state
    controller.resetGame()

    if (props.mode === 'AI_VS_AI') {
      router.push({ name: 'GameBoardView' })
    } else {
      router.push({ name: 'PlayerInfoView',})
    }
  }
</script>

<template>
  <button class="btn btn-primary btn-sm" @click="handleClick">
    {{ props.label }}
  </button>
</template>
