<script setup lang="ts">
import {CategoryService} from "@/services/CategoryService.ts";
import {onMounted, reactive, ref} from "vue";
import type {IResultObject} from "@/types/IResultObject.ts";
import type {ICategory} from "@/domain/ICategory.ts";

const requestIsOngoing = ref(false);
const data = reactive<IResultObject<ICategory[]>>({})

const fetchPageData = async () => {
  requestIsOngoing.value = true;

  try {
    const result = await CategoryService.getAllAsync();
    console.log(data);
    data.data = result.data;
    data.errors = result.errors;

  } catch (error) {
    console.log('Error fetching data: ', error)
  } finally {
    requestIsOngoing.value = false;
  }
}

onMounted(async () => {
  await fetchPageData();
})

</script>

<template>
  <div>
    Request is {{ requestIsOngoing == true ? 'ongoing' : 'done' }}

    {{ data.data }}
    {{ data.errors }}
  </div>
</template>

<style scoped>
</style>
