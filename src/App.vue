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

body, .homepage {
  height: 100vh;
  min-height: 600px;
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

a {
  text-decoration: none;
  color: black;
}
</style>
