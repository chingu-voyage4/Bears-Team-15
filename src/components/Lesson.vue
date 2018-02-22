<template>
<div>
<h1>This is {{ label }} placeholder</h1>
<router-link to="/">Home</router-link>
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