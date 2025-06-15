<script setup>
import { ref, onMounted   } from 'vue';
import axios from "axios";
import DataTable from 'datatables.net-vue3';
//import DataTablesCore from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import DataTablesCore from 'datatables.net-bs5';
DataTable.use(DataTablesCore);

const data = ref();

onMounted(async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/brand`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json'
      }
    }).then(response=>{
      data.value = response.data.data
    })
  } catch (error) {
    console.error('Error loading data:', error.response)
  }
})

</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Resources</h1>
  </div>
  <div>
    <DataTable :data="data" :columns="[
      { data: 'brand', title: 'Brand' },
      { data: 'created_at', title: 'Created At' }]" class="display">
    </DataTable>
  </div>
</template>

<style>
@import 'bootstrap';
@import 'datatables.net-bs5';
</style>