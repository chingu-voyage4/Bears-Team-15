<template>
<div>
  <h1>collection parent</h1>
  <router-view/>
</div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
}
</script>

<style scoped>
</style>
