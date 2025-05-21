<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {ICategory} from "@/domain/ICategory.ts";
import type {ErrorResponse} from "@/types/ErrorResponse.ts";
import {CategoryService} from "@/services/CategoryService.ts";
import {useRouter} from "vue-router";

const router = useRouter();
const loading = ref(false);
const errorMessage = ref<string | null>(null);
const categories = ref<ICategory[]>([])
const categoryService = new CategoryService();

const fetchCategories = async () => {
  loading.value = true;
  errorMessage.value = null;

  try {
    const result: ErrorResponse<ICategory[]> = await categoryService.getAllAsync()
    if (result.errors && result.errors.length) {
      errorMessage.value = result.errors.join(', ')
    } else if (result.data) {
      categories.value = result.data
    }
  } catch (err: any) {
    errorMessage.value = 'Failed to load categories.'
    console.error(err)
  } finally {
    loading.value = false
  }
}


async function deleteCategory(id: string) {
  if (!confirm('Are you sure you want to delete this category?')) return
  try {
    const res = await categoryService.delete(id)
    if (res.errors?.length) {
      alert('Delete failed: ' + res.errors.join(', '))
    } else {
      await fetchCategories()
    }
  } catch {
    alert('Unexpected error during delete.')
  }
}

onMounted(fetchCategories);

</script>

<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3">Categories</h1>
      <button @click="router.push('/categories/create')" class="btn btn-primary">
        Add New Category
      </button>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading…</span>
      </div>
    </div>

    <div v-else>
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <table v-else class="table table-striped table-hover">
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th class="text-end">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(cat, i) in categories" :key="cat.id">
          <td>{{ i + 1 }}</td>
          <td>{{ cat.categoryName }}</td>
          <td>{{ cat.categoryDescription }}</td>
          <td class="text-end">
            <button
                @click="router.push(`/categories/edit/${cat.id}`)"
                class="btn btn-sm btn-outline-secondary me-2"
            >
              Edit
            </button>
            <button
                @click="deleteCategory(cat.id)"
                class="btn btn-sm btn-outline-danger"
            >
              Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <div v-if="!categories.length && !errorMessage" class="text-center text-muted">
        No categories found.
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>