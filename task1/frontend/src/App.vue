<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="logo" class="logo" src="@/assets/logo.jpg" width="125" height="125" />

    <div class="wrapper">
      <h1>Artist Album Search</h1>
      <h3>Enter an artist's name to get a few albums:</h3>
      <div class="flex">
        <input class="searchInput" type="text">
        <button type="submit">Search</button>
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
</style>
