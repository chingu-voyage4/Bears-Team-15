<template>
<div class="dashboard">
  <app-dashboard-link
    v-for="(deck, index) in collections" :key="index"
    :link="{ name: 'collection', params: { id: deck.id } }"
  >{{ deck.collectionName }}</app-dashboard-link>
  
  <app-dashboard-link
    :link="{ name: 'collectionNew' }"
  >+</app-dashboard-link>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Link from '@/components/Dashboard__Link'

export default {
  name: "DashboardPrivate",
  components: {
    appDashboardLink: Link,
  },
  computed: mapState(['collections']),
}
</script>
