<template>
  <form-fields v-on:auth="register">
    <template slot="btnName">Register</template>
  </form-fields>
</template>

<script>
import FormFields from '@/components/FormFields'
import axios from 'axios'

export default {
  components: {
    formFields: FormFields,
  },
  data: () => ({
  }),
  methods: {
    register(payload) {
      axios.post('/register', payload)
        .then(response => { })
        .catch(e => {
          console.log(e.response.data)
        })
    }
  }
}
</script>

<style scoped>

</style>
