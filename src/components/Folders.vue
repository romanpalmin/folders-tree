<template>
  <div>
    <ul class="folders-list">
      <li v-for="folderItem in folders" :key="folderItem.id" class="folders-list--item">
        <FolderItem :folder="folderItem" />
        <Folders v-if="folderItem.childs && folderItem.childs.length > 0" :folders="folderItem.childs">
          {{ folderItem.childs }}
        </Folders>
      </li>
    </ul>
  </div>
</template>

<script>
import FolderItem from './FolderItem.vue';

export default {
  name: 'Folders',
  props: {
    folders: {
      type: Array,
      required: true,
      default: [],
    },
  },
  components: {
    FolderItem,
  },
}
</script>

<style scoped>
.folders-list {
  padding-left: 1rem;
  margin: 0;
  list-style: none;
}

.folders-list--item {
  padding-top: 0.7rem;
}
</style>