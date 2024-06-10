<script setup lang="ts">
import { usePostApiV1Book, useGetApiV1Search } from '~/thirdPartyApis/readarr';

const route = useRoute();
const id = route.params.id as string;

const { data: searchResult, isLoading: isLoadingSearch } = useGetApiV1Search(
  {
    term: `work:${id}`,
  },
  {
    query: {
      enabled: id !== undefined,
    },
  }
);
const book = computed(
  () => searchResult.value?.find((entity) => entity.book !== undefined)?.book
);

const author = computed(() => book.value?.author);
const { mutate } = usePostApiV1Book();

const addBookToWatchList = () => {
  if (!book.value || !author.value) return;
  const addOptionsBook = {
    addOptions: {
      searchForNewBook: false,
    },
  };
  const addOptionsAuthor = {
    author: {
      ...author.value,
      addOptions: {
        searchForMissingBooks: false,
        booksToMonitor: [id],
      },
      rootFolderPath: 'B:\\',
    },
  };
  const postData = {
    ...book.value,
    ...addOptionsBook,
    ...addOptionsAuthor,
  };

  mutate({ data: postData });
};
</script>
<template>
  <DetailedCard
    :is-loading="isLoadingSearch"
    :title="book?.title"
    :main-image-path="book?.images?.[0]?.url"
    :main-overview="book?.overview"
    :side-title="book?.author?.authorName"
    :side-image-path="book?.author?.images?.[0].url"
    :side-overview="book?.author?.overview"
    :genres="book?.genres"
    :good-reads-link="book?.links?.[0].url"
  >
    <template #buttons>
      <v-tooltip
        :text="book?.monitored ? 'Already on watchlist' : 'Add to watchlist'"
        location="top"
      >
        <template v-slot:activator="{ props }">
          <div v-bind="props">
            <v-btn
              color="primary"
              class="w-100"
              :loading="isLoadingSearch"
              :disabled="book?.monitored || isLoadingSearch"
              @click="addBookToWatchList"
              ><v-icon
                :icon="
                  book?.monitored ? 'mdi-bookmark' : 'mdi-bookmark-outline'
                "
              />Add To WatchList</v-btn
            >
          </div>
        </template>
      </v-tooltip>
    </template>

    <template #additional-content>
      <!-- TODO see if even possible with API? -->
      <v-row>
        <v-col>
          <h2>Similar books</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="i in 9" :key="i" cols="12" sm="6" md="4">
          <CardSkeletonLoader is-loading />
        </v-col>
      </v-row>
    </template>
  </DetailedCard>
</template>
