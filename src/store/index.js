import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collections: [
      {
        collectionName: 'Italian words',
        id: '1',
        items: [
          {q: 'ciotola', a: 'bowl'},
          {q: 'tazza', a: 'cup'},
          {q: 'forchetta', a: 'fork'},
          {q: 'piatto', a: 'plate'},
          {q: 'scrivania', a: 'desk'},
          {q: 'tavola', a: 'table'},
          {q: 'matita', a: 'pencil'},
          {q: 'penna', a: 'pen'},
          {q: 'quaderno', a: 'exercise book'},
          {q: 'diario', a: 'diary'},
        ]
      },
      {
        collectionName: 'European Capital Cities',
        id: '2',
        items: [
          {q: 'England', a: 'London'},
          {q: 'France', a: 'Paris'},
          {q: 'Germany', a: 'Berlin'},
          {q: 'Spain', a: 'Madrid'},
          {q: 'Italy', a: 'Rome'},
          {q: 'Scotland', a: 'Edinburgh'},
          {q: 'Wales', a: 'Cardiff'},
          {q: 'Northern Ireland', a: 'Belfast'},
          {q: 'Portugal', a: 'Lisbon'},
          {q: 'Greece', a: 'Athens'},
          {q: 'Austria', a: 'Vienna'},
          {q: 'Switzerland', a: 'Bern'},
          {q: 'Belgium', a: 'Brussels'},
          {q: 'Ireland', a: 'Dublin'},
          {q: 'Netherlands', a: 'Amsterdam'},
          {q: 'Denmark', a: 'Copenhagen'},
          {q: 'Poland', a: 'Warsaw'},
          {q: 'Russia', a: 'Moscow'},
          {q: 'Ukraine', a: 'Kyiv'},
          {q: 'Norway', a: 'Oslo'},
          {q: 'Sweden', a: 'Stockholm'},
          {q: 'Turkey', a: 'Ankara'},
          {q: 'Cyprus', a: 'Nicosia'},
          {q: 'Bulgaria', a: 'Sofia'},
          {q: 'Romania', a: 'Bucharest'},
          {q: 'Iceland', a: 'Reykjavík'},
          {q: 'Luxembourg', a: 'Luxembourg City'},
        ]
      }
    ],
    counter: 3,
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
    collectionQuantity: state => {
      return state.collections.length
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
    readLocalCollections (state, { collections, counter }) {
      state.collections = collections
      state.counter = counter
    },
    saveLocally (state) {
      localStorage.setItem('store', JSON.stringify(state));
    },
    removeDuplicates (state, id){
      const deck = state.collections[id].items
      const arrQ = deck.map((item) => item.q)
      const setQ = new Set(arrQ)
      if(setQ.length == arrQ.length){return}
      let newDeck = []
      setQ.forEach(function(q){
        newDeck.push(deck[arrQ.indexOf(q)])
      })
      state.collections[id].items = newDeck
    },
  },
  actions: {
    initializeStore ({ commit }) {
      const loc = localStorage.getItem('store')
      if (loc) {
        commit('readLocalCollections', JSON.parse(loc))
      }
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
    removeDuplicates (context, id) {
      context.commit('removeDuplicates', id)
    },
  }
})
