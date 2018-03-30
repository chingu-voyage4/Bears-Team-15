<template>
<div class="homepage">
  <app-header/>
  <div>
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
    this.$store.dispatch('fetchLocalCollections')
    this.$store.dispatch('fetchRemoteCollections')
  },
}
</script>
