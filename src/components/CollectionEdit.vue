<template>
<div class="container">
  <div>
    <input
      v-model="collection.collectionName"
      type="text" placeholder="Collection name">
  </div>
  <div
    class="card"
    v-for="(card, index) in collection.items" :key="index"
  >
    <input
      type="text" v-model="card.q" placeholder="Question"
      @blur="blur(index, 'q')"
    >
    <input
      type="text" v-model="card.a" placeholder="Answer"
      @blur="blur(index, 'a')"
    >
    <button
      @click="remove(index)"
    >X</button>
  </div>
  <button
    class="newCard"
    @click="add"
  >+</button>

<!-- all this block with error messages should be improved -->
  <div v-if="!readyToSave">
    <p
      v-for="(e, index) in errors.q" :key="'q'+index"
    >
        Please fill <em>Question</em> at {{ e }} card
    </p>
    <p
      v-for="(e, index) in errors.a" :key="'a'+index"
    >
        Please fill <em>Answer</em> at {{ e }} card
    </p>
  </div>
  <p v-else>ok to save </p>
</div>
</template>

<script>
export default {
  props: ['id'],
  data: () => ({
    editMode: true,
    emptyCard: { q: '', a: '' },
    newCollection: {
      collectionName: '',
      items: [{...this.emptyCard}]
    },
    errors: { q: [], a: [] },
  }),
  created () {
    this.editMode = this.id !== undefined
  },
  beforeRouteLeave (to, from, next) {
    if (this.readyToSave) {
      this.removeLastEmpty()
      next()
    }
  },
  computed: {
    collection () {
      return this.editMode
        ? this.$store.state.collections[this.id]
        : this.newCollection
    },
    lastIndex () {
      return this.collection.items.length - 1;
    },
    lastCardIsEmpty () {
      const lastCard = this.collection.items[this.lastIndex]
      return lastCard.q === '' && lastCard.a === ''
    },
    readyToSave () {
      return this.errors.q.length === 0
        && this.errors.a.length === 0 ? true : false
    },
  },
  methods: {
    remove (index) {
      this.collection.items.splice(index, 1)
      const helper = a => a.filter(x => x !== index)
        .map(x => x > index ? x - 1 : x)
      this.errors.q = helper(this.errors.q)
      this.errors.a = helper(this.errors.a)
    },
    removeLastEmpty(){
      if (this.lastCardIsEmpty) {
        this.collection.items.pop()
      }
    },
    add () {
      if (this.readyToSave) {
        this.collection.items.push({...this.emptyCard})
      }
    },
    blur (index, qa) {
      //check if there was an error before
      const errorIndex = this.errors[qa]
        .findIndex(x => x === index)
      if (errorIndex !== -1) {
        // if there was an error – remove it from error list
        // if on blur value is not empty
        if (this.collection.items[index][qa] !== ''){
          this.errors[qa].splice(errorIndex, 1)
        }
      } else if (this.collection.items[index][qa] === ''){
        // if there wasn't an error and now it is – push it
        this.errors[qa].push(index)
      }
    }
  }
}
</script>

<style scoped>
</style>
