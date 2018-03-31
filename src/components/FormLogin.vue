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
            this.authorization = response.headers.authorization.split(' ')[1]
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
