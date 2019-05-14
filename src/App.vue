<template>
  <div id="app">
    <div class="layout-main">
      <div class="layout-main__header">
        <HeaderMain/>
      </div>
      <div class="layout-main__content">
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

          <div v-if="this.data">
            <FilesTable
              :data="data"
              @open-folder="(newPath) => {path = newPath}"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/css/main.styl'
import qs from 'qs'
import { mapState, mapMutations } from 'vuex'
import { get } from './utils'
import HeaderMain from "@/components/HeaderMain.vue";
import FilesTable from '@/components/FilesTable.vue'
export default {
  name: 'app',
  components: {
    HeaderMain,
    FilesTable
  },
  data () {
    return {
      path: '/',
      data: null
    }
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
          history.replaceState({}, document.title, ".");
        } else if (tokenFromUrl) {
          this.updateToken(tokenFromUrl)
          history.replaceState({}, document.title, ".");
          localStorage.setItem('yandex-disk-viewer-oauth-token', tokenFromUrl)
        }
      }
    }
  },
  watch: {
    path () {
      this.axios.get(`https://cloud-api.yandex.net:443/v1/disk/resources?${qs.stringify({ path: this.path })}`).then(
        response => (this.data = response.data._embedded.items))
    }
  },
  asyncOperations: {
    load () {

    }
  },
  created () {
    this.loadToken()

    // this.axios.defaults.baseUrl = 'https://cloud-api.yandex.net:443/v1/disk/resources'

    if (this.authToken) {
      this.axios.defaults.headers.common['Authorization'] = `OAuth ${this.authToken}`
      this.axios.get(`https://cloud-api.yandex.net:443/v1/disk/resources?${qs.stringify({ path: this.path })}`).then(response => (this.data = response.data._embedded.items))
    }
  }
}
</script>
