<template>
<div class="dashboard">
  <div v-for="(deck, index) in collections" :key="index"
  >
    <router-link :to="{ name: 'collection', params: { id: deck.id } }">
      <div class="deck">
        <h3 class="ellipsis">{{ deck.collectionName }}</h3>
      </div>
    </router-link>
  </div>
  <div>
    <router-link :to="{ name: 'collectionNew' }">
      <div class="deck">
        <h3>+</h3>
      </div>
    </router-link>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "DashboardPrivate",
  computed: mapState(['collections']),
}
</script>
