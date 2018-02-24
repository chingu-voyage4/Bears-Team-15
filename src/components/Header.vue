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
  height: 70px;
  background-color: #0077b3;
  color: white;
}

.content{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
}

a{
  color: white;
  font-size: 2em;
}

img{
  height: 50px;
  margin: 10px 0;
}
</style>