<template>
<div>
<div class="cards-container">
  <app-card
    v-for="item in collection.items" :key="item.id"
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
    collection () {
      const collection = this.$store.state.collections[this.id]
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
</style>
