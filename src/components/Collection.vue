<template>
<div>
<h1>This is {{ label }} placeholder</h1>
<router-link to="/home">Home</router-link>
</div>
</template>

<script>
export default {
  name: 'Collection',
  data () {
    return {
      label: 'Collection'
    }
  }
}
</script>