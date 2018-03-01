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
  computed: {
    collection () {
      return this.$store.state.collections[this.id]
    },
  }
}
</script>

<style scoped>
</style>
