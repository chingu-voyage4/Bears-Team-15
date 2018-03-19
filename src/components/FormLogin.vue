<template>
<form @submit.prevent="login">
  <label>Name</label>
  <input type="text" placeholder="Your login name" v-model="name">
  <label>Password</label>
  <input type="password" placeholder="Your password" v-model="password">
  <button class="btn btn-add" type="submit">Login</button>
</form>
</template>

<script>
export default {
  data: () => ({
    name: '',
    password: ''
  }),
  methods: {
    login(){
      console.log(this.name, this.password)
    }
  }
}
</script>

<style scoped>

</style>
