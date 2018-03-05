<template>
<div class="container">
  <div>
    <input
      v-model="collection.collectionName"
      type="text" placeholder="Collection name"
      :class="titleClass">
    <button
      v-if="!createMode"
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
    v-if="createMode"
    @click="save">
  Save</button>
</div>
</template>

<script>
export default {
  props: ['id', 'createMode'],
  data: () => ({
    emptyCard: { q: '', a: '' },
    errors: { q: [], a: [] },
  }),
  beforeRouteLeave (to, from, next) {
    if (this.readyToSave) {
      if (this.lastCardIsNotFilled === 'both') {
        this.remove(this.lastIndex, 1)
      }
      next()
    }
  },
  computed: {
    collection () {
      return this.$store.state.collections[this.id]
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
    titleClass () {
        return { error:  this.collection.collectionName === '' }
    }
  },
  methods: {
    checkLastCard () {
      if (this.readyToSave ) {
        if (this.lastCardIsNotFilled === 'both') {
          this.blur(this.lastIndex, 'q')
          this.blur(this.lastIndex, 'a')
        } else if (this.lastCardIsNotFilled) {
          this.blur(this.lastIndex, this.lastCardIsNotFilled)
        } else {
          return true
        }
      }
      return false
    },
    deleteCollection () {
      this.$store.dispatch('deleteCollection', this.id)
      this.$router.push({ name: 'home' })
    },
    remove (index) {
      const id = this.id
      this.$store.commit('removeCard', { id, index })
      const helper = a => a.filter(x => x !== index)
        .map(x => x > index ? x - 1 : x)
      this.errors.q = helper(this.errors.q)
      this.errors.a = helper(this.errors.a)
    },
    add () {
      if (this.checkLastCard()) {
        const card = { ...this.emptyCard }
        const id = this.id
        this.$store.commit('addCard', { id, card })
      }
    },
    save () {
      if (this.checkLastCard()) {
        this.$emit('save')
        this.$router.push({ name: 'home' })
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
