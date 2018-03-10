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

a {
  text-decoration: none;
  color: black;
}
</style>
