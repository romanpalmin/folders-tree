<template>
  <div class="app-layout" v-if="folders && folders.length > 0">
    <Folders :folders="folders" />
  </div>
  <div v-else>
    Нет данных
  </div>
</template>

<script setup>
import { API_URL } from './constants';
import Folders from './components/Folders.vue';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const folders = computed(() => store.state.foldersTree);

onMounted(() => {
  store.dispatch('loadFoldersTree', { url: API_URL });
});

</script>

<style scoped>
.app-layout {
  background-color: #fff;
  min-width: 20rem;
  text-align: left;
  padding: 10px;
}
</style>
