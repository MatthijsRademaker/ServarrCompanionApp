<script setup lang="ts">
import { useGetApiV1Book, useGetApiV1Author } from '~/thirdPartyApis/readarr';

const { data: books, isLoading: isLoadingBooks } = useGetApiV1Book();
const { data: authors, isLoading: isLoadingAuthors } = useGetApiV1Author();

const getImageFilePath = (item) => {
  const subPath = item?.images?.[0].url;
  return `${import.meta.env.VITE_FILE_SERVER_URL}/readarr${
    subPath?.split('?')[0]
  }`;
};

const booksSlice = computed(() => {
  const copy = books.value?.slice();

  return copy?.reverse()?.slice(0, 4);
});

const authorsSlice = computed(() => {
  const copy = authors.value?.slice();
  return copy?.reverse()?.slice(0, 4);
});
</script>

<template>
  <v-row>
    <v-col>
      <h1>Recently added books</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col v-if="isLoadingBooks" cols="12" sm="6" md="4">
      <v-skeleton-loader
        height="600"
        width="1800"
        type="card"
      ></v-skeleton-loader>
    </v-col>
    <template v-if="books">
      <v-col v-for="item in booksSlice" :key="item.id" cols="12" sm="6" md="3">
        <BookCard
          :title="item?.title ?? ''"
          :imgUrl="getImageFilePath(item)"
          :id="item.id ?? item?.foreignBookId ?? 0"
          :indexed="item?.id !== 0"
          :genres="item?.genres ?? []"
          :rating="item?.ratings?.value ?? 0"
          :pageCount="item?.pageCount ?? 0"
        />
      </v-col>
    </template>
  </v-row>
  <v-row>
    <v-col>
      <NuxtLink to="/books">
        <v-btn color="primary">View all books</v-btn>
      </NuxtLink>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <h1>Recently added authors</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col v-if="isLoadingAuthors" cols="12" sm="6" md="4">
      <v-skeleton-loader
        height="600"
        width="1800"
        type="card"
      ></v-skeleton-loader>
    </v-col>
    <template v-if="authors">
      <v-col
        v-for="item in authorsSlice"
        :key="item.id"
        cols="12"
        sm="6"
        md="3"
      >
        <AuthorCard
          :title="item?.authorName ?? ''"
          :imgUrl="getImageFilePath(item)"
          :id="item.id ?? 0"
          :indexed="item?.id !== 0"
          :genres="item?.genres ?? []"
          :rating="item?.ratings?.value ?? 0"
          :overview="item?.overview ?? ''"
        />
      </v-col>
    </template>
  </v-row>
  <v-row>
    <v-col>
      <NuxtLink to="/authors">
        <v-btn color="primary">View all authors</v-btn>
      </NuxtLink>
    </v-col>
  </v-row>
</template>