<template>
<div
  class="flashcard pointer" :class="cardState"
  @click="flip"
>
  <div class="content">
    <div>
      {{ cardSide }}
    </div>
  </div>
  <div class="overlay"></div>
</div>
</template>

<script>
export default {
  props: ['card'],
  data: () => ({
    question: true
  }),
  computed: {
    cardState () {
      return {
        question: this.question,
        answer: !this.question
      }
    },
    cardSide () {
      return this.question ? this.card.q : this.card.a
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
.flashcard {
  margin: 0 auto;
  width: 200px;
  height: 200px;
  position: relative;
  border-width: 3px;
  border-style: solid;
  border-radius: 20px;
}

.flashcard .content {
  display: table;
}

.flashcard .content > div {
  display: table-cell;
  vertical-align: middle;
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

.flashcard > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.flashcard .overlay {
  z-index: 10;
}

.pointer {
  display: inline-block;
  cursor: pointer;
}
</style>
