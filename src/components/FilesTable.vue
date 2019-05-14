<template>
  <div class="files-table">
    <div      
      v-if="loaded"
      class="files-table__loader"
    >
      <div 
        class="spinner-border text-primary"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <table
      v-else
      class="table table-hover table-centered"
    >
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
            style="width: 60px"
          >
          </th>
          <th scope="col">Name</th>
          <th
            scope="col"
            style="width: 120px"
          >
            Size
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(file, index) in this.data"
          :key="file.resource_id"
          v-on=" file.type === 'dir' ? { click: () => {openFolder(file.path)} } : {} "
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
</template>
<script>
export default {
  name: 'FilesTable',
  props: {
    data: {
      type: Array,
      required: true
    },
    loaded: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    formatBytes (bytes, decimals = 1) {
      if (bytes === 0) return '0 Bytes'

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
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
    },

    openFolder (path) {
      this.$emit('open-folder', path.replace(/^disk:/, ''))
    }
  }
}
</script>
