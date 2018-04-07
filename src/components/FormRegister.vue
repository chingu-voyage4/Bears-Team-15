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
      if(this.validateLogin(payload.login) && this.validatePassword(payload.password)){
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
    },
    validatePassword(x){
      const bytes = x.split('')
        .map(char => char.charCodeAt(0))
        .map(c =>
          c < (1 <<  7) ? 1 :
          c < (1 << 11) ? 2 :
          c < (1 << 16) ? 3 :
          c < (1 << 21) ? 4 :
          c < (1 << 26) ? 5 : Number.NaN
        )
        .reduce((sum, bytes) => sum + bytes)
        
      const l = x.length
      if (l < 8 || l > 72) return false
      return !!bytes && bytes <= 72
    }
  }
}
</script>

<style scoped>

</style>
