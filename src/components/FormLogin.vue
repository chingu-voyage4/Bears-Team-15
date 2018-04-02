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
    token: '',
    user: {}
  }),
  methods: {
    login(payload) {
      axios.post('/login', payload)
        .then(response => {
          this.token = response.headers.authorization
          this.user = response.data
          this.$store.dispatch('saveUser', this.user)
          this.$store.dispatch('saveToken', this.token)            
          this.$store.dispatch('pushNotificationSucc', 'Successfully logged in as ' + this.user.login)
          this.$router.push(this.homeRoute)
        })
        .catch(e => {
          if(e.response){ this.$store.dispatch('pushNotificationErr', e.response.data) }          
        })
    }
  }
}
</script>

<style scoped>

</style>
