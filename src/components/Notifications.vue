<template>
<div :class="containerClass">
  <div
    class="notif"
    :class="notificationClass(item)"
    v-for="(item, index) in notifications" :key="index"
    @click="dismiss(item.iat)"
  >
    {{ item.msg }}
  </div>
</div>
</template>

<script>
export default {
  name: 'Notifications',
  data: () => ({
    scrollPosition: null,
  }),
  mounted() {
    window.addEventListener('scroll', this.updateScrollPosition)
  },
  destroy() {
    window.removeEventListener('scroll', this.updateScrollPosition)
  },
  computed: {
    notifications() {
      return this.$store.state.notifications
    },
    containerClass() {
      return {
        'notifications-container': true,
        'notifications-container--sticky': this.scrollPosition >= 70
        // 70 = Header's height
      }
    },
  },
  methods: {
    updateScrollPosition() {
      this.scrollPosition = window.scrollY
    },
    notificationClass(item) {
      return {
        'notif-succ': item.type == 'succ',
        'notif-err': item.type == 'err',
      }
    },
    dismiss(iat) {
      this.$store.commit('dismissNotification', { iat })
    }
  },
}
</script>

<style scoped>
</style>
