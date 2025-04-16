<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import Swal from 'sweetalert2'

/**
 * In addition, you should enable the withCredentials and withXSRFToken options on your application's 
 * global axios instance. Typically, this should be performed in your resources/js/bootstrap.js file. 
 * If you are not using Axios to make HTTP requests from your frontend, you should perform the equivalent 
 * configuration on your own HTTP client:
 * axios.defaults.withCredentials = true;
 * axios.defaults.withXSRFToken = true;
 */

 axios.defaults.withCredentials = true;
 axios.defaults.withXSRFToken = true;

const form = ref({
  email:null,
  password:null
});


const brand = ref({
  brand:null,
});

const user = ref();

async function onLogin(){
  //
  /**
   * To authenticate your SPA, your SPA's "login" page should first make a request to the /sanctum/csrf-cookie endpoint 
   * to initialize CSRF protection for the application:
   * axios.get('/sanctum/csrf-cookie').then(response => {
   *     // Login...
   * });
   */

  await axios.get(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`);
  
  await axios.post(`${import.meta.env.VITE_API_URL}/api/login`,{email:form.value.email,password:form.value.password})
        .then(response => {
          localStorage.setItem('token', response.data.split('|')[1]);
        });
  await axios.get(`${import.meta.env.VITE_API_URL}/api/user`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response=>{user.value = response.data;});
}

async function onRegister(){
  await axios.post(`${import.meta.env.VITE_API_URL}/api/brand`,{
    brand:brand.value.brand},{
    headers: {
        'Content-type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('token')
    }}).then(response => {
    console.log(response.data)
  });
}

async function onLogout(){
  await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`,{},{ withCredentials: true });
}

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

onMounted(() => {
  Echo.channel('item-registered')
  .listen('StoreEvent', (e)=>{
      Toast.fire({
          icon: 'success',
          title: e.message
      })
  });
});
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <form @submit.prevent="onLogin">
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="form.email">
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="form.password">
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
      {{ user }}

      <form v-if=user  @submit.prevent="onRegister">
        <div>
          <label for="email">Brand:</label>
          <input type="text" v-model="brand.brand">
        </div>
        <div>
          <button>Register</button>
        </div>
      </form>

      <div></div>
      <form v-if=user @submit.prevent="onLogout">
        <div>
          <button>Logout</button>
        </div>
      </form>

    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
