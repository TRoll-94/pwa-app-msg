import { defineStore } from 'pinia';

export const useFriendSearchStore = defineStore('friendSearch', {
  state: () => ({
    nameSearch: '',
  }),
  getters: {
    getSearch() {
      return this.nameSearch;
    },
  },
  actions: {
    setSearch(name) {
      this.nameSearch = name;
    },
  },
});
