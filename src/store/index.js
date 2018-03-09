import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collections: [
      {
        collectionName: 'Italian words',
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
  },
  getters: {
    alphabeticalDeck: state => index => {
      const deck = [...state.collections[index].items]
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
      state.collections[id].items.push(card)
    },
    removeCard (state, { id, index }) {
      state.collections[id].items.splice(index, 1)
    },
    createCollection (state, { collection }) {
      state.collections.push(collection)
    },
    deleteCollection (state, id){
      state.collections[id] = null
    },
    removeCollection (state, id) {
      state.collections.splice(id, 1)
    },
    initialiseStore (state) {
      // load from local storage
      const loc = localStorage.getItem('store')
      if (loc) {
        this.replaceState(Object.assign(state, JSON.parse(loc)))
      }
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
    }
  },
  actions: {
    deleteCollection (context, id) {
      context.commit('deleteCollection', id)
    },
    removeDuplicates (context, id) {
      context.commit('removeDuplicates', id)
    }
  }
})
