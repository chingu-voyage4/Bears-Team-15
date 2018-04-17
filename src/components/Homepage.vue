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
    this.$store.dispatch('fetchLocalCollections')
    this.$store.dispatch('fetchRemoteCollections')
  },
}
</script>
