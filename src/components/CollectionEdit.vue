<template>
<div class="container">
  <div>
    <input
      v-model="collection.collectionName"
      type="text" placeholder="Collection name"
      :class="{error : titleClass }">
    <button
      @click="deleteCollection"
    >Delete Collection</button>
  </div>
  <div
    class="card"
    v-for="(card, index) in collection.items" :key="index"
  >
    <input
      type="text" v-model="card.q" placeholder="Question"
      @blur="blur(index, 'q')"
      ref="q"
      :class="inputClass(index, 'q')"
    >
    <input
      type="text" v-model="card.a" placeholder="Answer"
      @blur="blur(index, 'a')"
      ref="a"
      :class="inputClass(index, 'a')"
    >
    <button
      @click="remove(index)"
    >X</button>
  </div>
  <button
    class="btn btn-add newCard"
    @click="add"
  >Add</button>
  <button
    class="btn btn-save"
    v-if="!editMode"
    @click="save">
  Save</button>
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
      items: [{ q: '', a: '' }]
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
    lastCardIsNotFilled () {
      if (this.lastIndex === -1) return null
      const lastCard = this.collection.items[this.lastIndex]
      if (lastCard.q === '') {
        if (lastCard.a === '') {
          return 'both'
        }
        return 'q'
      } else if (lastCard.a === ''){
        return 'a'
      }
      return null
    },
    readyToSave () {
      return this.errors.q.length === 0
        && this.errors.a.length === 0 ? true : false
    },
    readyToSaveCollection () {
      if (this.editMode) return false
      this.findEmptyInCards()
      return this.errors.q.length === 0
        && this.errors.a.length === 0 ? true : false
    },
    titleClass () {
        return this.collection.collectionName === ''
    }
  },
  methods: {
    deleteCollection (){
      this.$store.dispatch('deleteCollection', this.id)
    },
    remove (index) {
      this.collection.items.splice(index, 1)
      this.$store.commit('increment') // update state
      const helper = a => a.filter(x => x !== index)
        .map(x => x > index ? x - 1 : x)
      this.errors.q = helper(this.errors.q)
      this.errors.a = helper(this.errors.a)
    },
    removeLastEmpty(){
      if (this.lastCardIsNotFilled === 'both') {
        this.collection.items.pop()
        this.$store.commit('increment') // update state
      }
    },
    add () {
      if (this.readyToSave ) {
        if (this.lastCardIsNotFilled === 'both') {
          this.blur(this.lastIndex, 'q')
          this.blur(this.lastIndex, 'a')
        } else if (this.lastCardIsNotFilled) {
          this.blur(this.lastIndex, this.lastCardIsNotFilled)
        } else {
          this.collection.items.push({...this.emptyCard})
          this.$store.commit('increment') // make sure to do this on every change
                                          // otherwise local storage wont work as
                                          // vuex won't register state change
        }
      }
    },
    save () {
     if (this.readyToSave ) {
        if (this.lastCardIsNotFilled === 'both') {
          this.blur(this.lastIndex, 'q')
          this.blur(this.lastIndex, 'a')
        } else if (this.lastCardIsNotFilled) {
          this.blur(this.lastIndex, this.lastCardIsNotFilled)
        } else {
          this.$store.state.collections.push(this.collection)
          this.$store.commit('increment') // make sure to do this on every change
                                          // otherwise local storage wont work as
                                          // vuex won't register state change
          this.$router.push({ name: 'home' })
        }
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
    },
    inputClass (index, qa) {
      return {
        error: this.errors[qa]
          .filter( x => x === index).length > 0 ? true : false
      }
    }
  }
}
</script>

<style scoped>
.error {
  border: 1px solid red;
}

.btn {
  color: #fff;
  border: none;
  padding: .5em 1.0em .5em;
  margin: 5px;
  font: inherit;
  cursor: pointer;
  outline: 0;
  display: inline-block;
  border-radius: 1em/50%;
}


.btn-add {
  background-color: #7db85e;
}

.btn-save {
  background-color: #2185d0;
}

.btn-save:hover {
  background-color:  #1678c2;
}

.btn-save:active {
  background-color:  #1a69a4;
}

</style>
