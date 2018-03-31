<template>
<div class="cards-container">
  <app-card
    v-if="deck.length"
    v-for="item in deck" :key="item.id"
    :card="item"
    :endlessFlip="true"
  ></app-card>
  <p v-else>No cards in this collection</p>
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
