<template>
  <form-fields v-on:auth="login">
    <template slot="btnName">Login</template>
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
    login(payload) {
      axios.post('/login', payload)
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
