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
    homeRoute: { name: 'home' },
    authorization: ''
  }),
  methods: {
    login(payload) {
      axios.post('/login', payload)
        .then(response => {
            this.authorization = response.headers.authorization
            this.$store.dispatch('saveToken', this.authorization)
            this.$router.push(this.homeRoute)
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
