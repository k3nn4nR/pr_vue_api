<!-- Sidebar.vue -->
<script setup>
import { ref, reactive  } from 'vue';
import axios from "axios";

defineProps(['visible']);
const emit = defineEmits(['close-sidebar','logged-in']);

const submenuOpen = reactive({
  stadistics: false,
  logistics: false,
  // Puedes agregar más aquí
});
function toggleSubmenu(menuKey) {
  submenuOpen[menuKey] = !submenuOpen[menuKey];
}

async function onLogout() {
  await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(response=>{
    localStorage.removeItem('token');
    emit('logged-in', null);
  });
}
</script>

<template>
  <div
    class="bg-dark text-white h-100 p-3"
    :class="[ 'position-fixed top-0 start-0',
    visible ? 'd-block' : 'd-none d-md-block']"
    style="width: 250px; z-index: 1050;"
  >
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="mb-0">Menú</h5>
      <button class="btn btn-sm btn-light d-md-none" @click="$emit('close-sidebar')">
        <font-awesome-icon icon="times"/>
      </button>
    </div>

    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link to="/" class="nav-link text-white">
          <font-awesome-icon icon="home"/> Inicio
        </router-link>
      </li>

      <li class="nav-item">
        <a href="#" class="nav-link text-white" @click.prevent="toggleSubmenu('stadistics')">
          <font-awesome-icon icon="bars"/> Estadísticas
        </a>
        <div v-show="submenuOpen.stadistics" class="ps-3">
          <router-link to="/reports" class="nav-link text-white"><font-awesome-icon icon="chart-line"/> Reports</router-link>
          <router-link to="/stadistics_purchases" class="nav-link text-white"><font-awesome-icon icon="chart-line"/> Purchases</router-link>
          <router-link to="/stadistics_inventory" class="nav-link text-white"><font-awesome-icon icon="chart-simple"/> Inventory</router-link>
        </div>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link text-white" @click.prevent="toggleSubmenu('logistics')">
          <font-awesome-icon icon="truck-plane"/> Logistics
        </a>
        <div v-show="submenuOpen.logistics" class="ps-3">
          <router-link to="/purchases" class="nav-link text-white"><font-awesome-icon icon="chart-simple"/> Purchases</router-link>
          <router-link to="/inventory" class="nav-link text-white"><font-awesome-icon icon="warehouse"/> Inventory</router-link>
          <router-link to="/resources" class="nav-link text-white"><font-awesome-icon icon="gears"/> Resources</router-link>
        </div>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link text-white" @click="onLogout"><font-awesome-icon icon="sign-out-alt" /> Logout</a>
      </li>
    </ul>
  </div>
</template>

