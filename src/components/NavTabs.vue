<template lang="html">
<nav>
  <ul>
    <router-link
      tag="li"
      v-for="(item, index) in navItems" :key="index"
      :to="item.route"
    ><a>{{ item.display }}</a></router-link>
  </ul>
  <slot name="extraIcons"></slot>
</nav>
</template>

<script>
export default {
  props: ['navItems']
}
</script>

<style scoped>
</style>
