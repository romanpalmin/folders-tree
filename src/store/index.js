import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            foldersTree: [],
        }
    },

    mutations: {
        /**
         * Установка данных дерева папок и файлов
         * @param payload
         */
        setFoldersTree(state, payload) {
            state.foldersTree = payload;
        }
    },

    actions: {
        /**
         * Загружает данные дерева папок и файлов
         * @param payload { url } API URL
         */
        async loadFoldersTree({ state, commit }, payload) {
            try {
                const response = await fetch(payload.url);
                const folders = await response.json();
                return commit('setFoldersTree', folders);
            } catch (err) {
                console.error('Ошибка загрузки данных: ', err);
            }
        },

        /**
         * Редактирование названия элемента дерева
         * @param payload { id, newName } ID элемента, новое название
         */
        editFolderItem({ state }, payload) {
            const editById = (arr, id) => {
                arr.forEach(item => {
                    if (item.id === id) return item.name = payload.newName;
                    if (item.childs && item.childs.length > 0) {
                        return editById(item.childs, id);
                    }
                })
            }
            return editById(state.foldersTree, payload.id);
        },

        /**
         * Удаление элемента дерева
         * @param payload { id } ID элемента
         */
        deleteFolderItem({ state }, payload) {
            const deleteById = (arr, id) => {
                arr.forEach((item, index) => {
                    if (item.id === id) return arr.splice(index, 1);
                    if (item.childs && item.childs.length > 0) {
                        return deleteById(item.childs, id);
                    }
                })
            }
            return deleteById(state.foldersTree, payload.id);
        },
    },
});

export default store;