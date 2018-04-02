<template>
<div class="cards-container lesson">
  <transition
    v-if="card"
    name="bounce"
  >
    <app-card
      v-if="showCard"
      :card="card"
      @nextCard="nextCard(600)"
    ></app-card>
  </transition>
  <p v-else>No cards in this collection</p>
</div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'Lesson',
  components: {
    appCard: Card
  },
  props: {
    id: { required: true }
  },
  data: () => ({
    index: 0,
    showCard: false,
  }),
  created () {
    this.nextCard(100)
  },
  computed: {
    collection () {
      return this.$store.getters.collection(this.id)
    },
    card () {
      return this.collection.items[this.index]
    },
    quantity () {
      return this.collection.items.length
    }
  },
  methods: {
    nextCard(delay) {
      this.showCard = false
      this.index = this.randIndex()
      const self = this
      setTimeout(() => {
        self.showCard = true
      }, delay)
    },
    randIndex () {
      return Math.floor(Math.random()*(this.quantity))
    }
  }
}
</script>
