<template>
<div>
  <router-link to="/">Home</router-link>
  <h1>{{ label }}</h1>
</div>
</template>

<script>
export default {
  name: 'Lesson',
  data: () => ({
    label: 'Lesson'
  })
}
</script>
