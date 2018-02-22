<template>
<div>
  <router-link to="/">Home</router-link>
  <h1>{{ collection.collectionName }}</h1>
  <div
    @click.stop="nextCard"
    class="pointer"
  >
    <app-card
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
        {q: 'forchetta', a: 'fork'}
      ]
    },
    index: 0,
    question: true
  }),
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
        this.index = (this.index + 1)%this.quantity
      }
      this.question = !this.question
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
