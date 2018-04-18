<template>
<div class="homepage">
  <app-header/>
  <div class="mb-2">
    <app-notifications/>
    <router-view/>
  </div>
  <app-footer/>
</div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Notifications from '@/components/Notifications'

export default {
  name: 'Homepage',
  components: {
    'appHeader': Header,
    'appFooter': Footer,
    'appNotifications': Notifications,
  },
  beforeCreate () {
    // TODO: try to login with authToken from localStorage
    // and even if there's no connection – show Username from localStorage
    const localStorage = JSON.parse(window.localStorage.getItem('store'))
    if(localStorage && localStorage.token && localStorage.user){
      const token = localStorage.token
      const user = localStorage.user.login
      this.$store.dispatch('processLogin', { user, token} )
    }

    this.$store.dispatch('fetchLocalCollections')
    this.$store.dispatch('fetchRemoteCollections')
  },
}
</script>
