<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body, .homepage {
  height: 100vh;
  min-height: 600px;
  margin: 0;
  display: flex;
  flex-direction: column;
}

a {
  text-decoration: none;
  color: black;
}
</style>
