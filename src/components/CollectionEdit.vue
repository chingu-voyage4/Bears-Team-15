<template>
<div class="container">
  <div
    class="card"
    v-for="(card, index) in collection.items" :key="index"
  >
    <input type="text" v-model="card.q" placeholder="Question">
    <input type="text" v-model="card.a" placeholder="Answer">
    <button
      @click="remove(index)"
    >X</button>
  </div>
  <button
    class="newCard"
    @click="add"
  >+</button>
</div>
</template>

<script>
export default {
  props: ['id'],
  data: () => ({
    emptyCard: { q: '', a: '' },
  }),
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
  methods: {
    remove (index) {
      this.collection.items.splice(index, 1)
    },
    add () {
      this.collection.items.push({...this.emptyCard})
    }
  }
}
</script>

<style scoped>
</style>
