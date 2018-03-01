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
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.

    // clear empty card before leaving (we dont want user creating empty cards)
    this.removeLastEmpty();
    // call next so we can navigate away
    next()
  },
  computed: {
    collection () {
      return this.editMode
        ? this.$store.state.collections[this.id]
        : this.newCollection
    }
  },
  methods: {
    remove (index) {
      this.collection.items.splice(index, 1)
    },
    removeLastEmpty(){
      //remove last element only if empty
      let lastIndex = this.collection.items.length-1
      if(this.collection.items[lastIndex].q === '' && this.collection.items[lastIndex].a === ''){
          this.collection.items.pop()
      }
    },
    add () {
      let lastIndex = this.collection.items.length-1;
      //prevent adding new card if previouse if empty
      if(this.collection.items[lastIndex].q !== '' && this.collection.items[lastIndex].a !== ''){
        this.collection.items.push({...this.emptyCard})
      }else{
        //show message for one second
        this.emptyWarningMessage = true;
        setTimeout(() =>{
          this.emptyWarningMessage = false;
        },1000)
      }
    }
  }
}
</script>

<style scoped>
</style>
