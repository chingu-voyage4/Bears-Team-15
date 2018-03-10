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
* {
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body, #app, .homepage {
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

a {
  text-decoration: none;
  color: black;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  /*overflow-wrap: break-word;*/
  /* if this last property is added, very long words would be broken
    in the middle, so they will be fully displayed, but it's pretty
    lame and it overrides 'ellipsis' property */
}
</style>
