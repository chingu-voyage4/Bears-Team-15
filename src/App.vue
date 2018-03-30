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
  color: #2c3e50;
}

body, #app, .homepage {
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

h1, h2, h3, h4, h5, h6 {
  text-align: center;
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

form{
  display: flex;
  flex-direction: column;
  max-width: 200px;
  margin: 0 auto;
}

form input{
  margin-bottom: 20px;
  text-align: center;
}

.btn {
  color: #fff;
  border: none;
  padding: .5em 1.0em .5em;
  margin: 5px;
  font: inherit;
  cursor: pointer;
  outline: 0;
  display: inline-block;
  border-radius: 1em/50%;
  transition: background-color 0.1s;
}

.btn-delete {
  color: #000;
  background-color: transparent;
  border: 1px solid rgba(255, 77, 77, 0.3)

}
.btn-delete:hover, .btn-delete:active {
  color: #fff;
  background-color: #ff4d4d;
}

.btn-add, .btn-add:hover, .btn-add:active {
  background-color: #7db85e;
}

.btn-save {
  background-color: #2185d0;
}

.btn-save:hover {
  background-color:  #1678c2;
}

.btn-save:active {
  background-color:  #1a69a4;
}
</style>
