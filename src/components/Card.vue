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
.flashcard {
  margin: 0 auto;
  width: 200px;
  height: 200px;
  position: relative;
  border-width: 3px;
  border-style: solid;
  border-radius: 20px;
}

.question {
  border-color: #39f;
  font-size: 2rem;
  font-weight: 700;
}

.answer {
  border-color: #aaa;
  font-size: 1.4rem;
}

.flashcard * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.flashcard .content {
  line-height: 200px;
}

.flashcard .overlay {
  z-index: 10;
}
</style>
