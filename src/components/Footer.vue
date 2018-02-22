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

<style>
body, .homepage {
  height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
}

footer {
  min-height: 50px;
  height: 10vh;
  width: 100%;
  background: #ddd;
  margin-top: auto;
  display: table;
}

footer .content {
  display: table-cell;
  vertical-align: middle;
  line-height: 50px;
  padding: 0 30px;
}

.pull-left {
  float: left;
}

.pull-right {
  float: right;
}
</style>
