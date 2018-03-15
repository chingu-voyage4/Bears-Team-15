<template>
<div class="cards-container">
  <app-card
    v-for="item in deck" :key="item.id"
    :card="item"
    :endlessFlip="true"
  ></app-card>
</div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'CollectionView',
  components: {
    'appCard': Card
  },
  props: {
    id: { required: true }
  },
  computed: {
    deck () {
      return this.$store.getters.alphabeticalDeck(this.id)
    }
  }
}
</script>

<style scoped>
</style>
