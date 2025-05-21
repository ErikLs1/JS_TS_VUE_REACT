<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { CategoryService } from '@/services/CategoryService'
import type { ICategory } from '@/domain/ICategory'
import type { ErrorResponse } from '@/types/ErrorResponse'

const router = useRouter()
const service = new CategoryService()

const form = reactive<Partial<ICategory>>({
  categoryName: '',
  categoryDescription: ''
})
const loading = ref(false)
const errorMessage = ref<string | null>(null)

async function onSubmit() {
  if (!form.categoryName || !form.categoryDescription) {
    errorMessage.value = 'Both fields are required.'
    return
  }
  loading.value = true
  errorMessage.value = null
  try {
    const res: ErrorResponse<ICategory> = await service.create(form as ICategory)
    if (res.errors?.length) {
      errorMessage.value = res.errors.join(', ')
    } else {
      router.push('/categories')
    }
  } catch {
    errorMessage.value = 'Failed to create category.'
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <div class="container py-4" style="max-width:500px">
    <h2 class="h4 mb-4">Add New Category</h2>

    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

    <form @submit.prevent="onSubmit" novalidate>
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input
            v-model="form.categoryName"
            type="text"
            class="form-control"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Description</label>
        <textarea
            v-model="form.categoryDescription"
            class="form-control"
            rows="3"
        ></textarea>
      </div>

      <button
          type="submit"
          class="btn btn-success"
          :disabled="loading"
      >
        {{ loading ? 'Saving…' : 'Create' }}
      </button>
      <button
          type="button"
          class="btn btn-link ms-2"
          @click="router.back()"
      >
        Cancel
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>