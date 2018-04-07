<template>
  <form-fields v-on:auth="register">
    <template slot="btnName">Register</template>
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
  }),
  methods: {
    register(payload) {
      if(this.validateLogin(payload.login)){
        axios.post('/register', payload)
          .then(response => { 
            const token = response.headers.authorization
            const user = response.data
            this.$store.dispatch('processRegistration', token)        
            this.$store.dispatch('pushNotificationSucc', 'Successfully registered as ' + user.login)
            this.$router.push(this.homeRoute)
          })
          .catch(e => {
            console.log(e.response.data)
          })
      }
    },
    validateLogin(x){
      return /^[\w\-\.@]+$/.test(x)
    }
  }
}
</script>

<style scoped>

</style>
