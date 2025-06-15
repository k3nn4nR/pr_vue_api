<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from './components/Sidebar.vue';
import Login from './components/Login.vue';

const user = ref(null)
const sidebarVisible = ref(false);


function updateSidebarVisibility() {
  if (window.innerWidth >= 768) {
    sidebarVisible.value = true;
  } else {
    sidebarVisible.value = false;
  }
}

onMounted(() => {
  updateSidebarVisibility();
  window.addEventListener('resize', updateSidebarVisibility);
});

const setUser = (loggedInUser) => {
  user.value = loggedInUser
}
</script>

<template>
  <div id="app">
    <Login v-if="!user" @logged-in="setUser" />
    <div v-else>
      <div class="d-flex">
        <!-- Sidebar -->
        <Sidebar :visible="sidebarVisible" @close-sidebar="sidebarVisible = false" @logged-in="setUser"/>
        <!-- Overlay en móviles -->
        <div
          v-if="sidebarVisible"
          class="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          @click="sidebarVisible = false"
          style="z-index: 1040;"
        ></div>
        <!-- Contenido -->
        <div class="flex-grow-1" :style="{ marginLeft: sidebarVisible ? '250px' : '0' }">
          <button class="btn btn-primary m-2 d-md-none" @click="sidebarVisible = true">
            <font-awesome-icon icon="bars"/>
          </button>
          <main class="p-4">
            <router-view />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>
