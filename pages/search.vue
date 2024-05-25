<script setup lang="ts">
import { useGetApiV1Search } from '~/thirdPartyApis/readarr/index';
import type {
  GetApiV1SearchParams,
  SearchResource,
} from '~/thirdPartyApis/readarr/models';

const query = ref<string>();
const queryRequest = computed<GetApiV1SearchParams | undefined>(() =>
  query.value && query.value.length >= 3
    ? {
        term: query.value,
      }
    : undefined
);

const { data, isLoading, refetch } = useGetApiV1Search(queryRequest, {
  query: {
    enabled: !!queryRequest.value,
  },
});

watch(query, () => {
  if (queryRequest.value) {
    refetch();
  }
});

const getTitle = (item: SearchResource) => {
  return item.author ? item.author.authorName : item.book?.title;
};

const getImg = (item: SearchResource) => {
  return item.author ? item.author.images?.[0].url : item.book?.images?.[0].url;
};
</script>

<template>
  <h1>Search for your favorite Author or Book</h1>
  <v-row>
    <v-col cols="12" sm="6" md="4">
      <v-text-field
        v-model="query"
        label="Search"
        outlined
        clearable
        placeholder="Author or Book Name"
        appendInnerIcon="mdi-magnify"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col v-if="isLoading" v-for="i in 9" :key="i" cols="12" sm="6" md="4">
      <v-skeleton-loader height="200" type="card"></v-skeleton-loader>
    </v-col>
    <v-col v-for="item in data" :key="item.id" cols="12" sm="6" md="4">
      <BookCard
        v-if="item.book"
        :title="getTitle(item) ?? ''"
        :imgUrl="getImg(item) ?? ''"
        :id="item.book.id ?? 0"
        :genres="item.book?.genres ?? []"
        :rating="item.book?.ratings?.value ?? 0"
        :pageCount="item.book?.pageCount ?? 0"
      />
      <AuthorCard
        v-else
        :title="getTitle(item) ?? ''"
        :imgUrl="getImg(item) ?? ''"
        :id="item.author?.id ?? 0"
        :genres="item.author?.genres ?? []"
        :rating="item.author?.ratings?.value ?? 0"
        :overview="item.author?.overview ?? ''"
      />
    </v-col>
  </v-row>
</template>
