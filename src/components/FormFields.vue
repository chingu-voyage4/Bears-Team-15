<template>
<div>
  <div class="loginError" 
  v-if="errors && errors.length" 
  v-for="(error, index) of errors" :key="index">
    {{error}}
  </div>
  <form @submit.prevent="auth">
    <label>Name</label>
    <input type="text" placeholder="Your login name" v-model="name">
    <label>Password</label>
    <input type="password" placeholder="Your password" v-model="password">
    <button class="btn btn-add" type="submit"><slot name="btnName"></slot></button>
  </form>
</div>
</template>

<script>
export default {
  props: ['errors'],
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

