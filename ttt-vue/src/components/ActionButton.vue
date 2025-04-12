<script setup lang="ts">
import { defineProps } from 'vue';
import { useGameStore } from "@/stores/counter.ts";

const props = defineProps<{
  action: string
}>()

const store = useGameStore();

</script>

<template>
<button>
  {{ action }}
</button>
</template>

<style scoped>

</style>