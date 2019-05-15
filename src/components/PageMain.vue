<template>
  <div class="page-main">
    <div
      v-if="!data && !this.tokenId"
      class="d-flex justify-content-center"
    >
      <a
        :href="authLink"
        class="btn btn-success m-5"
      >
        First, authenticate.
      </a>
    </div>
    <div v-if="data" class="container page-main__container">
      <FilesNav/>
      <FilesTable
        :data="data"
        :loaded="$async.loadFilesList.$pending"
        class="page-main__files-table"
        @open-folder="(path) => {this.$router.push(path)}"
      />
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
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
      authLink: `https://oauth.yandex.ru/authorize?response_type=token&client_id=${process.env.VUE_APP_CLIENT_ID}`,
      data: null
    }
  },
  computed: {
    ...mapState(['tokenId']),

    ...mapGetters(['token'])
  },
  methods: {
    ...mapMutations(['setTokenId']),

    getData,

    initToken () {
      if (this.tokenId) return
      const token = localStorage.getItem(process.env.VUE_APP_TOKEN_NAME)
      this.setTokenId(token)    
    }
  },
  watch: {
    '$route.path' () {
      this.$async.loadFilesList.$perform().then(res => { this.data = res._embedded.items })
    }
  },
  asyncOperations: {
    loadFilesList () {
      return this.getData(this.$route.path, this.token)
    }
  },
  created () {
    this.initToken()
    if (this.tokenId) this.$async.loadFilesList.$perform().then(res => { this.data = res._embedded.items })
  }
}
</script>
