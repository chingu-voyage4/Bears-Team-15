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
  justify-content: space-between;
  min-height: 40px;
  width: 100%;
  background: #ddd;
  margin: auto auto 0 0;
  padding: 0;
}

footer .content {
  padding: 30px 5px 30px 5px;
  margin: 0 3vw 0 4vw;
  min-width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pull-left {
  float: left;
}

.pull-right {
  float: right;
}

a {
  text-decoration: none;
  color: black;
}
</style>
