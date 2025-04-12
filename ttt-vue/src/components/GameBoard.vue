<script setup lang="ts">
import { computed } from "vue";
import { useGameStore } from "@/stores/counter.ts";
import Cell from "@/components/Cell.vue";

const store = useGameStore()
const board = computed(() => store.board)
</script>

<template>
<div class="board">
  <div
      class="board-row"
      v-for="(column, x) in board"
      :key="x">
    <Cell
        v-for="(value, y) in column"
        :key="y"
        :x="x"
        :y="y"
        :value="value"/>
  </div>
</div>
</template>

<style scoped>
.board {
  display: inline-block;
}
.board-row {
  display: flex;
}
</style>