<template>
<footer>
  <div class="content">
    <span class="pull-left">
      © {{ currentYear }}
      <a href="https://github.com/chingu-voyage4/Bears-Team-15#readme" target="_blank">Chingu Voyage-4, team Bears-15</a>
    </span>
    <span class="pull-right">
      v {{ version }}
    </span>
  </div>
</footer>
</template>

<script>
export default {
  data: () => ({
    version: '0.1'
  }),
  computed: {
    currentYear () {
      return (new Date()).getFullYear()
    }
  }
}
</script>
