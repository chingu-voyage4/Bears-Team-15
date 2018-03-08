<template>
<div class="homepage">
  <app-header/>
  <router-view/>
  <app-footer/>
</div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'Homepage',
  components: {
    'appHeader': Header,
    'appFooter': Footer,
  },
  beforeCreate() {
    this.$store.dispatch('initializeStore')
  },
}
</script>
