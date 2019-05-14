<template>
  <div class="page-main">
    <div class="container page-main__container">
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
      <FilesNav/>
      <FilesTable
        v-if="data"
        :data="data"
        :loaded="$async.loadFilesList.$pending"
        class="page-main__files-table"
        @open-folder="(path) => {this.$router.push(path)}"
      />
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { getData } from '@/utils/auth.js'
import FilesNav from '@/components/FilesNav.vue'
import FilesTable from '@/components/FilesTable.vue'
export default {
  name: 'PageMain',
  components: {
    FilesNav,
    FilesTable
  },
  data () {
    return {
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
      'setToken'
    ]),

    getData,

    loadToken () {
      if (this.authToken) return
      const token = localStorage.getItem('yandex-disk-viewer-oauth-token')
      this.setToken(token)
    }
  },
  watch: {
    '$route.path' () {
      this.$async.loadFilesList.$perform().then(res => { this.data = res._embedded.items })
    }
  },
  asyncOperations: {
    loadFilesList () {
      return this.getData(this.$route.path, this.authToken)
    }
  },
  created () {
    this.loadToken()
    if (this.authToken) this.$async.loadFilesList.$perform().then(res => { this.data = res._embedded.items })
  }
}
</script>
