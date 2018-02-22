<template>
<header>
  <div class="content">
    <img src="../assets/logo-placeholder.png" />
    <router-link to="/">Home</router-link>
  </div>
</header>
</template>

<script>
export default {
  data: () => ({
    
  })
}
</script>

<style scoped>
header{
  min-height: 50px;
  background-color: #0077b3;
  color: white;
}

.content{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

a{
  color: white;
  font-size: 2em;
  padding: 0 10px;
}

img{
  height: 50px;
  margin: 10px;
}
</style>