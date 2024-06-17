import { defineStore } from 'pinia'

export type Album = {
  wrapperType: string
  collectionType: string
  artistId: number
  collectionId: number
  amgArtistId: number
  artistName: string
  collectionName: string
  collectionCensoredName: string
  artistViewUrl: string
  collectionViewUrl: string
  artworkUrl60: string
  artworkUrl100: string
  collectionPrice: number
  collectionExplicitness: string
  trackCount: number
  country: string
  currency: string
  releaseDate: string
  primaryGenreName: string
  loading?: true
}

export const useAlbumsStore = defineStore({
  id: 'post',
  state: () => ({
    albums: [] as Album[],
    genreFilter: 'All',
    genres: [] as string[],
    loading: false,
    error: ''
  }),
  getters: {
    hasGenres: (state) => {
      return state.genres.length > 0
    },
    getAlbumsPerArtist: (state) => {
      return state.albums //(authorId) => state.albums.filter((post) => post.userId === authorId)
    },
    isLoading: (state) => {
      return state.loading
    },
    filteredAlbums: (state) => {
      return state.albums.filter(
        (album) => state.genreFilter === "" || state.genreFilter === 'All' || album.primaryGenreName === state.genreFilter
      )
    }
  },
  actions: {
    genreFilterReset() {
      this.genreFilter = 'All'
    },
    async fetchAlbums(artist?: string) {
      const endpoint = import.meta.env.PROD
        ? 'https://api-hp-itunes.carlosguerrero.com/'
        : 'http://localhost:3000/'

      this.albums = new Array(6).fill({ loading: true, collectionName: '...' })
      this.loading = true
      try {
        const endpointUrl = new URL(endpoint)
        endpointUrl.pathname = '/albums'
        // endpointUrl.searchParams.append('limit', '6')
        endpointUrl.searchParams.append('artist', artist || 'Elvis')

        this.albums = await fetch(endpointUrl.toString()).then((response) => response.json())
        this.genres = [
          'All',
          ...Array.from(new Set(this.albums.map((album) => album.primaryGenreName)))
        ]
        if(this.genres.indexOf(this.genreFilter) === -1) {
          this.genreFilterReset()
        }
      } catch (error) {
        this.error = error as string
      } finally {
        this.loading = false
      }
    }
  }
})
