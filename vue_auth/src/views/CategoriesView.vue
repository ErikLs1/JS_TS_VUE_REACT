<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {ICategory} from "@/domain/ICategory.ts";
import type {ErrorResponse} from "@/types/ErrorResponse.ts";
import {CategoryService} from "@/services/CategoryService.ts";

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

onMounted(fetchCategories);

</script>

<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3">Categories</h1>
      <router-link to="/categories/create" class="btn btn-primary">
        Add New Category
      </router-link>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else>
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <table v-else class="table table-striped table-hover">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col" class="text-end">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(cat, index) in categories" :key="cat.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ cat.categoryName }}</td>
          <td>{{ cat.categoryDescription }}</td>
          <td class="text-end">
            <router-link :to="`/categories/edit/${cat.id}`" class="btn btn-sm btn-outline-secondary me-2">
              Edit
            </router-link>
            <button class="btn btn-sm btn-outline-danger">
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