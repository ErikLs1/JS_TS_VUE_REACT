<script setup lang="ts">
  import { defineProps } from 'vue';
  import { useRouter } from "vue-router";
  import {useGameStore} from "@/stores/counter.ts";

  const props = defineProps<{
    mode: string,
    label: string,
  }>();

  const router = useRouter();
  const store = useGameStore();

  function handleClick() {
    store.setMode(props.mode)

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
