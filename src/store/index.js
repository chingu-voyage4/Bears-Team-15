import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appVersion: '0.4',
    collections: [],
    publicCollections: [],
    counter: 1,
    loadingMode: false,
  },
  getters: {
    collection: state => id => {
      return state.collections.find(x => x.id == id) ||
        state.publicCollections.find(x => x.id == id)
    },
    alphabeticalDeck: state => id => {
      const collection = state.collections.find(x => x.id == id) ||
        state.publicCollections.find(x => x.id == id)
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
      state.collections.find(x => x.id == id).items.push(card)
    },
    removeCard (state, { id, index }) {
      state.collections.find(x => x.id == id).items.splice(index, 1)
    },
    saveNewCollection (state, id) {
      const toSave = state.collections.find(x => x.id == id)
      toSave.id = state.counter
      state.counter += 1
    },
    deleteCollection (state, id){
      state.collections = state.collections.filter(x => x.id != id)
    },
    setLoadingMode (state, status) {
      state.loadingMode = status
    },
    readCollections (state, { collections, counter }) {
      state.collections = collections
      state.counter = counter
    },
    readPublicCollections (state, { collections }) {
      state.publicCollections = collections
    },
    saveLocally (state) {
      localStorage.setItem('store', JSON.stringify(state));
    },
    removeDuplicates (state, id){
      const collection = state.collections.find(x => x.id == id)
      const deck = collection.items
      const arrQ = deck.map((item) => item.q)
      const setQ = new Set(arrQ)
      if(setQ.length == arrQ.length){return}
      let newDeck = []
      setQ.forEach(function(q){
        newDeck.push(deck[arrQ.indexOf(q)])
      })
      collection.items = [...newDeck]
    },
    pushCollection(state, collection){
      state.collections.push(collection)
    },
  },
  actions: {
    fetchLocalCollections ({ commit, state }) {
      commit('setLoadingMode', true)
      const loc = localStorage.getItem('store')
      if (loc) {
        const parsed = JSON.parse(loc)
        const ver = parsed.appVersion
        if (ver && ver >= state.appVersion) {
          console.log(ver)
          commit('readCollections', parsed)
        }
      }
      commit('setLoadingMode', false)
    },
    fetchRemoteCollections ({ commit }) {
      commit('setLoadingMode', true)
      axios({
        method: 'get',
        url: '/collections/public',
        headers: {'x-auth': 'im-the-user'},
      })
        .then(res => {
          if (res) {
            commit('readPublicCollections', res.data)
            commit('setLoadingMode', false)
          } else throw new Error('No response')
        })
        .catch(err => {
          commit('setLoadingMode', false)
          console.log(err.response ? err.response.statusText : err.message )
        })
    },
    deleteCollection ({ commit }, id) {
      commit('deleteCollection', id)
      commit('saveLocally')
    },
    saveState ({ commit }) {
      commit('saveLocally')
    },
    createCollection ({ commit }, id) {
      const collection = {
        collectionName: '',
        id,
        items: [{ q: '', a: '' }]
      }
      commit('deleteCollection', id)
      commit('pushCollection', collection)
    },
    saveNewCollection ({ commit }, id) {
      commit('saveNewCollection', id)
      commit('saveLocally')
    },
    removeDuplicates ({ commit }, id) {
      commit('removeDuplicates', id)
    },
    fork ({ commit }, collection) {
      const collectionCopy = {...collection}
      collectionCopy.shared = false
      commit('pushCollection', collectionCopy)
      commit('saveNewCollection', collectionCopy.id)
      commit('saveLocally')
    }
  }
})
