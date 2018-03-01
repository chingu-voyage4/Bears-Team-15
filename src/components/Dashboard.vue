<template>
<div>
  <h1>{{ greeting }}</h1>
  <div class="dashboard">
    <div class="spacer"></div>
    <div v-for="(deck, index) in collections" :key="index">
      <router-link :to="{ name: 'collection', params: { id: index } }">
        <div class="deck">
          <h3>{{ collections[index].collectionName }}</h3>
        </div>
      </router-link>
    </div>
    <div>
      <router-link :to="{ name: 'collectionNew' }">
        <div class="deck">
          <h3>+</h3>
        </div>
      </router-link>
    </div>
    <div class="spacer"></div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Dashboard",
  data: () => ({
    greeting: 'Welcome to Bears-15 Cards!',
  }),
  computed: mapState(['collections']),
}
</script>

<style scoped>
.dashboard {
  width: 80%;
  min-height: 400px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.deck {
  width: 140px;
  height: 80px;
  margin: 40px;
  padding: 60px 0;
  background: rgb(240, 240, 240);
  border-radius: 10px;
  box-shadow: 2px 5px 0px rgb(200, 200, 200),
    4px 10px 0px rgb(180, 180, 180),
    12px 15px 10px rgba(0, 0, 0, 0.2);
}
/*
.spacer {
  width: 33%;
  margin: 0 auto;
}*/
</style>
