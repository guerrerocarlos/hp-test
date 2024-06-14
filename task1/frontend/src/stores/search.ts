import { defineStore } from 'pinia'

export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    form: {
      value: "",
    }
  }),
  getters: {
    getSearchText: (state) => {
      return state.form.value //(authorId) => state.albums.filter((post) => post.userId === authorId)
    }
  }
})