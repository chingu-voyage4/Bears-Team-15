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
			class="ellipsis editable"
	    :ref="'p'+qa"
			v-else
			@click="input(qa)"
		>{{ displayed[qa] }}</p>
	</div>
  <button
		class="btn btn-delete"
		title="remove card"
	  @click="remove"
  >✕</button>
</div>
</template>

<script>
export default {
  props: [ 'index', 'card', 'last' ],
  data: () => ({
		placeholders: { q: 'Question', a: 'Answer' },
		inputMode: { q: false, a: false },
		focused: { q: false, a: false },
		errors: { q: false, a: false },
		inputs: { q: '', a: '' },
  }),
  created () {
    if (this.received.q === '' && this.received.a === '') {
			this.errors = { q: true, a: true }
			this.$emit('addError')
			this.$emit('addError')

      this.inputMode = { q: true, a: true }
      this.input('q')
    }
  },
	computed: {
		received () {
			const { q, a } = this.card
			return { q, a }
		},
		displayed() {
			return {
				q: this.inputs.q ? this.inputs.q : this.received.q,
				a: this.inputs.a ? this.inputs.a : this.received.a,
			}
		},
		thisIsLastEmpty() {
			return this.last && this.inputs.q === '' && this.inputs.a === ''
		}
	},
  methods: {
		input (qa) {
			this.inputs[qa] = this.received[qa]
			this.inputMode[qa] = true
      this.$nextTick(() => this.$refs[qa][0].focus())
		},
    focus (qa) {
			this.focused[qa] = true
    },
    blur (qa) {
			if (this.inputs[qa] === '') {
        if (!this.errors[qa]) {
  	      this.errors[qa] = true
  				this.$emit('addError')
        }
			} else {
				if (this.errors[qa]) {
					this.errors[qa] = false
					this.$emit('removeError')
				}
				const body = this.inputs[qa]
				this.$emit('change', { index: this.index, qa, body })
				this.inputMode[qa] = false
			}
      this.focused[qa] = false
    },
    focusNext (qa) {
      this.blur(qa)
      if (qa === 'a') {
        this.$emit('focusNext', this.index)
      } else if (qa === 'q'){
        this.$nextTick(() => this.input('a'))
      }
    },
    inputClass (qa) {
      const err = this.errors[qa]

			const focusedNeighbor = this.focused.q
      const focusedCard = this.focused[qa] || focusedNeighbor

      return { error: err && !focusedCard && !this.thisIsLastEmpty }
    },
    remove () {
      let count = 0
      if (this.errors.q) count += 1
      if (this.errors.a) count += 1
  		this.inputMode = { q: false, a: false },
  		this.focused = { q: false, a: false },
  		this.errors = { q: false, a: false },
  		this.inputs = { q: '', a: '' },
      this.$emit('remove', count)
    }
  }
}
</script>

<style scoped>
</style>
