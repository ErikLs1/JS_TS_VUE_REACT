<script setup lang="ts">
  import { RouterLink, useRoute } from "vue-router";
  const route = useRoute();

  function isActiveLink(path: string) {
    return route.path === path;
  }
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <RouterLink to="/" class="navbar-brand">
        Home
      </RouterLink>
      <RouterLink to="/rules" class="navbar-brand">
        Rules
      </RouterLink>
      <RouterLink to="/something" class="navbar-brand">
        Something
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>

</style>