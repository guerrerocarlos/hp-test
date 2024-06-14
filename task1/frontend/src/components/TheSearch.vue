<script setup lang="ts">
import AlbumItem from './AlbumItem.vue'

function dateToLocaleString(date: string) {
  return new Date(date).getYear() + 1900
}

let albums = [
  {
    "wrapperType": "collection",
    "collectionType": "Album",
    "artistId": 32940,
    "collectionId": 159292399,
    "amgArtistId": 4576,
    "artistName": "Michael Jackson",
    "collectionName": "The Essential Michael Jackson",
    "collectionCensoredName": "The Essential Michael Jackson",
    "artistViewUrl": "https://music.apple.com/us/artist/michael-jackson/32940?uo=4",
    "collectionViewUrl": "https://music.apple.com/us/album/the-essential-michael-jackson/159292399?uo=4",
    "artworkUrl60": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/3d/9d/38/3d9d3811-71f0-3a0e-1ada-3004e56ff852/827969428726.jpg/60x60bb.jpg",
    "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/3d/9d/38/3d9d3811-71f0-3a0e-1ada-3004e56ff852/827969428726.jpg/100x100bb.jpg",
    "collectionPrice": 16.99,
    "collectionExplicitness": "notExplicit",
    "trackCount": 38,
    "copyright": "℗ 1972 Motown Records, a Division of UMG Recordings, Inc., 1976, 1978, 1980 Sony Music Entertainment, 1979, 1982, 1987, 1991, 1995, 2001, 2005 MJJ Productions Inc.",
    "country": "USA",
    "currency": "USD",
    "releaseDate": "2005-07-19T07:00:00Z",
    "primaryGenreName": "Pop"
  },
  {
    "wrapperType": "collection",
    "collectionType": "Album",
    "artistId": 32940,
    "collectionId": 336643808,
    "amgArtistId": 4576,
    "artistName": "Michael Jackson",
    "collectionName": "Michael Jackson's This Is It (The Music That Inspired the Movie)",
    "collectionCensoredName": "Michael Jackson's This Is It (The Music That Inspired the Movie)",
    "artistViewUrl": "https://music.apple.com/us/artist/michael-jackson/32940?uo=4",
    "collectionViewUrl": "https://music.apple.com/us/album/michael-jacksons-this-is-it-the-music-that-inspired/336643808?uo=4",
    "artworkUrl60": "https://is1-ssl.mzstatic.com/image/thumb/Features125/v4/2a/82/a5/2a82a59b-6e79-7c39-761a-c1d3b82e93cb/dj.dzbxcmnk.jpg/60x60bb.jpg",
    "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Features125/v4/2a/82/a5/2a82a59b-6e79-7c39-761a-c1d3b82e93cb/dj.dzbxcmnk.jpg/100x100bb.jpg",
    "collectionPrice": 10.99,
    "collectionExplicitness": "notExplicit",
    "trackCount": 20,
    "copyright": "℗ 1979, 1982, 1987, 1991, 1995, 2009 MJJ Productions Inc./(P) 2009 MJJ Productions Inc.",
    "country": "USA",
    "currency": "USD",
    "releaseDate": "2009-10-26T07:00:00Z",
    "primaryGenreName": "Soundtrack"
  },
  {
    "wrapperType": "collection",
    "collectionType": "Album",
    "artistId": 32940,
    "collectionId": 273598907,
    "amgArtistId": 4576,
    "artistName": "Michael Jackson",
    "collectionName": "Number Ones",
    "collectionCensoredName": "Number Ones",
    "artistViewUrl": "https://music.apple.com/us/artist/michael-jackson/32940?uo=4",
    "collectionViewUrl": "https://music.apple.com/us/album/number-ones/273598907?uo=4",
    "artworkUrl60": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/a3/80/ab/a380ab2b-8f46-c230-6f21-07707105808b/888880457066.jpg/60x60bb.jpg",
    "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/a3/80/ab/a380ab2b-8f46-c230-6f21-07707105808b/888880457066.jpg/100x100bb.jpg",
    "collectionPrice": 10.99,
    "collectionExplicitness": "notExplicit",
    "trackCount": 18,
    "copyright": "℗ 1979, 1981, 1982, 1987, 1991, 1995, 2001, 2003 MJJ Productions, Inc.",
    "country": "USA",
    "currency": "USD",
    "releaseDate": "2003-11-17T08:00:00Z",
    "primaryGenreName": "Pop"
  },
  {
    "wrapperType": "collection",
    "collectionType": "Album",
    "artistId": 32940,
    "collectionId": 405410751,
    "amgArtistId": 4576,
    "artistName": "Michael Jackson",
    "collectionName": "Michael Jackson's Vision",
    "collectionCensoredName": "Michael Jackson's Vision",
    "artistViewUrl": "https://music.apple.com/us/artist/michael-jackson/32940?uo=4",
    "collectionViewUrl": "https://music.apple.com/us/album/michael-jacksons-vision/405410751?uo=4",
    "artworkUrl60": "https://is1-ssl.mzstatic.com/image/thumb/Music60/v4/5d/ef/cf/5defcfb9-f090-2bde-d902-10701f0c14f0/dj.imtamrid.jpg/60x60bb.jpg",
    "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music60/v4/5d/ef/cf/5defcfb9-f090-2bde-d902-10701f0c14f0/dj.imtamrid.jpg/100x100bb.jpg",
    "collectionPrice": 29.99,
    "collectionExplicitness": "notExplicit",
    "trackCount": 43,
    "copyright": "℗ (C) 2010 MJJ Productions, Inc.",
    "country": "USA",
    "currency": "USD",
    "releaseDate": "2010-01-01T00:00:00Z",
    "primaryGenreName": "Pop"
  },
  {
    "wrapperType": "collection",
    "collectionType": "Album",
    "artistId": 32940,
    "collectionId": 269572838,
    "amgArtistId": 4576,
    "artistName": "Michael Jackson",
    "collectionName": "Thriller",
    "collectionCensoredName": "Thriller",
    "artistViewUrl": "https://music.apple.com/us/artist/michael-jackson/32940?uo=4",
    "collectionViewUrl": "https://music.apple.com/us/album/thriller/269572838?uo=4",
    "artworkUrl60": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/4f/fd/324ffda2-9e51-8f6a-0c2d-c6fd2b41ac55/074643811224.jpg/60x60bb.jpg",
    "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/4f/fd/324ffda2-9e51-8f6a-0c2d-c6fd2b41ac55/074643811224.jpg/100x100bb.jpg",
    "collectionPrice": 9.99,
    "collectionExplicitness": "notExplicit",
    "trackCount": 9,
    "copyright": "℗ 1982 MJJ Productions Inc.",
    "country": "USA",
    "currency": "USD",
    "releaseDate": "1982-11-30T08:00:00Z",
    "primaryGenreName": "Pop"
  },
  {
    "wrapperType": "collection",
    "collectionType": "Album",
    "artistId": 32940,
    "collectionId": 850697616,
    "amgArtistId": 4576,
    "artistName": "Michael Jackson",
    "collectionName": "XSCAPE (Deluxe)",
    "collectionCensoredName": "XSCAPE (Deluxe)",
    "artistViewUrl": "https://music.apple.com/us/artist/michael-jackson/32940?uo=4",
    "collectionViewUrl": "https://music.apple.com/us/album/xscape-deluxe/850697616?uo=4",
    "artworkUrl60": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/83/15/cc/8315ccdd-5a8d-8344-fa15-72e4cb64145e/886444533171.jpg/60x60bb.jpg",
    "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/83/15/cc/8315ccdd-5a8d-8344-fa15-72e4cb64145e/886444533171.jpg/100x100bb.jpg",
    "collectionPrice": 16.99,
    "collectionExplicitness": "notExplicit",
    "trackCount": 19,
    "copyright": "℗ 2014 MJJ Productions, Inc.",
    "country": "USA",
    "currency": "USD",
    "releaseDate": "2014-05-13T07:00:00Z",
    "primaryGenreName": "Pop"
  }]
</script>

<template>
  <AlbumItem v-for="album in albums" v-bind:key="album.title">
    <template #icon>
      <img v-bind:src="album.artworkUrl100" v-bind:alt="album.collectionName" class="borderRadius width100" />
    </template>
    <p>{{ album.collectionName }}  ({{ dateToLocaleString(album.releaseDate) }}) </p>
    <p class="smallFont">{{ album.copyright }}</p>
  </AlbumItem>
</template>

<style scoped>

.smallFont {
  font-size: 0.7em;
}

.borderRadius {
  border-radius: 10px;
  border: 1px solid gray;
}

.width100 {
  width: 100px;
}

</style>