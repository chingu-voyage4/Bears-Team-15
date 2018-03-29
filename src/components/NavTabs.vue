<template lang="html">
<nav>
  <ul>
    <li
      v-for="(item, index) in navItems" :key="index"
    >
      <router-link :to="item.route">{{ item.display }}</router-link>
    </li>
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
