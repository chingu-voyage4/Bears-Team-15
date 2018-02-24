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

.dashboard {
  width: 80%;
  height: 400px;
  margin: 0 auto;
  display: flex;
}

a {
  text-decoration: none;
  color: black;
}

.lesson {
  width: 140px;
  height: 80px;
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 40px;
  padding: 60px 0;
  background: rgb(240,240,240);
  border-radius: 10px;
  box-shadow: 2px 5px 0px rgb(200,200,200),
    4px 10px 0px rgb(180,180,180),
    12px 15px 10px rgba(0,0,0,0.2);
}

.spacer {
  width: 33%;
  margin: 0 auto;
}
</style>
