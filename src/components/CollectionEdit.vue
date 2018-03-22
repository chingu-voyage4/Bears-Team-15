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
		  v-if="inputMode"
      v-model.trim="inputValue"
			ref="title"
      type="text" placeholder="Collection name"
      :class="titleClass"
      :autofocus="createMode"
      @focus="focusTitle"
      @blur="blurTitle"
      @keyup.enter="focusNext(-1)"
    >
		<p
			v-else
			@click="inputTitle"
		>{{ displayedTitle }}</p>
    <router-link
      v-if="createMode"
      :to="homeRoute"
    >
      <button>Discard</button>
    </router-link>
  </div>
	<app-card-input
    v-for="(card, index) in collection.items" :key="index"
		@addError="addError"
		@removeError="removeError"
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
		errorCount: 0,
		titleError: false,
		inputMode: false,
		inputValue: '',
    focusedTitle: false,
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
		receivedTitle () {
			return this.collection.collectionName
		},
		displayedTitle () {
			if (this.toSend.collectionName) {
				return this.toSend.collectionName
			} else {
				return this.receivedTitle
			}
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
			return this.errorCount === 0 && !this.titleError
    },
    titleClass () {
      return { error:  this.titleError && !this.focusedTitle }
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
			this.removeError(errCount)
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
		inputTitle () {
			this.inputMode = true
			this.inputValue = this.displayedTitle
      this.$nextTick(() => this.$refs.title.focus())
		},
    focusTitle (index, qa) {
      this.focusedTitle = true
    },
    blurTitle () {
			if (this.inputValue !== '') {
				this.inputMode = false
				this.titleError = false
				// direct mutation, change it:
				this.collection.collectionName = this.inputValue
				this.toSend.collectionName = this.inputValue
			} else {
				this.titleError = true
			}
      this.focusedTitle = false
		},
		addError() {
			this.errorCount += 1
		},
		removeError(count) {
			this.errorCount -= count ? count : 1
			this.errorCount = Math.max(this.errorCount, 0)
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
