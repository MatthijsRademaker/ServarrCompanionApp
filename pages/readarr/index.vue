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
        <ProductCard
          :title="item?.title ?? ''"
          :imgUrl="getImageFilePath(item)"
          :id="item?.id ?? item?.foreignAuthorId ?? 0"
          :genres="item?.genres ?? []"
          indexed
          :rating="item?.ratings?.value ?? 0"
          :img-width="140"
          :img-height="180"
          icon="mdi-book-open-page-variant"
          :go-to-route="`books/indexed/${item?.id}`"
        >
          <p>{{ item?.pageCount }}</p>
        </ProductCard>
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
        <ProductCard
          :title="item?.authorName ?? ''"
          :imgUrl="getImageFilePath(item)"
          :id="item?.id ?? item?.foreignAuthorId ?? 0"
          :genres="item?.genres ?? []"
          indexed
          :rating="item?.ratings?.value ?? 0"
          :img-width="200"
          :img-height="180"
          icon="mdi-card-account-details"
          :go-to-route="`authors/indexed/${item?.id}`"
        >
          <p>{{ item?.overview }}</p>
        </ProductCard>
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
