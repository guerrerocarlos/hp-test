<script setup lang="ts">
import AlbumItem from './AlbumItem.vue'
import { useAlbumsStore } from '../stores/albums'
import { storeToRefs } from 'pinia'

const { filteredAlbums } = storeToRefs(useAlbumsStore())
const { fetchAlbums } = useAlbumsStore()
fetchAlbums()
</script>

<template>
  <div class="grid-container">
    <AlbumItem v-for="album in filteredAlbums" v-bind:key="album.collectionName">
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
      <p>{{ album.collectionName }}</p>
    </AlbumItem>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.smallFont {
  font-size: 0.7em;
}

.minsize {
  width: 100px;
  height: 100px;
}

.borderRadius {
  border-radius: 25px;
}
</style>
