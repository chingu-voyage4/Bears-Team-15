<template lang="html">
<nav>
  <ul>
    <router-link
      tag="li"
      v-for="(item, index) in navItems" :key="index"
      :to="item.route"
    ><a>{{ item.display }}</a></router-link>
  </ul>
</nav>
</template>

<script>
export default {
  props: ['navItems']
}
</script>

<style scoped>
nav * {
  margin: 0;
  padding: 0;
}

nav {
  text-align: center;
  margin-bottom: 40px;
}

nav ul {
  list-style: none;
}

nav li {
  display: block;
  height: 2.2rem;
  line-height: 2.2rem;
  white-space: nowrap;
  font-size: 1.2rem;
}

nav a {
  display: block;
}

nav a.router-link-exact-active {
  background: #0bf;
}

@media (min-width: 360px) {
  nav li, nav a {
    display: inline;
  }

  nav a {
    padding: 10px;
    margin: 0 10px;
  }
}
</style>
