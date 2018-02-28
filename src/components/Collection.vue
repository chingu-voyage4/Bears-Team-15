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
import { mapState } from 'vuex'

export default {
  name: 'Collection',
  components: {
    'appCard': Card
  },
  data: () => ({
    label: 'Collection',    
    question: true
  }),
  computed: {
    ...mapState(['collections']),
    collection () {
      let collection = this.collections[1]
      collection.items.sort(function(prev, next){
        if(prev.q.toLowerCase() > next.q.toLowerCase()){
          return 1
          }else if(prev.q.toLowerCase() < next.q.toLowerCase()){
            return -1
          }else{
            return 0
          }
        })
      return collection
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

.cards-container .card {
  margin: 15px;
}
</style>
