import { defineStore } from 'pinia'

type Album = {
  collectionName: string
  artworkUrl100: string
  artistName: string
  copyright: string
}

type LoadingAlbum = {
  loading: true
}

export const useAlbumsStore = defineStore({
  id: 'post',
  state: () => ({
    albums: [] as Album[] | LoadingAlbum[],
    loading: false,
    error: ''
  }),
  getters: {
    getAlbumsPerArtist: (state) => {
      return state.albums //(authorId) => state.albums.filter((post) => post.userId === authorId)
    },
    isLoading: (state) => {
      return state.loading
    }
  },
  actions: {
    async fetchAlbums(artist?: string) {
      const endpoint = import.meta.env.PROD ? "http://localhost:3333/albums" : "http://localhost:3333/albums"

      this.albums = new Array(6).fill({ loading: true, collectionName: '...'})
      this.loading = true
      try {
        const endpointUrl = new URL(endpoint)
        endpointUrl.searchParams.append('limit', '6')
        endpointUrl.searchParams.append('artist', artist || 'Elvis')

        this.albums = await fetch(endpointUrl.toString()).then((response) => response.json())
      } catch (error) {
        this.error = error as string
      } finally {
        this.loading = false
      }
    }
  }
})
