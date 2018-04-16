<template>
  <form-fields v-on:auth="register">
    <template slot="btnName">Register</template>
  </form-fields>
</template>

<script>
import FormFields from '@/components/FormFields'
import axios from 'axios'
import errors from '@/../server/errMessages.js'

export default {
  components: {
    formFields: FormFields,
  },
  data: () => ({
    homeRoute: { name: 'home' },
  }),
  methods: {
    register(payload) {
      if(this.validateLogin(payload.login) & this.validatePassword(payload.password)){
        axios.post('/register', payload)
          .then(response => { 
            const token = response.headers.authorization
            const user = response.data
            this.$store.dispatch('processLogin', {user, token})        
            this.$store.dispatch('pushNotificationSucc', 'Successfully registered as ' + user.login)
            this.$router.push(this.homeRoute)
          })
          .catch(e => {
            if(e.response){
              this.$store.dispatch('pushNotificationErr', e.response.data)
            }else if(e.message){
              this.$store.dispatch('pushNotificationErr', e.message)
            }
          })
      }
    },
    validateLogin(x){
      if (x.length === 0) {
        this.$store.dispatch('pushNotificationErr', errors.registration.emptyLogin)
      } else if (/^[\w\-\.@]+$/.test(x)) {
        return true
      } else {
        this.$store.dispatch('pushNotificationErr', errors.registration.invalidLogin)
        return false
      }
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
      if (l < 8 || l > 72){
        this.$store.dispatch('pushNotificationErr', errors.registration.passwordLength)
        return false
      }
      if(!!bytes && bytes <= 72){
        return true
      }else{
        this.$store.dispatch('pushNotificationErr', errors.registration.passwordByteLength)
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>
