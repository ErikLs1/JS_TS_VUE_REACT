<script setup lang="ts">

import {useAccountStore} from "@/stores/userStore.ts";
import {AccountService} from "@/services/AccountService.ts";
import {useRouter} from "vue-router";
import {computed} from "vue";

const account = useAccountStore();
const router = useRouter();
const accountService = new AccountService();

const isAuthenticated = computed(() => account.isAuthenticated);

async function logout() {
  await accountService.logoutAsync({ refreshToken: account.refreshToken! });
  account.clearAuth();
  router.push('/login')
}
</script>

<template>
  <header class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
            <use xlink:href="#bootstrap">
            </use>
          </svg>
        </a>
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li>
            <RouterLink to="/" class="nav-link px-2 text-secondary">
              Home
            </RouterLink>
          </li>
          <li v-if="isAuthenticated">
            <RouterLink to="/categories" class="nav-link px-2 text-white">
              Categories
            </RouterLink>
          </li>
        </ul>
        <div class="text-end">
          <template v-if="!isAuthenticated">
            <RouterLink
                to="/login"
                class="btn btn-outline-light me-2"
                role="button"
            >
              Login
            </RouterLink>
            <RouterLink
                to="/register"
                class="btn btn-warning"
                role="button"
            >
              Register
            </RouterLink>
          </template>
          <template v-else>
            <button @click="logout" class="btn btn-outline-light" type="button">
              Logout
            </button>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>