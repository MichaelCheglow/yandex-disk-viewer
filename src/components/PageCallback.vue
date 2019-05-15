<template>
  <div></div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'PageCallback',
  methods: {
    ...mapMutations([
      'setTokenId'
    ])
  },
  mounted () {
    this.$nextTick(() => {
      const token = /access_token=([^&]+)/.exec(document.location.hash)[1]
      
      localStorage.setItem(process.env.VUE_APP_TOKEN_NAME, token)
      this.setTokenId(token)
      this.$router.push('/')
    })
  }
}
</script>
