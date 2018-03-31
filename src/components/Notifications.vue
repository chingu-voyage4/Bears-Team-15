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
.notifications-container {
  width: 100%;
  position: absolute;
  text-align: center;
}
.notifications-container--sticky {
  position: fixed;
  top: 0px;
}
.notif {
  z-index: 100;
  position: relative;
  padding: .75rem 1.25rem;
  margin: 1rem 1rem 0 1rem;
  border-radius: .25rem;
  border: 1px solid transparent;
  opacity: 0.97;
}
.notif-err {
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
.notif-succ {
  background-color: #d4edda;
  border-color: #c3e6cb;
}
</style>
