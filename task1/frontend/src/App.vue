<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSearchStore } from './stores/search'
import { useAlbumsStore } from './stores/albums'
import { storeToRefs } from 'pinia'

const { form, getSearchText } = storeToRefs(useSearchStore())
const { fetchAlbums } = useAlbumsStore()
const { loading } = storeToRefs(useAlbumsStore())

const handleClick = () => {
  fetchAlbums(getSearchText.value)
}

let timeout: any

const handleEnter = (event: KeyboardEvent) => {
  clearTimeout(timeout)
  if (event.key === 'Enter') {
    fetchAlbums(getSearchText.value)
  } else {
    timeout = setTimeout(() => {
      fetchAlbums(getSearchText.value)
    }, 1000)
  }
}
</script>

<template>
  <header class="header">
    <img alt="logo" class="logo" src="@/assets/logo.jpg" width="125" height="125" />

    <div class="wrapper centeredOnVertical">
      <h1>Artist Album Search</h1>
      <h3>Enter an artist's name to get a few albums:</h3>
      <div class="flex flexCenteredOnVertical">
        <input
          v-bind:disabled="loading"
          v-model="form.value"
          @keydown="handleEnter"
          placeholder="Elvis"
          class="searchInput"
          type="text"
        />
        <button v-bind:disabled="loading" @click="handleClick" type="submit">Search</button>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.searchInput {
  font-size: 2em;
  width: 100%;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  border-radius: 20px;
}

.flex {
  display: flex;
}

.flexCols {
  flex-direction: column;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

@media (max-width: 1024px) {
  .centeredOnVertical {
    text-align: center;
  }

  .flexCenteredOnVertical {
    justify-content: center;
  }

  .header {
    margin-bottom: 50px;
  }
}
</style>
