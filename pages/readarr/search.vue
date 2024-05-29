<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { useDisplay } from 'vuetify';
import {
  useGetApiV1Search,
  useGetApiV1AuthorId,
  useGet,
} from '~/thirdPartyApis/readarr';
import type {
  GetApiV1SearchParams,
  SearchResource,
} from '~/thirdPartyApis/readarr/models';
const searchStore = useSearchStore();
const { readarrSearchResults } = storeToRefs(searchStore);
const query = ref<string>();
const queryRequest = ref<GetApiV1SearchParams>({
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
    searchStore.setReadarrSearchResults(newValue);
  }
});

const getTitle = (item: SearchResource) => {
  return item.author ? item.author.authorName : item.book?.title;
};

const getImg = (item: SearchResource) => {
  return item.author ? item.author.images?.[0].url : item.book?.images?.[0].url;
};

const { mobile } = useDisplay();
</script>

<template>
  <h1 v-if="!mobile">Search for your favorite Author or Book</h1>
  <v-row>
    <v-col cols="12" sm="6" md="4">
      <v-text-field
        v-model="query"
        label="Search"
        @input="debouncedSearch"
        outlined
        clearable
        placeholder="Author or Book Name"
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
      v-for="item in readarrSearchResults"
      :key="item.id"
      cols="12"
      sm="6"
      md="4"
    >
      <!-- TODO refactor to product cards -->
      <BookCard
        v-if="item.book"
        :title="getTitle(item) ?? ''"
        :imgUrl="getImg(item) ?? ''"
        :id="item.book.id ?? item.book?.foreignBookId ?? 0"
        :indexed="item.book?.id !== 0"
        :genres="item.book?.genres ?? []"
        :rating="item.book?.ratings?.value ?? 0"
        :pageCount="item.book?.pageCount ?? 0"
      />
      <AuthorCard
        v-else
        :title="getTitle(item) ?? ''"
        :imgUrl="getImg(item) ?? ''"
        :id="item.author?.id ?? item.author?.foreignAuthorId ?? 0"
        :genres="item.author?.genres ?? []"
        :indexed="item.author?.id !== 0"
        :rating="item.author?.ratings?.value ?? 0"
        :overview="item.author?.overview ?? ''"
      />
    </v-col>
  </v-row>
</template>