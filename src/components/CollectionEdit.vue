<template>
<div class="container">
<div v-if="collection.shared">
	This collection is locked! To edit it fork it to your decks.
	<div>
	  <button class="btn btn-delete"
        @click="fork"
      >Fork</button>
	</div>
</div>
<div v-if="!collection.shared">
  <div>
    <button class="btn btn-delete"
      v-if="!createMode"
      @click="deleteCollection"
    >Delete Collection</button>
    <button class="btn btn-delete"
      @click="removeDuplicates"
    >Remove Duplicates</button>
  </div>
  <div>
    <input
      v-model.trim="collection.collectionName"
      type="text" placeholder="Collection name"
      :class="titleClass"
      :autofocus="createMode"
      @focus="focus(null, 'title')"
      @blur="onBlur(null, 'title')"
      @keyup.enter="focusNext($event.target, 'title')"
    >
    <router-link
      v-if="createMode"
      :to="homeRoute"
    >
      <button>Discard</button>
    </router-link>
  </div>
	<app-card-input
    v-for="(card, index) in collection.items" :key="index"
	></app-card-input>
  <button
    class="btn btn-add newCard"
    @click="add"
  >Add</button>
  <button
    class="btn btn-save"
    @click="save">
  Save</button>
</div>
</div>
</template>

<script>
import CardInput from '@/components/CollectionEdit__Card'

export default {
  props: ['id', 'createMode'],
	components: {
		appCardInput: CardInput,
	},
  data: () => ({
    homeRoute: { name: 'home' },
    emptyCard: { q: '', a: '' },
    errors: { q: [], a: [] },
    focused: { qa: '', index: null }
  }),
  beforeRouteLeave (to, from, next) {
    if (this.collection) {
      if (this.readyToSave) {
        if (this.lastCardIsNotFilled === 'both') {
          this.remove(this.lastIndex, 1)
        }
        next()
      }
    } else {
      next()
    }
  },
  computed: {
    collection () {
      return this.$store.getters.collection(this.id)
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
        && this.errors.a.length === 0
        && !this.titleError
    },
    titleError () {
      return this.collection.collectionName === ''
    },
    titleClass () {
      return { error:  this.titleError && this.focused.qa !== 'title' }
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
      this.$router.push(this.homeRoute)
    },
    removeDuplicates () {
      this.$store.dispatch('removeDuplicates', this.id)
    },
    remove (index) {
      const id = this.id
      this.$store.commit('removeCard', { id, index })
      const helper = a => a.filter(x => x !== index)
        .map(x => x > index ? x - 1 : x)
      this.errors.q = helper(this.errors.q)
      this.errors.a = helper(this.errors.a)
    },
    add (cb) {
      if (this.checkLastCard()) {
        const card = { ...this.emptyCard }
        const id = this.id
        this.$store.commit('addCard', { id, card })
        if (typeof cb === 'function') cb()
      }
    },
    save () {
      if (this.checkLastCard()) {
        if (this.createMode) {
          this.$emit('save')
        } else {
          this.$store.dispatch('saveState')
        }
        this.$router.push(this.homeRoute)
      }
    },
    focus (index, qa) {
      this.focused = { index, qa }
    },

	  fork(){
	    this.$store.dispatch('fork', this.collection)
	    this.$router.push(this.homeRoute)
	  }
  }
}
</script>

<style scoped>
</style>
