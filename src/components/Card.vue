<template>
<div
  class="flashcard pointer" :class="cardState"
  @click="flip"
>
  <div class="content">
    {{ cardSide }}
  </div>
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
  display: flex;
  margin: 15px;
  width: 200px;
  height: 200px;
  border-width: 3px;
  border-style: solid;
  border-radius: 20px;

  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
  -o-user-select: none;
  user-select: none;
}

.flashcard .content {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
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

.pointer {
  display: inline-block;
  cursor: pointer;
}
</style>
