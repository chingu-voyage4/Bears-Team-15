<template>
<div>
  <h1>collection new</h1>
  <app-collection-edit
    :id="id"
    :createMode="true"
    @save="save"
  />
</div>
</template>

<script>
import CollectionEdit from '@/components/CollectionEdit'

export default {
  components: {
    appCollectionEdit: CollectionEdit,
  },
  data: () => ({
    id: null,
    newCollection: {
      collectionName: '',
      items: [{ q: '', a: '' }]
    },
    saved: false,
  }),
  created () {
    const collection = { ...this.newCollection }
    this.$store.commit('createCollection', { collection })
    this.id = this.$store.getters.collectionQuantity - 1
  },
  beforeRouteLeave (to, from, next) {
    if (this.saved) {
      this.$store.dispatch('saveState')
    } else {
      this.$store.commit('removeCollection', this.id)
    }
    next()
  },
  methods: {
    save () {
      this.saved = true
    }
  },
}
</script>

<style scoped>
</style>
