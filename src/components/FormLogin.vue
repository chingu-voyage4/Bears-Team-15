<template>
  <form-fields v-on:auth="login">
    <template slot="btnName">Login</template>
  </form-fields>
</template>

<script>
import FormFields from '@/components/FormFields'
import axios from 'axios'

export default {
  components: {
    formFields: FormFields,
  },
  data: () => ({
    authorization: ''
  }),
  methods: {
    login(payload) {
      axios.post('/login', payload)
        .then(response => {
            this.authorization = response.headers.authorization
            //localStorage.setItem('token', JSON.stringify(this.authorization))
            this.$store.dispatch('saveToken', this.authorization)
            console.log(this.authorization) 
          })
        .catch(e => {
          console.log(e.response.data)
        })
    }
  }
}
</script>

<style scoped>

</style>
