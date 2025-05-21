<script setup lang="ts">

</script>

<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center ">
    <div class="card shadow-sm p-4" style="max-width: 500px; width:100%;">
      <h2 class="card-title text-center mb-4">Create Account</h2>

<!--      <div class="alert alert-danger"></div>-->

      <fo novalidate>
        <div class="row g-3">
          <div class="col-md-6 form-floating">
            <input
                type="text"
                class="form-control"
                id="regFirstName"
                placeholder="First Name"
            />
            <label for="regFirstName">First Name</label>
            <div class="text-danger small mt-1"></div>
          </div>

          <div class="col-md-6 form-floating">
            <input
                type="text"
                class="form-control"
                id="regLastName"
                placeholder="Last Name"
            />
            <label for="regLastName">Last Name</label>
            <div class="text-danger small mt-1"></div>
          </div>
        </div>

        <div class="form-floating my-3">
          <input
              type="email"
              class="form-control"
              id="regEmail"
              placeholder="name@example.com"
          />
          <label for="regEmail">Email address</label>
          <div class="text-danger small mt-1"></div>
        </div>

        <div class="row g-3">
          <div class="col-md-6 form-floating">
            <input
                type="password"
                class="form-control"
                id="regPassword"
                placeholder="Password"
            />
            <label for="regPassword">Password</label>
            <div class="text-danger small mt-1"></div>
          </div>

          <div class="col-md-6 form-floating">
            <input
                type="password"
                class="form-control"
                id="regConfirm"
                placeholder="Confirm Password"
            />
            <label for="regConfirm">Confirm Password</label>
            <div class="text-danger small mt-1"></div>
          </div>
        </div>

        <button
            type="submit"
            class="btn btn-success w-100 py-2 mt-4"
        >
          <span >Sign Up</span>
<!--          <span class="spinner-border spinner-border-sm"></span>-->
        </button>
      </fo>

      <div class="text-center mt-3">
        <router-link to="/login">Already have an account? Login</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>