<template>
<div>
  <form-fields v-on:auth="login" v-bind:errors="errors"></form-fields>
</div>
</template>


<script>
import FormFields from '@/components/FormFields'
import axios from 'axios'

export default {
  components: {
    formFields: FormFields,
  },
  data: () => ({
    errors: []
  }),
  methods: {
    login(payload){      
      this.errors = []
      axios.post('/login', payload)
        .then(response => { })
      .catch(e => {
        if(e.response){this.errors.push(e.response.data)}        
      })
    }
  }
}
</script>

<style scoped>

</style>
