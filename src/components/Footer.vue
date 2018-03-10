<template>
<footer>
    <div class="content">
      © {{ currentYear }}
      <a href="https://github.com/chingu-voyage4/Bears-Team-15#readme" target="_blank">Chingu Voyage-4 Team Bears-15</a>
    </div>
    <div class="content version">
      <a href="https://github.com/chingu-voyage4/Bears-Team-15/wiki/What's-new" target="_blank">
        v {{ version }}
      </a>
    </div>
</footer>
</template>

<script>
export default {
  data: () => ({
    version: '0.3'
  }),
  computed: {
    currentYear () {
      return (new Date()).getFullYear()
    }
  }
}
</script>

<style scoped>
footer {
  display: flex;
  justify-content: center;
  height: 3rem;
  line-height: 3rem;
  width: 100%;
  background: #ddd;
  margin: auto auto 0 0;
}

footer .content {
  margin: 0 3vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

footer .version {
  display: none;
}

@media (min-width: 480px) {
  footer {
    justify-content: space-between;
  }

  footer .version {
   display: block;
  }
}
</style>
