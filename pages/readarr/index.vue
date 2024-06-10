<script setup lang="ts">
import { useGetApiV1Book, useGetApiV1Author } from '~/thirdPartyApis/readarr';
import { getRelativePath } from '~/helpers/route';
import { useDisplay } from 'vuetify';
import BookCard from '~/components/books/BookCard.vue';
import AuthorCard from '~/components/books/AuthorCard.vue';
import type { BookResource } from '~/thirdPartyApis/readarr/models';

const { data: books, isLoading: isLoadingBooks } = useGetApiV1Book();
const { data: authors, isLoading: isLoadingAuthors } = useGetApiV1Author();

const getImageFilePath = (item) => {
  const subPath = item?.images?.[0]?.url;
  return `${import.meta.env.VITE_FILE_SERVER_URL}/readarr${
    subPath?.split('?')[0]
  }`;
};
const { mobile } = useDisplay();
const maxItems = computed(() => (mobile.value ? 2 : 4));

const booksSlice = computed(() => {
  const copy = books.value?.slice();

  return copy?.reverse()?.slice(0, maxItems.value);
});

const authorsSlice = computed(() => {
  const copy = authors.value?.slice();
  return copy?.reverse()?.slice(0, maxItems.value);
});

const getAuthorName = (item: BookResource) => {
  return authors.value?.find((author) => author.id === item.authorId)
    ?.authorName;
};
</script>

<template>
  <v-row>
    <v-col>
      <h1>Recently watched books</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col v-if="isLoadingBooks" cols="12" sm="6" md="4">
      <CardSkeletonLoader is-loading />
    </v-col>
    <template v-if="books">
      <v-col v-for="item in booksSlice" :key="item.id" cols="12" sm="6" md="3">
        <BookCard
          :title="item?.title ?? ''"
          :imgUrl="getImageFilePath(item)"
          :id="item?.id ?? 0"
          :genres="item?.genres ?? []"
          indexed
          :rating="item?.ratings?.value ?? 0"
          :go-to-route="`books/indexed/${item?.id}`"
          :page-count="item?.pageCount"
          :author="getAuthorName(item)"
        />
      </v-col>
    </template>
  </v-row>
  <v-row>
    <v-col>
      <NuxtLink :to="getRelativePath(useRoute(), 'books')">
        <v-btn color="primary">View all books</v-btn>
      </NuxtLink>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <h1>Recently watched authors</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col v-if="isLoadingAuthors" cols="12" sm="6" md="4">
      <CardSkeletonLoader is-loading />
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
          :id="item?.id ?? item?.foreignAuthorId ?? 0"
          :genres="item?.genres ?? []"
          indexed
          :rating="item?.ratings?.value ?? 0"
          :go-to-route="`authors/indexed/${item?.id}`"
          :overview="item?.overview"
        />
      </v-col>
    </template>
  </v-row>
  <v-row>
    <v-col>
      <NuxtLink :to="getRelativePath(useRoute(), 'authors')">
        <v-btn color="primary">View all authors</v-btn>
      </NuxtLink>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <NuxtLink :to="getRelativePath(useRoute(), 'bookshelf')">
        <v-btn color="primary">See everything in the bookshelf</v-btn>
      </NuxtLink>
    </v-col>
  </v-row>
</template>
