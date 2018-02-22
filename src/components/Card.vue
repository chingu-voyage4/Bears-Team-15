<template>
<div class="flashcard" :class="cardState">
  <div class="content">
    <slot> Card </slot>
  </div>
  <div class="overlay"></div>
</div>
</template>

<script>
export default {
  props: ['question'],
  computed: {
    cardState: function () {
      return {
        question: this.question,
        answer: !this.question
      }
    }
  }
}
</script>

<style scoped>
</style>
