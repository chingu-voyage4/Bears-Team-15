<template>
<div>
  <h1> {{ collection.collectionName }} </h1>
  <nav>
    <ul>
      <li
        v-for="(item, index) in navItems" :key="index"
      >
        <router-link :to="item.route">{{ item.display }}</router-link>
      </li>
    </ul>
  </nav>
  <router-view/>
</div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data: () => ({
    navItems: [
      {
        display: 'Lesson',
        route: { name: 'collection' }
      },
      {
        display: 'Cards',
        route: { name: 'collectionView' }
      },
      {
        display: 'Edit',
        route: { name: 'collectionEdit' }
      },
    ]
  }),
  computed: {
    collection () {
      return this.$store.state.collections[this.id]
    },
  }
}
</script>

<style scoped>
</style>
