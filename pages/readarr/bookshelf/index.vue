<script setup lang="ts">
import { useGetApiV1Book, useGetApiV1Author } from '~/thirdPartyApis/readarr';

const { data: books, isLoading: isLoadingBooks } = useGetApiV1Book();
const { data: authors, isLoading: isLoadingAuthors } = useGetApiV1Author();

const getBooksForAuthor = (authorId) => {
  const foundBooks = books.value?.filter((book) => book.authorId === authorId);

  foundBooks?.sort((a, b) => {
    if (a.statistics.bookFileCount < b.statistics.bookFileCount) {
      return 1;
    }
    if (a.statistics.bookFileCount > b.statistics.bookFileCount) {
      return -1;
    }
    return 0;
  });

  return foundBooks;
};

const filterValue = ref('');

const filteredAuthors = computed(() => {
  if (filterValue.value === '' || filterValue.value === null) {
    return authors.value;
  }

  return authors.value?.filter((author) =>
    author.authorName.toLowerCase().includes(filterValue.value.toLowerCase())
  );
});
</script>

<template>
  <v-row>
    <v-col>
      <h1>Bookshelf</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="6" md="4">
      <v-text-field
        v-model="filterValue"
        label="Filter"
        outlined
        clearable
        placeholder="Author name..."
        appendInnerIcon="mdi-filter"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col v-if="isLoadingBooks || isLoadingAuthors" cols="12" sm="6" md="4">
      <CardSkeletonLoader is-loading />
    </v-col>
    <template v-else>
      <v-col
        v-for="item in filteredAuthors"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-card-title>{{ item.authorName }}</v-card-title>
          <div class="bookfiles">
            <template v-for="book in getBooksForAuthor(item.id)">
              <v-chip
                @click="() => $router.push(`/readarr/books/indexed/${book.id}`)"
                ><v-icon
                  :color="
                    book.statistics.bookFileCount > 0 ? 'success' : 'error'
                  "
                  :icon="
                    book.statistics.bookFileCount > 0
                      ? 'mdi-check'
                      : 'mdi-close'
                  "
                ></v-icon>
                {{ book.title }}</v-chip
              >
            </template>
          </div>
        </v-card>
      </v-col>
    </template>
  </v-row>
</template>

<style scoped>
.bookfiles {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 0 16px 16px 16px;
}
</style>
