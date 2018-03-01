<template>
<div>
  <h1> {{ collection.collectionName }} </h1>
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
