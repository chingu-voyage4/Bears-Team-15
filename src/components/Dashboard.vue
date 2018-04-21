<template>
<div>
  <h1>{{ greeting }}</h1>
  <app-nav-tabs :navItems="navItems">
    <template slot="extraIcons">
      <button class="btn-ico btn-ico-reload" @click="refresh"></button>
    </template>
  </app-nav-tabs>
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
      this.$store.dispatch('readLocalStorage')
      this.$store.dispatch('fetchRemoteCollections')
    }
  },
}
</script>

<style scoped>
.btn-ico {
  background: transparent;
  background-position: center center;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  width: 26px;
  margin: 0 0.4rem;
}
.btn-ico-reload {
  background-image: url('../assets/reload.png');
}
</style>
