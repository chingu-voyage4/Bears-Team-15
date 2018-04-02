<template>
<form @submit.prevent="auth" class="auth-form">
  <label>Name</label>
  <input type="text" placeholder="Your login name" v-model="name">
  <label>Password</label>
  <input type="password" placeholder="Your password" v-model="password">
  <button class="btn btn-add" type="submit"><slot name="btnName"></slot></button>
</form>
</template>

<script>
export default {
  data: () => ({
    name: '',
    password: ''
  }),
  methods: {
    auth(){
      this.$emit('auth', {login: this.name, password: this.password})
    }
  }
}
</script>
