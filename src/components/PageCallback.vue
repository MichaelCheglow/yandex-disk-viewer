<template>
  <div></div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'PageCallback',
  methods: {
    ...mapMutations([
      'setToken'
    ])
  },
  mounted () {
    this.$nextTick(() => {
      const token = /access_token=([^&]+)/.exec(document.location.hash)[1]
      
      localStorage.setItem('yandex-disk-viewer-oauth-token', token)
      this.setTokenId(token)
      this.$router.push('/')
    })
  }
}
</script>
