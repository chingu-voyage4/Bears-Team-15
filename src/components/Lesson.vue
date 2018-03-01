<template>
<div>
  <h1>
    {{ collection.collectionName }}
  </h1>
  <div>
    <app-card
      :card="card"
      @nextCard="nextCard"
    > {{ card }} </app-card>
  </div>
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
      return this.$store.state.collections[this.id]
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
