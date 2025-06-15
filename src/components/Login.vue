
<script setup>
import { ref } from "vue";
import axios from "axios";

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

const user = ref();

const emit = defineEmits(['logged-in'])

async function onLogin(){
  //
  /**
   * To authenticate your SPA, your SPA's "login" page should first make a request to the /sanctum/csrf-cookie endpoint 
   * to initialize CSRF protection for the application:
   * axios.get('/sanctum/csrf-cookie').then(response => {
   *     // Login...
   * });
   */

  await axios.get(`${import.meta.env.VITE_BE_URL}/sanctum/csrf-cookie`);
  
  await axios.post(`${import.meta.env.VITE_API_URL}/login`,{email:form.value.email,password:form.value.password})
        .then(response => {
          localStorage.setItem('token', response.data.split('|')[1]);
        });
  await axios.get(`${import.meta.env.VITE_API_URL}/user`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response=>{
        emit('logged-in', response.data)});
}
</script>

<template>
    <form @submit.prevent="onLogin">
      <div class="mb-3">
        <div class="input-group mb-3">
          <span class="input-group-text" id="username"><font-awesome-icon icon="user" /></span>
          <input type="text" v-model="form.email" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="username">
        </div>
      </div>
      <div class="mb-3">
        <div class="input-group mb-3">
          <span class="input-group-text" id="password"><font-awesome-icon icon="lock" /></span>
          <input type="password" v-model="form.password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="password">
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>