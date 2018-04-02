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
      }
    }
  },
  methods: {
    flip () {
      if (this.endlessFlip) {
        this.question = !this.question
      } else {
        if(this.question) {
          this.question = !this.question
        } else this.$emit('nextCard')
      }
    }
  },
}
</script>
