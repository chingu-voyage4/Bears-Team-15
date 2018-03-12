<template>
<div class="dashboard">
  <div v-for="(deck, index) in publicCollections" :key="index"
  >
    <router-link :to="{ name: 'collection', params: { id: deck.id } }">
      <div class="deck">
        <h3 class="ellipsis">{{ deck.collectionName }}</h3>
      </div>
    </router-link>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "DashboardPublic",
  computed: mapState(['publicCollections']),
  beforeCreate () {
    this.$store.dispatch('fetchRemoteCollections')
  },
}
</script>
