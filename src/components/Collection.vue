<template>
<div v-if="collection">
  <h1 class="ellipsis nowrap"> {{ collection.collectionName }} </h1>
  <app-nav-tabs :navItems="navItems"/>
  <router-view/>
</div>
</template>

<script>
import NavTabs from '@/components/NavTabs'

export default {
  components: {
    appNavTabs: NavTabs,
  },
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
      return this.$store.getters.collection(this.id)
    },
  }
}
</script>

<style scoped>
</style>
