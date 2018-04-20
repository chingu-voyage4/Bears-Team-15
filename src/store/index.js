import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appVersion: '0.5',
    collections: [],
    publicCollections: [],
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
    saveUser(state, { user, token }){
      state.user = user
      state.token = token
    },
    unsetUser(state){
      state.user = null
      state.token = null
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
    readLocalStorage({ dispatch, commit, state }) {
      commit('setLoadingMode', true)
      const loc = localStorage.getItem('store')
      if (loc) {
        const parsed = JSON.parse(loc)
        if (parsed.token && parsed.user) {
          const token = parsed.token
          const user = parsed.user
          commit('saveUser', { user, token })
        }
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
    /* **********   fetching collections     ************************ */
    async fetchRemoteCollections({ dispatch, commit }) {
      commit('setLoadingMode', true)
      try {
        await dispatch('fetchRemotePublicCollections')
        await dispatch('fetchRemotePrivateCollections')
        commit('saveLocally')
      } catch (err) {
        dispatch('pushNotificationErr', err)
      } finally {
        commit('setLoadingMode', false)
      }
    },
    async fetchRemotePublicCollections({ state }) {
      try {
        const res = await axios({
          method: 'get',
          url: '/collections/public',
        })
        if (!res) throw new Error('No response')
        state.publicCollections = res.data.collections
        return new Promise((resolve, reject) => resolve())
      } catch (err) {
        const message = err.response ? err.response.data : err.message
        return new Promise((resolve, reject) => reject(message))
      }
    },
    async fetchRemotePrivateCollections({ state }) {
      if (!state.token) return;
      try {
        const res = await axios({
          method: 'get',
          url: '/collections/my',
          headers: {'authorization': state.token},
        })
        if (!res) throw new Error('No response')
        state.collections = res.data.collections
        state.collections.forEach(x => x.editable = true)
        return new Promise((resolve, reject) => resolve())
      } catch (err) {
        const message = err.response ? err.response.data : err.message
        return new Promise((resolve, reject) => reject(message))
      }
    },

    /* **********      collection actions    ************************ */
    deleteCollection ({ commit }, id) {
      commit('deleteCollection', id)
      commit('saveLocally')
    },
    updateCollection ({ dispatch, commit, state }, { id, toSend }) {
      commit('setLoadingMode', true)
      // TODO: should be modified to receive `toSend` and save
      // accordingly to the data from this object

      // save to DB
      axios({
        method: 'put',
        url: `/collection/${id}`,
        headers: {'authorization': state.token},
        data: toSend,
      })
        .then(res => {
          if (res) {
            dispatch('pushNotificationSucc', 'updated')
            commit('setLoadingMode', false)
          } else throw new Error('No response')
        })
        .catch(err => {
          commit('setLoadingMode', false)
          dispatch('pushNotificationErr', err.response ? err.response.data : err.message )
        })
      // save locally
      commit('saveLocally')
    },
    createCollection ({ commit }, id) {
      const collection = {
        collectionName: '',
        _id: id,
        items: [],
        editable: true,
      }
      commit('deleteCollection', id)
      commit('pushCollection', collection)
    },
    saveNewCollection ({ dispatch, commit, state }, id) {
      if (!state.token) {
        return dispatch('pushNotificationErr', 'You have to login first')
      }
      commit('setLoadingMode', true)
      const temp = state.collections.find(x => x._id == id)
      temp.collectionName = temp.collectionNameTemp
      const toSend = {
        collectionName: temp.collectionName,
        items: temp.items,
      }
      axios({
        method: 'post',
        url: '/collection/create',
        headers: {'authorization': state.token},
        data: toSend,
      })
        .then(res => {
          if (!res) throw new Error('No response')
          const { _id } = res.data
          temp._id = _id
          delete temp.collectionNameTemp

          commit('saveLocally')
          dispatch('pushNotificationSucc', 'Collection is saved')
        })
        .catch(err => {
          dispatch('pushNotificationErr', err.response ? err.response.statusText : err.message )
        })
        .finally(()=> {
          commit('setLoadingMode', false)
        })
    },
    removeDuplicates ({ commit }, id) {
      commit('removeDuplicates', id)
    },
    fork ({ dispatch, commit, state }, id) {
      if (!state.token) {
        return dispatch('pushNotificationErr', 'You have to login first')
      }
      commit('setLoadingMode', true)
      axios({
        method: 'get',
        url: `/collection/fork/${id}`,
        headers: {'authorization': state.token},
      })
        .then(res => {
          if (!res) throw new Error('No response')
          const collectionCopy = res.data
          collectionCopy.editable = true
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
    /* **********      authentication        ************************ */
    processLogin({ dispatch, commit }, { user, token} ){
      commit('saveUser', { user, token })
      commit('saveLocally')
    },
    processLogout({ commit }){
      commit('unsetUser')
      commit('saveLocally')
    },
    /* **********       notifications        ************************ */
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
