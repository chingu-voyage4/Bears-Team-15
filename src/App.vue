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
}

.cards-container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 2000px;
  margin: 0 auto;
  padding: 3vh;
}

.form{
  display: flex;
  flex-direction: column;
  max-width: 200px;
  margin: 0 auto;
}

.form input{
  margin-bottom: 20px;
  text-align: center;
}
</style>
