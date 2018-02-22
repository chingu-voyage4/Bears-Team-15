<template>
<div>
  <router-link to="/">Home</router-link>
  <h1>{{ collection.collectionName }}</h1>
  <div
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
  }
}
</script>
