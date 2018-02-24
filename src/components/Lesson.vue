<template>
<div>
  <h1>
    <router-link to="/collection">{{ collection.collectionName }}</router-link>
  </h1>
  <div
    @click.stop="nextCard"
    class="pointer"
  >
    <app-card
     :question="question"
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
  data: () => ({
    collection: {
      collectionName: 'Italian words',
      items: [
        {q: 'ciotola', a: 'bowl'},
        {q: 'tazza', a: 'cup'},
        {q: 'forchetta', a: 'fork'},
        {q: 'piatto', a: 'plate'},
        {q: 'scrivania', a: 'desk'},
        {q: 'tavola', a: 'table'},
        {q: 'matita', a: 'pencil'},
        {q: 'penna', a: 'pen'},
        {q: 'quaderno', a: 'exercise book'},
        {q: 'diario', a: 'diary'}
      ]
    },
    index: 0,
    question: true
  }),
  created () {
    this.index = this.randIndex()
  },
  computed: {
    card () {
      const item = this.collection.items[this.index]
      const card = this.question ? item.q : item.a
      return card
    },
    quantity () {
      return this.collection.items.length
    }
  },
  methods: {
    nextCard () {
      if (!this.question) {
        this.index = this.randIndex()
      }
      this.question = !this.question
    },
    randIndex () {
      return Math.floor(Math.random()*(this.quantity))
    }
  }
}
</script>

<style>
.pointer {
  display: inline-block;
  cursor: pointer;
}
</style>
