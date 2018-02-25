<template>
<div>
  <h1>
    <router-link to="/collection">{{ name }}</router-link>
  </h1>
  <div
    @click.stop="nextCard"
    class="pointer"
  >
    <app-card
     :question="question"
    > {{ card }} </app-card>
  </div>
</div>
</template>

<script>
import Card from '@/components/Card'
import { mapState } from 'vuex'

export default {
  name: 'Lesson',
  components: {
    appCard: Card
  },
  data: () => ({
    index: 0,
    question: true
  }),
  created () {
    this.index = this.randIndex()
  },
  computed: {
    card () {
      //const item = this.collection.items[this.index]
      const item = this.$store.state.collections[1].items[this.index] // use store state
      const card = this.question ? item.q : item.a
      return card
    },
    quantity () {
      return this.$store.state.collections[1].items.length //this.collection.items.length
    },
    name () {
      return this.$store.state.collections[1].collectionName
    }
  },
  methods: {
    nextCard () {
      if (!this.question) {
        this.index = this.randIndex()
      }
      this.question = !this.question
    },
    randIndex () {
      return Math.floor(Math.random()*(this.quantity))
    }
  }
}
</script>

<style>
.pointer {
  display: inline-block;
  cursor: pointer;
}
</style>
