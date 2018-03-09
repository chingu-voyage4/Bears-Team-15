<template>
<div>
  <h1>{{ greeting }}</h1>
  <app-nav-tabs :navItems="navItems"></app-nav-tabs>
  <div>
    <router-view/>
  </div>
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
}
</script>

<style>
.dashboard {
  width: 80%;
  min-height: 400px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.deck {
  width: 140px;
  height: 80px;
  margin: 40px;
  padding: 60px 0;
  background: rgb(240, 240, 240);
  border-radius: 10px;
  box-shadow: 2px 5px 0px rgb(200, 200, 200),
    4px 10px 0px rgb(180, 180, 180),
    12px 15px 10px rgba(0, 0, 0, 0.2);
}
</style>
