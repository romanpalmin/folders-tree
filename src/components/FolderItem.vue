<template>
  <div class="folder">
    <div class="folder--icon">
      <IconFolder v-if="!folder.isFile" />
      <IconFile v-if="folder.isFile" />
    </div>
    <div class="folder--name">{{ folder.name }}</div>
    <div class="folder--actions">
      <button @click="editItem(folder.id)" class="btn">
        <IconEdit />
      </button>
      <button @click="deleteItem(folder.id)" class="btn">
        <IconDelete />
      </button>
    </div>
  </div>
</template>

<script setup>
import IconFolder from './icons/IconFolder.vue';
import IconFile from './icons/IconFile.vue';
import IconDelete from './icons/IconDelete.vue';
import IconEdit from './icons/IconEdit.vue';
import { useStore } from 'vuex';

const store = useStore();

defineProps({
  folder: {
    type: Object,
    default: {},
  },
})

const deleteItem = id => {
  const isConfirm = confirm(`Вы уверены?`);
  if (isConfirm) {
    return store.dispatch('deleteFolderItem', { id });
  }
}

const editItem = id => {
  const newName = prompt('Введите новое значение');
  if (newName) {
    return store.dispatch('editFolderItem', { id, newName });
  }
}
</script>

<style scoped>
.folder {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.folder--name {
  padding: 0.1rem 0 0 1.4rem;
}

.folder--icon {
  position: absolute;
  left: 0;
  top: 0.2rem;
}

.folder--actions > .btn {
  border: 0;
  background-color: transparent;
  width: 1.2rem;
  cursor: pointer;
}
</style>