<template>
<header>
  <div class="content">
    <span>
      <img src="../assets/logo-placeholder.png" />
      <router-link to="/">Home</router-link>
    </span>
    <p v-if="loadingMode">Loading...</p>
    <router-link to="/login">Login</router-link>
  </div>
</header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['loadingMode']),
}
</script>

<style scoped>
</style>
