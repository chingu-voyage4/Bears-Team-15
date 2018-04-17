<template>
<div class="dashboard">
  <app-dashboard-link
    v-for="(deck, index) in publicCollections" :key="index"
    :link="{ name: 'collection', params: { id: deck._id } }"
  >{{ deck.collectionName }}</app-dashboard-link>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Link from '@/components/Dashboard__Link'

export default {
  name: "DashboardPublic",
  components: {
    appDashboardLink: Link,
  },
  computed: mapState(['publicCollections']),
}
</script>
