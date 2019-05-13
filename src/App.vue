<template>
  <div id="app">
    <div class="layout-main">
      <nav
        class="navbar navbar-expand-lg navbar-light bg-light layout-main__header"
      >
        <a class="navbar-brand" href="/">Navbar</a>
      </nav>

      <div class="container">
        <div
          v-if="!authToken"
          class="d-flex justify-content-center"
        >
          <a
            href="https://oauth.yandex.ru/authorize?response_type=token&client_id=c4d3e216a49a405e8f9c92899747f86c"
            class="btn btn-success m-5"
          >
            First, authenticate.
          </a>
        </div>
        <h1 v-else>
          Welcome to the yandex disk!
        </h1>
      </div>
    </div>
  </div>
</template>
<script>
// import Folder from './components/Folder.vue'
import '@/assets/css/main.styl'
import { mapState, mapMutations } from 'vuex'
import { get } from './utils'

export default {
  name: 'app',
  components: {
    // Folder
  },
  computed: {
    ...mapState([
      'authToken'
    ])
  },
  methods: {
    ...mapMutations([
      'updateToken'
    ]),

    loadToken () {
      if (!this.authToken) {
        let tokenFromLocalStorage = localStorage.getItem('yandex-disk-viewer-oauth-token')
        let tokenFromUrl = get(/access_token=([^&]+)/.exec(document.location.hash), '1')
        
        if (tokenFromLocalStorage) {
          this.updateToken(tokenFromLocalStorage)
        } else if (tokenFromUrl) {
          this.updateToken(tokenFromUrl)
          localStorage.setItem('yandex-disk-viewer-oauth-token', tokenFromUrl)
        }
      }
    }
  },
  asyncOperations: {
    load () {
    }
  },
  created () {
    this.loadToken()
  }
}
</script>
