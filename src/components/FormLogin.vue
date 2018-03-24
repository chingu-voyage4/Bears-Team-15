<template>
<div>
  <div class="loginError" 
  v-if="errors && errors.length" 
  v-for="(error, index) of errors" :key="index">
    {{error}}
  </div>
  <form @submit.prevent="login">
    <label>Name</label>
    <input type="text" placeholder="Your login name" v-model="name">
    <label>Password</label>
    <input type="password" placeholder="Your password" v-model="password">
    <button class="btn btn-add" type="submit">Login</button>
  </form>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    name: '',
    password: '',
    errors: []
  }),
  methods: {
    login(){
      this.errors = []
      axios.post('/login', { login: this.name, password: this.password })
        .then(response => { })
      .catch(e => {
        this.errors.push(e.response.data)
      })
    }
  }
}
</script>

<style scoped>

</style>
