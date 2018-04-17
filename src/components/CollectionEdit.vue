<template>
<div class="container collection-edit">
<div v-if="collection.shared">
	This collection is locked! To edit it fork it to your decks.
	<div>
	  <button
		  class="btn btn-add"
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
    <router-link
      v-if="createMode"
      :to="homeRoute"
    >
	    <button class="btn btn-delete">Discard</button>
    </router-link>
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
    class="btn btn-add"
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
				this.$refs.title.inputTitle()
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
		lastCardIsEmpty() {
			return this.lastIndex > -1
			  && this.collection.items[this.lastIndex].q === ''
				&& this.collection.items[this.lastIndex].a === ''
		},
		notReadyToSave() {
			if (this.errorCount === 0) {
			  return false
			} else {
				if (this.lastCardIsEmpty && this.errorCount === 2) {
					this.remove(this.lastIndex, 2)
					return false
				}
				if (this.$refs.title.inputValue === '') {
					return 'emptyTitle'
				}

				return 'emptyFields'
			}
		}
  },
  methods: {
    deleteCollection () {
      this.$store.dispatch('deleteCollection', this.id)
			this.pushMsg('succ', 'collectionDeleted')
      this.$router.push(this.homeRoute)
    },
    removeDuplicates () {
      this.$store.dispatch('removeDuplicates', this.id)
			this.pushMsg('succ', 'removedDuplicates')
    },
    save () {
			if (!this.notReadyToSave) {
        if (this.createMode) {
          this.$emit('save')
        } else {
          this.$store.dispatch('updateCollection', this.id, this.toSend)
        }
				this.pushMsg('succ', 'collectionSaved')
        this.$router.push(this.homeRoute)
			} else {
				this.pushMsg('err', this.notReadyToSave)
			}
    },
	  fork(){
	    this.$store.dispatch('fork', this.id)
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
			if (!this.lastCardIsEmpty) {
        const card = { ...this.emptyCard }
        const id = this.id
        this.$store.commit('addCard', { id, card })

				const lastCard = this.collection.items[this.lastIndex]
				const addListLength = this.toSend.items.add.length
				const lastAddElement = this.toSend.items.add[addListLength - 1]
				lastCard.index = lastAddElement ? lastAddElement.index + 1 : 0
				this.toSend.items.add.push(lastCard)

        if (typeof cb === 'function') cb()
			} else this.pushMsg('err', 'lastEmpty')
    },
		addError() {
			this.errorCount += 1
		},
		removeError(count) {
			this.errorCount -= count ? count : 1
			this.errorCount = Math.max(this.errorCount, 0)
		},
    focusNext (index) {
			if (this.$refs.title.inputValue !== '') {
				const thisIsLastEmpty = index === this.lastIndex && this.lastCardIsEmpty
				if (!thisIsLastEmpty) {
					if (!this.notReadyToSave) {
						const nextCard = this.collection.items[index+1]
						if (!nextCard) {
							this.add(() => this.$nextTick(() => this.$refs.card[index+1].input('q')))
						} else this.$refs.card[index+1].input('q')

					} else this.pushMsg('err', 'emptyFields')
				} else this.pushMsg('err', 'lastEmpty')
			} else this.pushMsg('err', 'emptyTitle')

    },
		pushMsg(type, msg) {
			const action = type === 'err' ? 'pushNotificationErr' : 'pushNotificationSucc'
			const message = {
				lastEmpty: 'You already opened empty card',
				emptyFields: 'Please fill all empty fields',
				emptyTitle: 'Please fill collection name',
			  collectionSaved: 'Collection is saved',
				collectionDeleted: 'Collection is deleted',
			}
			this.$store.dispatch(action, message[msg] ? message[msg] : msg)
		},
  }
}
</script>

<style>
</style>
