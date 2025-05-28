<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAccountStore } from '@/stores/userStore.ts';
import { useRouter } from 'vue-router';
import {PersonsService} from "@/service/PersonService.ts";
import type { IUser } from '@/types/Domain/IUser';

const account = useAccountStore();
const router = useRouter();
const personService = new PersonsService();

const profile = ref<IUser | null>(null);

const initials = computed(() => {
  if (!profile.value) return '';
  return (
      profile.value.personFirstName.charAt(0) + profile.value.personLastName.charAt(0)
  ).toUpperCase();
});

onMounted(async () => {
  if (!account.jwt) {
    router.push('/login');
    return;
  }
  const result = await personService.getProfileInfo();
  if (!result.errors && result.data) {
    profile.value = result.data;
  }
});
</script>

<template>
  <Container v-if="profile" class="mt-4">
    <div class="card mb-4 shadow-sm rounded-2">
      <div class="card-header d-flex align-items-center gap-3">
        <div class="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width:56px; height:56px;">
          {{ initials }}
        </div>
        <div>
          <h5 class="mb-0">{{ profile.personFirstName }} {{ profile.personLastName }}</h5>
          <small class="text-muted">
            <i class="bi bi-envelope-fill me-1"></i>{{ profile.email }}
          </small>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-6 mb-3">
            <i class="bi bi-house-door-fill me-1"></i>
            {{ profile.personAddress }}
          </div>
          <div class="col-sm-6 mb-3">
            <i class="bi bi-telephone-fill me-1"></i>
            {{ profile.personPhoneNumber }}
          </div>
        </div>
      </div>
    </div>
  </Container>
  <Container v-else class="mt-4 text-center">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </Container>
</template>

<style scoped>

</style>