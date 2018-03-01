<template>
<div>
  <h1>
    {{ collection.collectionName }}
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
    ...mapState(['collections']),
    collection () {
      return this.collections[1]
    },
    card () {
      const item = this.collection.items[this.index]
      const card = this.question ? item.q : item.a
      return card
    },
    quantity () {
      return this.collection.items.length
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
