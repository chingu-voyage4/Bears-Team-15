<template>
<form @submit.prevent="register">
  <label>Email</label>
  <input  type="text" placeholder="Your email address" v-model="email">
  <label>Name</label>
  <input  type="text" placeholder="Your login name" v-model="name">
  <label>Password</label>
  <input type="password" placeholder="Your password" v-model="password">
  <button class="btn btn-add" type="submit">Register</button>
</form>
</template>

<script>
export default {
  data: () => ({
    email: '',
    name: '',
    password: ''
  }),
  methods: {
    register(){
      console.log(this.email, this.name, this.password)
    }
  }
}
</script>

<style scoped>

</style>
