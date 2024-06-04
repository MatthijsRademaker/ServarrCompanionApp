<script setup lang="ts">
import { useGetApiV1Book } from '~/thirdPartyApis/readarr';

const { data: books, isLoading: isLoadingBooks } = useGetApiV1Book();

const filterValue = ref('');

const filteredBooks = computed(() => {
  if (filterValue.value === '' || filterValue.value === null) {
    return books.value;
  }

  return books.value?.filter((book) =>
    book?.title?.toLowerCase().includes(filterValue.value.toLowerCase())
  );
});

// TODO make util
const getImageFilePath = (item) => {
  const subPath = item?.images?.[0]?.url;
  return `${import.meta.env.VITE_FILE_SERVER_URL}/readarr${
    subPath?.split('?')[0]
  }`;
};

const showOnlyDownloaded = ref(false);

watch(showOnlyDownloaded, (value) => {
  if (value) {
    filterValue.value = '';
  }
});

const downloadedBooks = computed(() => {
  if (showOnlyDownloaded.value) {
    return filteredBooks.value?.filter(
      (book) => book?.statistics?.bookFileCount > 0
    );
  }

  return filteredBooks.value;
});
</script>

<template>
  <v-row>
    <v-col>
      <h1>All books</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="6" md="4">
      <v-text-field
        v-model="filterValue"
        label="Filter"
        outlined
        clearable
        placeholder="Book title..."
        appendInnerIcon="mdi-filter"
      ></v-text-field>
      <v-switch
        v-model="showOnlyDownloaded"
        label="Show only downloaded books"
        hide-details
        inset
        color="primary"
      ></v-switch>
    </v-col>
  </v-row>
  <v-row>
    <v-col v-if="isLoadingBooks || isLoadingBooks" cols="12" sm="6" md="4">
      <v-skeleton-loader
        :height="$vuetify.display.mobile ? 300 : 600"
        :width="$vuetify.display.mobile ? 300 : 1800"
        type="card"
      ></v-skeleton-loader>
    </v-col>
    <template v-else>
      <v-col
        v-for="item in downloadedBooks"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
      >
        <ProductCard
          :title="item?.title ?? ''"
          :imgUrl="getImageFilePath(item)"
          :id="item?.id ?? 0"
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
</template>

<style scoped>
.bookfiles {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 0 16px 16px 16px;
}
</style>
