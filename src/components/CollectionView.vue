<template>
<div>
<div v-if="deck.length" class="cards-container">
  <app-card
    v-for="item in deck" :key="item.id"
    :card="item"
    :endlessFlip="true"
  ></app-card>
</div>
<div v-else class="cards-container">
  <p>No cards in this collection</p>
</div>
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
