<template>
<div>
<h1>This is {{ label }} placeholder</h1>
<router-link to="/">Home</router-link>
<router-link to="/collection">Collection</router-link>
</div>
</template>

<script>
export default {
  name: 'Lesson',
  data () {
    return {
      label: 'Lesson'
    }
  }
}
</script>