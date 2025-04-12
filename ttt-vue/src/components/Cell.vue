<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { useGameStore } from "@/stores/counter.ts";

const props = defineProps<{
  x: number,
  y: number,
  value: string,
}>()

const store = useGameStore()
const isInGrid = computed(() => {
  return store.isWithinBoundsGrid(props.x, props.y)
})

function handleClick() {
  if (!store.gameOver) {
    store.makeMove(props.x, props.y)
  }
}

</script>

<template>
<div
    class="board-cell"
    :class="{ 'inner' : isInGrid }"
    @click="handleClick">
  {{ value === 'Empty' ? '' : value}}
</div>
</template>

<style scoped>
.board-cell {
  width: 40px;
  height: 40px;
  border: 1px solid #333;
  margin: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.board-cell.inner {
  background-color: #f1f1f1; /* highlight if in grid */
}
</style>