<template>
<header>
  <div class="content">
    <span>
      <img src="../assets/logo-placeholder.png" />
      <router-link to="/">Home</router-link>
    </span>
    <p v-if="loadingMode">Loading...</p>
    <span>
      <router-link to="/login" v-if='!user'>Login</router-link>
      <router-link to="/" v-else @click.native="logout">Logout {{ user.login }}</router-link>
    </span>
  </div>
</header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['loadingMode', 'user']),
  methods: {
    logout() {
      this.$store.dispatch('processLogout')
    }
  }
}
</script>

<style scoped>
</style>
