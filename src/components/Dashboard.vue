<template>
<div class="dashboard">
  <div class="spacer"></div>
  <div>
    <router-link to="/lesson">
      <div class="lesson">  
        <h3>{{ collection[0].name }}</h3>
      </div>
    </router-link>
  </div>
  <div class="spacer"></div>
</div>
</template>

<script>
export default {
  name: "Dashboard",
  data () {
    return {
      label: "Dashboard",
      collection: [ 
        { name: "Lesson 1" },
        { name: "Lesson 2" },
        { name: "Lesson 3" }
      ] 
    }
  }
}

</script>

<style>

.dashboard {
  width: 80%;
  height: 400px;
  margin: 0 auto;
  display: flex;
}

a {
  text-decoration: none;
  color: black;
}

.lesson {
  width: 140px;
  height: 80px;
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 40px;
  padding: 60px 0;
  background: rgb(240,240,240);
  border-radius: 10px;
  box-shadow: 2px 5px 0px rgb(200,200,200),4px 10px 0px rgb(180,180,180), 12px 15px 10px rgba(0,0,0,0.2);
}

.spacer {
  width: 33%;
  margin: 0 auto;
}

</style>