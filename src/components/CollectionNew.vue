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
    id: 'temporary',
    saved: false,
  }),
  created () {
    this.$store.dispatch('createCollection', this.id)
  },
  beforeRouteLeave (to, from, next) {
    if (this.saved) {
      this.$store.dispatch('saveNewCollection', this.id)
    } else {
      this.$store.commit('deleteCollection', this.id)
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
