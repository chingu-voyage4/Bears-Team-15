<template>
<div>
  © {{ currentYear }}
  <a href="https://github.com/chingu-voyage4/Bears-Team-15#readme" target="_blank">Chingu Voyage-4, team Bears-15</a>
</div>
</template>

<script>
export default {
  data: () => ({
  }),
  computed: {
    currentYear () {
      return (new Date()).getFullYear()
    }
  }
}
</script>

<style scoped>
</style>
