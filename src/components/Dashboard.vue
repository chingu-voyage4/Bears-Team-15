<template>
<div>
  <h1>{{ greeting }}</h1>
  <app-nav-tabs :navItems="navItems"></app-nav-tabs>
  <!-- <div class="container mb-2">
    <button class="btn btn-save" @click="refresh">Refresh</button>
  </div> -->
  <router-view/>
</div>
</template>

<script>
import { mapState } from 'vuex'
import NavTabs from '@/components/NavTabs'

export default {
  name: "Dashboard",
  components: {
    appNavTabs: NavTabs,
  },
  data: () => ({
    greeting: 'Welcome to Bears-15 Cards!',
    navItems: [
      {
        display: 'My decks',
        route: { name: 'home' }
      },
      {
        display: 'Discover',
        route: { name: 'public' }
      },
    ]
  }),
  computed: mapState(['collections']),
  methods: {
    refresh () {
      this.$store.dispatch('fetchRemoteCollections')
      this.$store.dispatch('fetchLocalCollections')
    }
  },
}
</script>

<style>
</style>
