<template>
<div>
<div class="cards-container">
  <app-card
    v-for="item in deck" :key="item.id"
    :card="item"
  ></app-card>
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
.cards-container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 30px;
  max-width:2000px;
  margin: 0 auto;
}
</style>
