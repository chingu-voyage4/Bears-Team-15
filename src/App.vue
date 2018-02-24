<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
