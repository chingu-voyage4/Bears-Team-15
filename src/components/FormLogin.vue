<template>
<div>
  <form-fields v-on:auth="login"></form-fields>
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
    name: '',
    password: '',
    errors: []
  }),
  methods: {
    login(){
      console.log('login')
      /*
      this.errors = []
      axios.post('/login', { login: this.name, password: this.password })
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
