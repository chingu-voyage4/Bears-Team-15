<template>
<div class="flip-container pointer" @click="flip" :class="flipClass">
  <div class="flipper">
    <div class="front">
      <p class="ellipsis">{{ card.q }}</p>
    </div>
    <div class="back">
      <p class="ellipsis">{{ card.a }}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['card', 'endlessFlip'],
  data: () => ({
    question: true,
  }),
  computed: {
    flipClass () {
      return {
        flip: !this.question,
        flipper: this.endlessFlip || !this.endlessFlip && !this.question,
        flipperFast: !this.endlessFlip,
      }
    }
  },
  methods: {
    flip () {
      if (!this.question) {
        this.$emit('nextCard')
      }
      this.question = !this.question
    }
  },
}
</script>

<style scoped>
</style>
