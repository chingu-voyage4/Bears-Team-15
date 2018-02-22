<template>
<div>
  <router-link to="/">Home</router-link>
  <h1>{{ collection.collectionName }}</h1>
</div>
</template>

<script>
export default {
  name: 'Lesson',
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
