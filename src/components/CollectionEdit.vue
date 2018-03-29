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
<div v-else>
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
		<app-collection-title
			ref="title"
			:title="title"
			:createMode="createMode"
			@changeTitle="title => changeTitle(title)"
			@addError="addError"
			@removeError="removeError"
		  @focusNext="focusNext(-1)"
		></app-collection-title>
    <router-link
      v-if="createMode"
      :to="homeRoute"
    >
      <button>Discard</button>
    </router-link>
  </div>
	<app-card-input
    v-for="(card, index) in collection.items" :key="index"
		ref="card"
		:card="card.temp? card.temp : card"
		:index="index"
		:last="index === lastIndex"
		@change="x => change(x)"
		@remove="count => remove(index, count)"
		@addError="addError"
		@removeError="removeError"
		@focusNext="index => focusNext(index)"
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
import CollectionTitle from '@/components/CollectionEdit__Title'

export default {
  props: ['id', 'createMode'],
	components: {
		appCardInput: CardInput,
		appCollectionTitle: CollectionTitle,
	},
  data: () => ({
    homeRoute: { name: 'home' },
    emptyCard: { q: '', a: '' },
		errorCount: 0,
		toSend: {
			collectionName: '',
			items: { add: [], del: [], mod: [] }
		},
  }),
	created () {
		if (this.createMode) {
			this.add()
      this.$nextTick(() => {
				this.$refs.title.$refs.title.focus()
			})
		}
	},
  computed: {
    collection () {
      return this.$store.getters.collection(this.id)
    },
		title () {
			const changed = this.collection.collectionNameTemp
			return changed ? changed : this.collection.collectionName
		},
    lastIndex () {
      return this.collection.items.length - 1;
    },
		readyToSave() {
			return this.errorCount === 0
		}
  },
  methods: {
    deleteCollection () {
      this.$store.dispatch('deleteCollection', this.id)
      this.$router.push(this.homeRoute)
    },
    removeDuplicates () {
      this.$store.dispatch('removeDuplicates', this.id)
    },
    save () {
			if (this.readyToSave) {
        if (this.createMode) {
          this.$emit('save')
        } else {
          this.$store.dispatch('updateCollection', this.toSend)
        }

        this.$router.push(this.homeRoute)
			} else {
				this.$store.dispatch('pushNotificationErr', 'Error collection edit')
			}
    },
	  fork(){
	    this.$store.dispatch('fork', this.collection)
	    this.$router.push(this.homeRoute)
	  },
		changeTitle (title) {
			if (title === this.collection.collectionName) {
				delete this.toSend.collectionName
				delete this.collection.collectionNameTemp
			} else {
				this.collection.collectionNameTemp = title
				this.toSend.collectionName = title
			}
		},
		change ({ index, qa, body }) {
			const card = this.collection.items[index]
			if (card._id) {
				if (!card.temp) card.temp = {...card}
				card.temp[qa] = body
				if (card.q === card.temp.q && card.a === card.temp.a) {
				  this.toSend.items.mod = this.toSend.items.mod.filter(x => {
						return x._id.toString() != card.temp._id.toString()
					})
					delete card.temp
				} else {
					const i = this.toSend.items.mod
					  .findIndex(x => x._id.toString() === card.temp._id.toString())
					if (i !== -1) {
						this.toSend.items.mod[i] = card.temp
					} else {
						this.toSend.items.mod.push(card.temp)
					}
				}
			} else {
				card[qa] = body
				this.toSend.items.add[card.index] = card
			}
		},
    remove (index, errCount) {
			// add to change list
			const card = this.collection.items[index]
			if (card._id) {
				this.toSend.items.del.push(card._id)
			} else {
				const addList = this.toSend.items.add
				addList.splice(card.index, 1)
				addList.forEach(x => {
					if (x.index > card.index) x.index -= 1
				})
			}

      const id = this.id
      this.$store.commit('removeCard', { id, index })
			this.removeError(errCount)
    },
    add (cb) {
        const card = { ...this.emptyCard }
        const id = this.id
        this.$store.commit('addCard', { id, card })

				const lastCard = this.collection.items[this.lastIndex]
				const addListLength = this.toSend.items.add.length
				const lastAddElement = this.toSend.items.add[addListLength - 1]
				lastCard.index = lastAddElement ? lastAddElement.index + 1 : 0
				this.toSend.items.add.push(lastCard)

        if (typeof cb === 'function') cb()
    },
		addError() {
			this.errorCount += 1
		},
		removeError(count) {
			this.errorCount -= count ? count : 1
			this.errorCount = Math.max(this.errorCount, 0)
		},
    focusNext (index) {
			const nextCard = this.collection.items[index+1]
			if (!nextCard) {
				this.add(() => {
					this.$nextTick(() =>
					  this.$refs.card[index+1].$refs.q[0].focus()
				  )
				})
			}
			else if (this.$refs.card[index+1].$refs.pq)
				this.$refs.card[index+1].$refs.pq[0].click()
			else this.$refs.card[index+1].$refs.q[0].focus()
    },
  }
}
</script>

<style>
.error {
  border: 1px solid red;
}
.editable {
	cursor: text;
}
.qa {
	display: inline-block;
	width: 150px;
	height: 2em;
}
.qa p {
	text-align: left;
}
.qa * {
	margin: 0;
	width: inherit;
	height: inherit;
}
</style>
