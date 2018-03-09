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
nav {
  margin-bottom: 40px;
}

nav ul {
  list-style: none;
}

nav li {
  display: inline;
  margin: 0 20px;
}

nav li a {
  font-size: 1.2rem;
  padding: 10px;
}

nav .router-link-exact-active {
  background: #0bf;
}
</style>
