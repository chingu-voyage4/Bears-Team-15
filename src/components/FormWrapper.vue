<template>
<div>
  <h1>{{ greeting }}</h1>
  <app-nav-tabs :navItems="navItems"></app-nav-tabs>
  <router-view/>
</div>
</template>

<script>
import NavTabs from '@/components/NavTabs'

export default {
  name: "FormWrapper",
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
