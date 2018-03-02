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
  <p v-if=emptyWarningMessage>Please edit <em>Question</em> and <em>Answer</em> before adding new Card</p>
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
    emptyWarningMessage: false
  }),
  created () {
    this.editMode = this.id !== undefined
  },
  beforeRouteLeave (to, from, next) {
    const lastCard = this.collection.items[this.lastIndex]
    const onlyLastCardIsEmpty = lastCard.q === '' && lastCard.a === ''
    if (this.readyToSave || onlyLastCardIsEmpty) {
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
    readyToSave () {
      return this.errors.q.length === 0
        && this.errors.a.length === 0 ? true : false
    },
  },
  methods: {
    remove (index) {
      this.collection.items.splice(index, 1)
    },
    removeLastEmpty(){
      if(this.collection.items[this.lastIndex].q === ''
        && this.collection.items[this.lastIndex].a === '')
      {
        this.collection.items.pop()
      }
    },
    add () {
      if (this.readyToSave) {
        this.collection.items.push({...this.emptyCard})
        this.errors.q.push(this.lastIndex)
        this.errors.a.push(this.lastIndex)
      }
    },
    blur (index, qa) {
      if (this.collection.items[index][qa] === ''){
        // if on blur value is empty – make a record in errors
        this.errors[qa].push(index)
      } else {
        // if on blur value is not empty – check if there was an error before
        const errorIndex = this.errors[qa]
          .findIndex(x => x === index)
        if (errorIndex !== -1) {
          // if there was an error – remove it from error list
          this.errors[qa].splice(errorIndex, 1)
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
