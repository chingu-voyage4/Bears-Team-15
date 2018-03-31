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

/* *******************
*   just  styling
* ******************* */

.flip-container {
  margin: 15px;
}

.flip-container, .front, .back {
  border-radius: 20px;
  width: 200px;
  height: 16rem;
  line-height: 2rem;
}

.front, .back {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  text-align: center;
  margin: auto;

  border: none;
  box-shadow: 2px 2px 15px rgb(140, 140, 140);
}

.front {
  background-color: #f1f7fa;
  font-size: 1.75rem;
  font-weight: 700;
}

.back {
  background-color: #fff;
  font-size: 1.4rem;
}


/* *******************
*    flipping logic:
* ******************* */

.flip-container {
  position: relative;
  /*perspective: 1000px;*/
}

.flip {
  transform: rotateY(180deg);
  /*transform-origin: 50%;*/
}

.flipper, .flipperFast {
  transform-style: preserve-3d;
  position: relative;
}

.flipper {
  transition: 0.6s;
}

.flipperFast {
  transition: 0;
}

.front, .back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
}

.front {
  /*z-index: 2;*/
  transform: rotateY(0deg);
}

.back {
  transform: rotateY(180deg);
}
</style>
