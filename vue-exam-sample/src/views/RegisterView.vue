<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '@/stores/userStore'
import { AccountService } from '@/service/AccountService'
import type { RegisterRequest } from '@/types/Request/RefisterRequest'
import type { ErrorResponse } from '@/types/Response/ErrorResponse'

const router = useRouter()
const accountStore = useAccountStore()
const service = new AccountService()

const form = reactive<RegisterRequest>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  address: '',
  phoneNumber: '',
  gender: 'female',
  dateOfBirth: ''
})

const confirmPassword = ref('')
const errorMessage = ref<string | null>(null)

async function onSubmit() {
  errorMessage.value = null

  try {
    const req: RegisterRequest = { ...form }
    const res: ErrorResponse<any> = await service.registerAsync(req)
    if (res.errors && res.errors.length) {
      errorMessage.value = res.errors.join(', ')
    } else if (res.data) {
      accountStore.setAuth({
        jwt: res.data.jwt,
        refreshToken: res.data.refreshToken,
        role: res.data.role
      })
      router.push('/')
    }
  } catch (err: any) {
    errorMessage.value = 'Registration failed. Please try again.'
    console.error(err)
  } finally {
  }
}
</script>

<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center ">
    <div class="card shadow-sm p-4" style="max-width: 500px; width:100%;">
      <h2 class="card-title text-center mb-4">Create Account</h2>

      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

      <form @submit.prevent="onSubmit" novalidate>
        <div class="row g-3">
          <div class="col-md-6 form-floating">
            <input
                v-model="form.firstName"
                type="text"
                class="form-control"
                id="regFirstName"
                placeholder="First Name"
            />
            <label for="regFirstName">First Name</label>
          </div>

          <div class="col-md-6 form-floating">
            <input
                v-model="form.lastName"
                type="text"
                class="form-control"
                id="regLastName"
                placeholder="Last Name"
            />
            <label for="regLastName">Last Name</label>
          </div>
        </div>

        <div class="form-floating my-3">
          <input
              v-model="form.email"
              type="email"
              class="form-control"
              id="regEmail"
              placeholder="name@example.com"
          />
          <label for="regEmail">Email address</label>
        </div>

        <div class="row g-3">
          <div class="col-md-6 form-floating">
            <input
                v-model="form.password"
                type="password"
                class="form-control"
                id="regPassword"
                placeholder="Password"
            />
            <label for="regPassword">Password</label>
          </div>

          <div class="col-md-6 form-floating">
            <input
                v-model="confirmPassword"
                type="password"
                class="form-control"
                id="regConfirm"
                placeholder="Confirm Password"
            />
            <label for="regConfirm">Confirm Password</label>
          </div>
        </div>

        <div class="form-floating my-3">
          <input
              v-model="form.address"
              type="text"
              class="form-control"
              id="regAddress"
              placeholder="Address"
          />
          <label for="regAddress">Address</label>
        </div>

        <div class="form-floating mb-3">
          <input
              v-model="form.phoneNumber"
              type="text"
              class="form-control"
              id="regPhone"
              placeholder="Phone Number"
          />
          <label for="regPhone">Phone Number</label>
        </div>

        <div class="mb-3">
          <label class="form-label">Gender</label>
          <select v-model="form.gender" class="form-select">
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>

        <div class="form-floating mb-4">
          <input
              v-model="form.dateOfBirth"
              type="date"
              class="form-control"
              id="regDob"
          />
          <label for="regDob">Date of Birth</label>
        </div>

        <button
            type="submit"
            class="btn btn-success w-100 py-2"
        >
          Register
        </button>
      </form>

      <div class="text-center mt-3">
        <RouterLink to="/login">Already have an account? Login</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>