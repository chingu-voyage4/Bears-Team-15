<template>
<footer>
    <div class="content">
      © {{ currentYear }}
      <a href="https://github.com/chingu-voyage4/Bears-Team-15#readme" target="_blank">Chingu Voyage-4 Team Bears-15</a>
    </div>
    <div class="content version">
      <a href="https://github.com/chingu-voyage4/Bears-Team-15/wiki/What's-new" target="_blank">
        v{{ version }}
      </a>
    </div>
</footer>
</template>

<script>
export default {
  computed: {
    currentYear () {
      return (new Date()).getFullYear()
    },
    version () {
      return this.$store.state.appVersion
    }
  }
}
</script>

<style scoped>
</style>
