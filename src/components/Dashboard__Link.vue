<template>
<div class="deck">
  <router-link
    :to="link"
    class="ellipsis"
  >
    <slot></slot>
  </router-link>
</div>
</template>

<script>
export default {
  name: "DashboardLink",
  props: ['link'],
}
</script>
