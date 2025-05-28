<script setup lang="ts">
import {reactive, ref} from "vue";
import {useAccountStore} from "@/stores/userStore.ts";
import {useRouter} from "vue-router";
import {AccountService} from "@/service/AccountService.ts";
import type { LoginRequest } from "@/types/Request/LoginRequest";

const form = reactive<LoginRequest>({
  email: '',
  password: ''
});

const errors = reactive<{email?: string; password?: string}>({});
const errorMessage = ref('');

const accountStore = useAccountStore();
const router = useRouter();
const accountService = new AccountService();

function validate() {
  errors.email = form.email ? '' : 'Email is required';
  errors.password = form.password ? '' : 'Password is required';
  return !errors.email && !errors.password;
}


async function doLogin() {
  if (!validate()) return;
  errorMessage.value = '';

  try {
    const res = await accountService.loginAsync(form);
    if (!res.errors && res.data) {
      accountStore.setAuth(res.data);
      router.push('/');
    }

  } catch (error) {
    errorMessage.value = 'Login failed';
  }
}


</script>

<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center">
    <div class="card shadow-sm p-4" style="max-width: 400px; width:100%;">
      <h2 class="card-title text-center mb-4">Sign In</h2>

      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="doLogin" novalidate>
        <div class="form-floating mb-3">
          <input
              v-model="form.email"
              type="email"
              class="form-control"
              id="loginEmail"
              placeholder="name@example.com"
          />
          <label for="loginEmail">Email address</label>
          <div class="text-danger small mt-1"></div>
        </div>

        <div class="form-floating mb-4">
          <input
              v-model="form.password"
              type="password"
              class="form-control"
              id="loginPassword"
              placeholder="Password"
          />
          <label for="loginPassword">Password</label>
          <div  class="text-danger small mt-1"></div>
        </div>

        <button
            type="submit"
            class="btn btn-primary w-100 py-2"
        >
          <span >Login</span>
        </button>
      </form>

      <div class="text-center mt-3">
        <RouterLink to="/register">Don’t have an account? Sign up</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>