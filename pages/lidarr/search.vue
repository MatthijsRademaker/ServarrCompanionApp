<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { useDisplay } from 'vuetify';
import { useGetApiV1Search } from '~/thirdPartyApis/lidarr';

const searchStore = useSearchStore();
const { searchResults } = storeToRefs(searchStore);
const query = ref<string>();
const queryRequest = ref({
  term: '',
});

const enableSearch = computed(() => queryRequest.value.term?.length >= 3);

const { data, isLoading } = useGetApiV1Search(queryRequest, {
  query: {
    enabled: enableSearch,
  },
});

const debouncedSearch = useDebounceFn(() => {
  queryRequest.value.term = query.value;
}, 500);

watch(data, (newValue) => {
  if (newValue) {
    searchStore.setSearchResults(newValue);
  }
});

const getImg = (item) => {
  return item.author ? item.author.images?.[0].url : item.book?.images?.[0].url;
};

const { mobile } = useDisplay();

const getRoute = (item) => {
  const itemType = item.author ? 'authors' : 'books';
  const indexedPath = item.author ? 'authorId' : 'bookId';
// TODO fix url
  return `/${itemType}/indexed/${item.album.id`;
    ${item.album.id
}
</script>

<template>
  <h1 v-if="!mobile">Search for your favorite album or artist</h1>
  <v-row>
    <v-col cols="12" sm="6" md="4">
      <v-text-field
        v-model="query"
        label="Search"
        @input="debouncedSearch"
        outlined
        clearable
        placeholder="Album or artist Name"
        appendInnerIcon="mdi-magnify"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <template v-if="isLoading">
      <v-col v-for="i in 9" :key="i" cols="12" sm="6" md="4">
        <v-skeleton-loader height="200" type="card"></v-skeleton-loader>
      </v-col>
    </template>
    <v-col
      v-else
      v-for="item in searchResults"
      :key="item.id"
      cols="12"
      sm="6"
      md="4"
    >
      <ProductCard
        v-if="item.album"
        :title="item.album.title"
        :imgUrl="getImg(item)"
        :id="item.album.id"
        :img-width="140"
        :img-height="180"
        :genres="item.album.genres"
        :rating="item.album.ratings.value"
        icon="mdi-music-box-multiple"
        :go-to-route="getRoute(item)"
      >
      </ProductCard>
      <ProductCard
        v-if="item.artist"
        :title="item.artist.title"
        :imgUrl="getImg(item)"
        :id="item.artist.id"
        :img-width="140"
        :img-height="180"
        :genres="item.artist.genres"
        :rating="item.artist.ratings.value"
        icon="mdi-music-box-multiple"
        :go-to-route="`/albums/indexed/${}`"
      >
      </ProductCard>
    </v-col>
  </v-row>
</template>
