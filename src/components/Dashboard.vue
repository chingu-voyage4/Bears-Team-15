<template>
<div>
  <h1>This is {{ label }} placeholder</h1>
  <router-link to="/lesson">Lesson</router-link>
  <router-link to="/collection">Collection</router-link>
</div>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      label: 'Dashboard'
    }
  }
}
</script>