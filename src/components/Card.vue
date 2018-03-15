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
.flip-container {
  perspective: 1000px;
  margin: 15px;
}

/* flip the pane*/
.flip {
		transform: rotateY(180deg);
    transform-origin: 50%;
	}

.flip-container, .front, .back {
  border-radius: 20px;
  width: 200px;
  height: 16rem;
  line-height: 2rem;
}

.flipper {
  transition: 0.6s;
  transform-style: preserve-3d;
  position: relative;
}

.flipperFast {
  transition: 0;
  transform-style: preserve-3d;
  position: relative;
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

  backface-visibility: hidden;
  background-color: grey;
	position: absolute;
	top: 0;
	left: 0;

  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
  -o-user-select: none;
  user-select: none;
}

.front p, .back p {
  margin: 0;
}

/* front pane, placed above back */
.front {
  background-color: #f1f7fa;
  font-size: 1.75rem;
  font-weight: 700;

	z-index: 2;
	/* for firefox 31 */
	transform: rotateY(0deg);
}

/* back, initially hidden pane */
.back {
  background-color: #fff;
  font-size: 1.4rem;

	transform: rotateY(180deg);
}

.pointer {
  display: inline-block;
  cursor: pointer;
}
</style>
