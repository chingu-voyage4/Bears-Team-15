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
