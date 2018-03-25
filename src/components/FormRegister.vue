<template>
<div>
  <form-fields v-on:auth="register"></form-fields>
</div>
</template>

<script>
import FormFields from '@/components/FormFields'
import axios from 'axios'

export default {
  components: {
    formFields: FormFields,
  },
  data: () => ({
    email: '',
    name: '',
    password: '',
    errors: []
  }),
  methods: {
    register(){
      console.log('register')
      /*
      this.errors = []
      axios.post('/register', { email: this.email, login: this.name, password: this.password })
        .then(response => { })
      .catch(e => {
        this.errors.push(e.response.data)
      })
      */
    }
  }
}
</script>

<style scoped>

</style>
