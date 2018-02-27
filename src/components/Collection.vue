<template>
<div>
<h1>This is {{ label }} placeholder</h1>
<router-link to="/">Home</router-link>
<div class="cards-container">
  <app-card class="card"
    v-for="item in collection.items" :key="item.id"
    :question='question'
    > {{ item.q }} </app-card>
</div>
</div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'Collection',
  components: {
    'appCard': Card
  },
  data: () => ({
    label: 'Collection',
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
      ].sort(function(prev, next){
        if(prev.q.toLowerCase() > next.q.toLowerCase()){
          return 1
          }else if(prev.q.toLowerCase() < next.q.toLowerCase()){
            return -1
          }else{
            return 0
          }
        })
    },
    question: true
  })
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

.cards-container .card {
  margin: 15px;
}
</style>