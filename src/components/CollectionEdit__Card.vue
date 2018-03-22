<template>
<div class="card">
	<div class="qa"
	  v-for="(qa, index) in ['q', 'a']" :key="index"
	>
	  <input
			v-if="inputMode[qa]"
	    type="text" v-model.trim="inputs[qa]" :placeholder="placeholders[qa]"
      :ref="qa"
			@focus="focus(qa)"
			@blur="blur(qa)"
	    :class="inputClass(qa)"
	    @keyup.enter="focusNext(qa)"
	  >
		<p
			class="ellipsis"
	    :ref="'p'+qa"
			v-else
			@click="input(qa)"
		>{{ received[qa] }}</p>
	</div>
  <button
	  @click="remove"
  >X</button>
</div>
</template>

<script>
export default {
  props: [ 'index', 'card' ],
  data: () => ({
		placeholders: { q: 'Question', a: 'Answer' },
		inputMode: { q: false, a: false },
		focused: { q: false, a: false },
		errors: { q: false, a: false },
		inputs: { q: '', a: '' },
  }),
  created () {
    if (this.card.q === '' && this.card.a === '') {
      this.inputMode = { q: true, a: true }
      this.input('q')
    }
  },
	computed: {
		received () {
			const { q, a } = this.card
			return { q, a }
		},
	},
  methods: {
		input (qa) {
			this.inputMode[qa] = true
			this.inputs = this.received
      this.$nextTick(() => this.$refs[qa][0].focus())
		},
    inputClass (qa) {
      const err = this.errors[qa]
      const focused = this.focused[qa]
      return { error: err && !focused }
    },
  }
}
</script>

<style>
.error {
  border: 1px solid red;
}
.qa {
	display: inline-block;
	width: 150px;
	height: 2em;
}
.qa p {
	text-align: left;
}
.qa * {
	margin: 0;
	width: inherit;
	height: inherit;
}
</style>
