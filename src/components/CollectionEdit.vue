<template>
<div class="container">
  <div
    class="card"
    v-for="(card, index) in collection.items" :key="index"
  >
    <input type="text" v-model="card.q">
    <input type="text" v-model="card.a">
  </div>
</div>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    collection () {
      if (this.id === undefined) {
        return {
          collectionName: '',
          items: [{ q: '', a: '' }]
        }
      }
      return {...this.$store.state.collections[this.id]}
    }
  },
}
</script>

<style scoped>
</style>
