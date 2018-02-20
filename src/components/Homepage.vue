<template>
  <div>
    <h1>{{ greeting }}</h1>
    <div>{{ message }}</div>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Homepage',
  data () {
    return {
      greeting: 'Welcome to Bears-15 Cards!',
      message: 'Here will be our awesome flashcards app...'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: red;
}
</style>