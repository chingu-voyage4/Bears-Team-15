<template>
<div>
  <h1>{{ greeting }}</h1>
  <app-nav-tabs :navItems="navItems"></app-nav-tabs>
  <div><router-view/></div>
</div>
</template>

<script>
import NavTabs from '@/components/NavTabs'

export default {
  name: "Form",
  components: {
    appNavTabs: NavTabs,
  },
  data: () => ({
    greeting: 'Welcome to Bears-15 Cards!',
    navItems: [
      {
        display: 'Login',
        route: { name: 'login' }
      },
      {
        display: 'Register',
        route: { name: 'register' }
      },
    ]
  })
}
</script>

<style>

</style>
