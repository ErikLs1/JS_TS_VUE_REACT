<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { CategoryService } from '@/services/CategoryService'
import type { ICategory } from '@/domain/ICategory'
import type { ErrorResponse } from '@/types/ErrorResponse'

const router = useRouter()
const route = useRoute()
const service = new CategoryService()

const id = route.params.id as string
const form = reactive<Partial<ICategory>>({
  categoryName: '',
  categoryDescription: ''
})

const errorMessage = ref<string | null>(null)

async function fetchCategory() {
  try {
    const res: ErrorResponse<ICategory> = await service.getById(id)
    if (res.errors?.length) {
      errorMessage.value = res.errors.join(', ')
    } else if (res.data) {
      form.categoryName = res.data.categoryName
      form.categoryDescription = res.data.categoryDescription
    }
  } catch {
    errorMessage.value = 'Failed to load category.'
  }
}

async function onSubmit() {
  if (!form.categoryName || !form.categoryDescription) {
    errorMessage.value = 'Both fields are required.'
    return
  }

  try {
    const res: ErrorResponse<ICategory> = await service.update(id, form as ICategory)
    if (res.errors?.length) {
      errorMessage.value = res.errors.join(', ')
    } else {
      router.push('/categories')
    }
  } catch (err: any) {
    console.error('Update failed:', err.response?.status, err.response?.data)
    errorMessage.value =
        err.response?.data?.message || 'Failed to update category.'
  }
}

onMounted(fetchCategory)
</script>

<template>
  <div class="container py-4" style="max-width:500px">
    <h2 class="h4 mb-4">Edit Category</h2>

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
      >
        Update
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