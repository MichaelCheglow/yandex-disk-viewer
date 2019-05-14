<template>
  <div
    id="app"
    class="root"
  >
    <div class="layout-main">
      <nav
        class="navbar navbar-expand-lg navbar-light bg-light layout-main__header"
      >
        <a class="navbar-brand" href="/">
          <img src="/logo.svg" alt="Yandex Disk"> Яндекс Диск
        </a>
      </nav>
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
            <table class="table table-hover table-centered">
              <thead class="thead-dark">
                <tr>
                  <th
                    scope="col"
                    style="width: 60px"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    style="width: 60px"></th>
                  <th scope="col">Name</th>
                  <th
                    scope="col"
                    style="width: 100px"
                  >
                    Size
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(file, index) in this.data._embedded.items"
                  :key="file.resource_id"
                  v-on=" file.type === 'dir' ? { click: () => {path = file.path} } : {} "
                >
                  <td>{{ index + 1 }}</td>
                  <td>
                    <span
                      :style="{ backgroundImage: `url(${defineIcon(file)})` }"
                      class="file__icon"
                    ></span>
                  </td>
                  <td>{{ file.name }}</td>
                  <td>
                    <span v-if="file.type === 'file'">{{ formatBytes(file.size) }}</span>
                  </td>
                </tr>
              </tbody>
            </table>          
          </div>

        </div>
      </div>

    </div>
  </div>
</template>
<script>
// import Folder from './components/Folder.vue'
import '@/assets/css/main.styl'
import qs from 'qs'
import { mapState, mapMutations } from 'vuex'
import { get, formatBytes } from './utils'

export default {
  name: 'app',
  components: {
    // Folder
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

    formatBytes,

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
    },

    defineIcon (file) {
      const fileType = {
        'compressed': 'archive',
        'web': 'code',
        'development': 'code',
        'executable': 'exe'
      }

      if (file.type === 'dir') { return '/file-icons/folder.png' }
      else if (file.preview) { return file.preview }
      else if (fileType[file.media_type]) { return `/file-icons/${fileType[file.media_type]}.png` }
      else { return '/file-icons/file.png' }
    }
  },
  watch: {
    path () {
      this.axios.get(`https://cloud-api.yandex.net:443/v1/disk/resources?${qs.stringify({ path: this.path })}`).then(response => (this.data = response.data))
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
      this.axios.get(`https://cloud-api.yandex.net:443/v1/disk/resources?${qs.stringify({ path: this.path })}`).then(response => (this.data = response.data))
    }
  }
}
</script>
