<template>
  <nav class="navigation" aria-label="breadcrumb">
    <button
      :disabled="$route.path === '/'"
      type="button"
      class="btn btn-primary navigation__btn-back"
      title="Back"
      @click="$router.push(createBreadcrumbsLink())"
    >
      <i class="icon-left-arrow"></i>
    </button>
    <ol class="breadcrumb no-margin">
      <li
        v-for="(breadcrumb, index) in breadcrumbsList"
        :key="index"
        :class="[index === breadcrumbsList.length - 1 ? 'active': '']"
        :aria-current="[index === breadcrumbsList.length - 1 ? 'page': '']"
        class="breadcrumb-item"
      >
        <router-link
          v-if="index !== breadcrumbsList.length - 1"
          :to="createBreadcrumbsLink(index)"
        >
          {{ breadcrumb }}
        </router-link>
        <span v-else>{{ breadcrumb }}</span>
      </li>
    </ol>
  </nav>
</template>
<script>
export default {
  name: 'FilesNav',
  computed: {
    breadcrumbsList () {
      let breadcrumbs
      if (this.$route.path === '/') breadcrumbs = []
      else breadcrumbs = this.$route.path.split(/\//)
      breadcrumbs[0] = 'Home'

      return breadcrumbs
    }
  },
  methods: {
    createBreadcrumbsLink (index = this.breadcrumbsList.length - 2) {
      if (index === 0) return '/'
      return `/${this.breadcrumbsList.slice(1, index + 1).join('/')}`
    }
  }
}
</script>
