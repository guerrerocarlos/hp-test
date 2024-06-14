<script setup lang="ts">
import AlbumItem from './AlbumItem.vue'
import { useAlbumsStore } from '../stores/albums'
import { storeToRefs } from 'pinia'

const { albums } = storeToRefs(useAlbumsStore())

const { fetchAlbums } = useAlbumsStore()

fetchAlbums()

function dateToLocaleString(date: string) {
  if (!date || date.length === 0) {
    return ''
  }
  return `(${new Date(date).getYear() + 1900})`
}
</script>

<template>
  <AlbumItem v-for="album in albums" v-bind:key="album.title">
    <template #icon>
      <img
        v-if="!album.loading"
        v-bind:src="album.artworkUrl100"
        v-bind:alt="album.collectionName"
        class="borderRadius minsize"
      />
      <img
        v-if="album.loading"
        src="/src/assets/album_placeholder.jpg"
        class="borderRadius minsize"
      />
    </template>
    <p>{{ album.collectionName }} {{ dateToLocaleString(album.releaseDate) }}</p>
    <p>{{ album.artistName }}</p>
    <p class="smallFont">{{ album.copyright }}</p>
  </AlbumItem>
</template>

<style scoped>
.smallFont {
  font-size: 0.7em;
}


.minsize {
  width: 100px;
  height: 100px;
}

.borderRadius {
  border-radius: 25px;
  border: 1px solid gray;
}

</style>
