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
  }),
  methods: {
    login(payload) {
      axios.post('/login', payload)
        .then(response => {
          const token = response.headers.authorization
          const user = response.data
          this.$store.dispatch('processLogin', { user, token} )        
          this.$store.dispatch('pushNotificationSucc', 'Successfully logged in as ' + user.login)
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
