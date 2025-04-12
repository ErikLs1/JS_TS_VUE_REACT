<script setup lang="ts">
import { defineProps } from 'vue';
import { useGameStore } from "@/stores/counter.ts";

const props = defineProps<{
  direction: string
}>()

const store = useGameStore();

function handleClick() {
  store.moveGrid(props.direction)
}

</script>

<template>
<button>
  {{ direction }}
</button>
</template>

<style scoped>

</style>