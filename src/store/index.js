import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collections: [],
    counter: 1,
    loadingMode: false,
  },
  getters: {
    collection: state => id => {
      return state.collections.find(x => x.id === id)
    },
    alphabeticalDeck: state => id => {
      const collection = state.collections.find(x => x.id === id)
      const deck = [...collection.items]
      deck.sort((prev, next) => {
        if (prev.q.toLowerCase() > next.q.toLowerCase()) return 1
        else if (prev.q.toLowerCase() < next.q.toLowerCase()) return -1
        else return 0
      })
      return deck
    },
  },
  mutations: {
    addCard (state, { id, card }) {
      state.collections.find(x => x.id === id).items.push(card)
    },
    removeCard (state, { id, index }) {
      state.collections.find(x => x.id === id).items.splice(index, 1)
    },
    saveNewCollection (state, id) {
      const toSave = state.collections.find(x => x.id === id)
      toSave.id = state.counter
      state.counter += 1
    },
    deleteCollection (state, id){
      state.collections = state.collections.filter(x => x.id !== id)
    },
    setLoadingMode (state, status) {
      state.loadingMode = status
    },
    readCollections (state, { collections, counter }) {
      state.collections = collections
      state.counter = counter
    },
    saveLocally (state) {
      localStorage.setItem('store', JSON.stringify(state));
    }
  },
  actions: {
    fetchLocalCollections ({ commit }) {
      commit('setLoadingMode', true)
      const loc = localStorage.getItem('store')
      if (loc) {
        commit('readCollections', JSON.parse(loc))
      }
      commit('setLoadingMode', false)
    },
    deleteCollection (context, id) {
      context.commit('deleteCollection', id)
      context.commit('saveLocally')
    },
    saveState (context) {
      context.commit('saveLocally')
    },
    createCollection ({ state, commit }, id) {
      const collection = {
        collectionName: '',
        id,
        items: [{ q: '', a: '' }]
      }
      commit('deleteCollection', id)
      state.collections.push(collection)
    },
    saveNewCollection ({ commit }, id) {
      commit('saveNewCollection', id)
      commit('saveLocally')
    },
  }
})
