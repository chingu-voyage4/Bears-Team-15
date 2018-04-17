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
    notifications: [],
    token: null,
    user: null
  },
  getters: {
    collection: state => id => {
      return state.collections.find(x => x._id == id) ||
        state.publicCollections.find(x => x._id == id)
    },
    alphabeticalDeck: state => id => {
      const collection = state.collections.find(x => x._id == id) ||
        state.publicCollections.find(x => x._id == id)
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
      state.collections.find(x => x._id == id).items.push(card)
    },
    removeCard (state, { id, index }) {
      state.collections.find(x => x._id == id).items.splice(index, 1)
    },
    saveNewCollection (state, id) {
      const toSave = state.collections.find(x => x.id == id)
      toSave.id = state.counter
      state.counter += 1
    },
    deleteCollection (state, id){
      state.collections = state.collections.filter(x => x._id != id)
    },
    setLoadingMode (state, status) {
      state.loadingMode = status
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
    changeToken(state, token){
      state.token = token
    },
    saveUser(state, user){
      state.user = user
    },
    unsetToken(state){
      state.token = null
    },
    unsetUser(state){
      state.user = null
    },
    /* ***     notifications     ***  */
    dismissNotification(state, { iat, delay }) {
      const delayMs = delay*1000 || 0
      setTimeout(() => {
        state.notifications = state.notifications.filter(x => x.iat !== iat)
      }, delayMs)
    },
  },
  actions: {
    fetchLocalCollections ({ dispatch, commit, state }) {
      commit('setLoadingMode', true)
      const loc = localStorage.getItem('store')
      if (loc) {
        const parsed = JSON.parse(loc)
        const ver = parsed.appVersion
        if (ver) {
          if (ver == state.appVersion) {
            state.collections = parsed.collections
          } else {
            dispatch('pushNotificationErr', 'Your locally saved data is incompatible with current version. Please connect to network to see your private collections')
          }
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
          console.error(err.response ? err.response.statusText : err.message )
        })
    },
    deleteCollection ({ commit }, id) {
      commit('deleteCollection', id)
      commit('saveLocally')
    },
    updateCollection ({ commit }, toSend) {
      // TODO: should be modified to receive `toSend` and save
      // accordingly to the data from this object
      commit('saveLocally') // save locally
      // save to DB
    },
    createCollection ({ commit }, id) {
      const collection = {
        collectionName: '',
        id,
        items: [],
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
    fork ({ dispatch, commit, state }, id) {
      if (!state.token) {
        return dispatch('pushNotificationErr', 'You have to login first')
      }
      axios({
        method: 'get',
        url: `/collection/fork/${id}`,
        headers: {'authorization': state.token},
      })
        .then(res => {
          if (!res) throw new Error('No response')
          const collectionCopy = res.data
          commit('pushCollection', collectionCopy)
          dispatch('pushNotificationSucc', 'This collection is now in your list')
          commit('saveLocally')
        })
        .catch(err => {
          dispatch('pushNotificationErr', err.response ? err.response.statusText : err.message )
        })
        .finally(()=> {
          commit('setLoadingMode', false)
        })
    },
    processLogin({ commit }, { user, token} ){
      commit('saveUser', user)
      commit('changeToken', token)
      commit('saveLocally')
    },
    processLogout({ commit }){
      commit('unsetUser')
      commit('unsetToken')
      commit('saveLocally')
    },
    /* ***     notifications     ***  */
    pushNotification({ commit, state }, { type, msg }) {
      let iat = Date.now()
      const notificationsLength = state.notifications.length
      if (notificationsLength) {
        const lastIssuedAt = state.notifications[notificationsLength - 1].iat
        while (iat <= lastIssuedAt) iat++
      }
      state.notifications = state.notifications
        .filter(x => !(x.msg === msg && x.type === type))
      state.notifications.unshift({ type, msg, iat })
      commit('dismissNotification', { iat, delay: 5 })
    },
    pushNotificationSucc({ dispatch, commit }, msg) {
      dispatch('pushNotification', { msg, type: 'succ' })
    },
    pushNotificationErr({ dispatch, commit }, msg) {
      dispatch('pushNotification', { msg, type: 'err' })
    }
  }
})
