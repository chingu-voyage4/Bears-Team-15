<template>
<header>
  <div class="content">
    <span>
      <img src="../assets/logo-placeholder.png" />
      <router-link to="/">Home</router-link>
    </span>
    <p v-if="loadingMode">Loading...</p>       
    <router-link to="/login">Login</router-link>    
  </div>
</header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['loadingMode']),
}
</script>

<style scoped>
header{
  height: 70px;
  background-color: #0077b3;
  color: white;
}

.content{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 3vw;
}

.content span{
  display: flex;
  align-items: center;
}

a{
  color: white;
  font-size: 2em;
}

img{
  height: 50px;
  margin: 10px 10px 10px 0;
}
</style>
