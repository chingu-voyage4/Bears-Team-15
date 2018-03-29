<template>
<div>
  <input
	  v-if="inputMode"
    v-model.trim="inputValue"
		ref="title"
    type="text" placeholder="Collection name"
    :class="titleClass"
    :autofocus="createMode"
    @focus="focusTitle"
    @blur="blurTitle"
    @keyup.enter="focusNext"
  >
	<p
		v-else
		class="ellipsis editable"
		@click="inputTitle"
	>{{ displayedTitle }}</p>
</div>
</template>

<script>
export default {
  props: ['title', 'createMode'],
  data: () => ({
		titleError: false,
		inputMode: false,
		inputValue: '',
    focusedTitle: false,
  }),
  created () {
		if (this.createMode) this.inputTitle()
  },
  computed: {
    receivedTitle() {
      return this.title
    },
		displayedTitle () {
			return this.inputValue ? this.inputValue : this.receivedTitle
		},
    titleClass () {
      return { error:  this.titleError && !this.focusedTitle }
    }
  },
  methods: {
		inputTitle () {
			this.inputMode = true
			this.inputValue = this.displayedTitle
      this.$nextTick(() => {
				this.$refs.title.focus()
				this.focusTitle()
			})
		},
    focusTitle () {
      this.focusedTitle = true
    },
    blurTitle () {
			if (this.inputValue === '') {
				if (!this.titleError) {
					this.titleError = true
					this.$emit('addError')
				}
			} else {
				if (this.titleError) {
					this.titleError = false
					this.$emit('removeError')
				}
				this.$emit('changeTitle', this.inputValue)
				this.inputMode = false
			}
      this.focusedTitle = false
		},
    focusNext (index) {
			this.blurTitle()
			this.$emit('focusNext', -1)
    },
  }
}
</script>

<style scoped>
</style>
