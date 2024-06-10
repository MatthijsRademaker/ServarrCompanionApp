<script setup lang="ts">
import AuthorCard from '~/components/books/AuthorCard.vue';
import { useGetApiV1Author } from '~/thirdPartyApis/readarr';
import { getImageFilePath } from '~/helpers/files';

const { data: authors, isLoading: isLoadingAuthors } = useGetApiV1Author();

const filterValue = ref('');
const maxIndex = ref(10);
const filteredAuthors = computed(() => {
  if (filterValue.value === '' || filterValue.value === null) {
    return authors.value;
  }

  const filtered = authors.value?.filter((author) =>
    author?.authorName?.toLowerCase().includes(filterValue.value.toLowerCase())
  );

  return filtered;
});

const showOnlyDownloaded = ref(false);

watch(showOnlyDownloaded, (value) => {
  if (value) {
    filterValue.value = '';
  }
});

const downloadedAuthors = computed(() => {
  if (showOnlyDownloaded.value) {
    return filteredAuthors.value?.filter(
      (author) => author?.statistics?.bookFileCount > 0
    );
  }

  return filteredAuthors.value;
});

const authorsSlice = computed(() => {
  return downloadedAuthors.value?.slice(0, maxIndex.value);
});
</script>

<template>
  <v-row>
    <v-col>
      <h1>All authors</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="6" md="4">
      <v-text-field
        v-model="filterValue"
        label="Filter"
        outlined
        clearable
        placeholder="Author title..."
        appendInnerIcon="mdi-filter"
      ></v-text-field>
      <v-switch
        v-model="showOnlyDownloaded"
        label="Show only downloaded authors"
        hide-details
        inset
        color="primary"
      ></v-switch>
    </v-col>
  </v-row>
  <v-row>
    <template v-if="isLoadingAuthors || isLoadingAuthors">
      <v-col v-for="i in 9" cols="12" sm="6" md="4">
        <CardSkeletonLoader :key="i" is-loading />
      </v-col>
    </template>
    <template v-else>
      <v-col
        v-for="item in authorsSlice"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
      >
        <AuthorCard
          :title="item?.title ?? ''"
          :imgUrl="getImageFilePath(item)"
          :id="item?.id ?? 0"
          :genres="item?.genres ?? []"
          indexed
          :rating="item?.ratings?.value ?? 0"
          :go-to-route="`authors/indexed/${item?.id}`"
          :pagecount="item?.pageCount"
        />
      </v-col>
    </template>
  </v-row>
  <v-row>
    <v-col>
      <v-btn color="primary" @click="maxIndex += 10">Show more</v-btn>
    </v-col>
  </v-row>
</template>

<style scoped>
.authorfiles {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 0 16px 16px 16px;
}
</style>
