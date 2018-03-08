<template>
<div class="flip-container pointer" @click="flip" :class="flipClass">
  <div class="flipper">
    <div class="front">
      {{ card.q }}
    </div>
    <div class="back">
      {{ card.a }}
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
    cardState () {
      return {
        question: this.question,
        answer: !this.question
      }
    },
    cardSide () {
      return this.question ? this.card.q : this.card.a
    },
    flipClass () {
      if(this.endlessFlip){  
        return {
          flip: !this.question,
          flipper: true
        }
      }else{
        return {
          flip: !this.question,
          flipper: !this.question,
          flipperFast: true
        }
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
	height: 250px;
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
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;

  text-align: center;
  margin: auto;
  width: 200px;
  height: 250px;
  border: none;
  border-radius: 20px;
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

/* front pane, placed above back */
.front {
  background-color: #f1f7fa;
  font-size: 2rem;
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
