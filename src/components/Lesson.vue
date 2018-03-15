<template>
<div class="cards-container">
  <app-card
    :card="card"
    @nextCard="nextCard"
  ></app-card>
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
  }),
  created () {
    this.index = this.randIndex()
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
    nextCard () {
      this.index = this.randIndex()
    },
    randIndex () {
      return Math.floor(Math.random()*(this.quantity))
    }
  }
}
</script>
