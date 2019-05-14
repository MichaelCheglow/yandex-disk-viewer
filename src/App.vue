<template>
  <div id="app">
    <div class="layout-main">
      <div class="layout-main__header">
        <HeaderMain/>
      </div>
      <div class="layout-main__content">
        <router-view class="layout-main__page-content"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/css/main.styl'
import HeaderMain from "@/components/HeaderMain.vue"

export default {
  name: 'app',
  components: {
    HeaderMain
  }
}
</script>
