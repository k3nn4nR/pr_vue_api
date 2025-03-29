<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { ref } from "vue";
import axios from "axios";

axios.defaults.withCredentials = true;

const form = ref({
  email:null,
  password:null
});
const user = ref();

async function onLogin(){
  await axios.post("http://localhost:8000/api/login",{email:form.value.email,password:form.value.password}).then(response => {
      localStorage.setItem('token', response.data.token);
    });
  let { data } = await axios.get("http://localhost:8000/api/user",{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  user.value = data;
}
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
