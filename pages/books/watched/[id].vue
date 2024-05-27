<script setup lang="ts">
import {
  useGetApiV1Bookfile,
  useGetApiV1BookId,
  useGetApiV1BookIdOverview,
  usePutApiV1BookMonitor,
} from '~/thirdPartyApis/readarr';

const route = useRoute();

const { data: book, refetch: refetchGetBook } = useGetApiV1BookId(
  route.params.id as string
);

const filePath = computed(() => {
  const subPath = book.value?.images?.[0].url;
  return `${import.meta.env.VITE_FILE_SERVER_URL}/readarr${
    subPath?.split('?')[0]
  }`;
});

const bookFileParams = computed(() => ({
  bookId: [Number(route.params.id)],
  authorId: book.value?.authorId,
  bookFileIds: [0],
}));

const { data: fileData, refetch: refetchFile } = useGetApiV1Bookfile(
  bookFileParams,
  {
    query: {
      enabled: false,
    },
  }
);

watch(book, (newValue) => {
  if (newValue) {
    refetchFile();
  }
});

const { data: bookOverview } = useGetApiV1BookIdOverview(
  Number(route.params.id)
);

const download = () => {
  const url = String(fileData.value?.[0].path);
  const strippedUrl = url.substring(3);
  window.open(`${import.meta.env.VITE_FILE_SERVER_URL}/books/${strippedUrl}`);
};

const isLoading = computed(() => {
  return !book.value || !bookOverview.value || !fileData.value;
});
const { mutate } = usePutApiV1BookMonitor();

const addBookToWatchList = () => {
  if (!book.value?.id) return;

  mutate(
    { data: { bookIds: [book.value?.id], monitored: true } },
    {
      onSuccess: () => {
        refetchGetBook();
      },
    }
  );
};
</script>
<template>
  <DetailedCard
    :is-loading="isLoading"
    :title="book?.title"
    :main-image-path="filePath"
    :main-overview="bookOverview?.overview"
    :side-title="book?.author?.authorName"
    :side-image-path="book?.author?.images?.[0].url"
    :side-overview="book?.author?.overview"
    :genres="book?.genres"
    :good-reads-link="book?.links?.[0].url"
  >
    <template #buttons>
      <v-tooltip
        :text="fileData?.length === 0 ? 'Not present on disk' : 'Download file'"
        location="top"
      >
        <template v-slot:activator="{ props }">
          <div v-bind="props">
            <v-btn
              @click="download"
              color="primary"
              :disabled="fileData?.length === 0"
              ><v-icon :icon="'mdi-download'" />Download</v-btn
            >
          </div>
        </template> </v-tooltip
      ><v-tooltip
        :text="book?.monitored ? 'Already on watchlist' : 'Add to watchlist'"
        location="top"
      >
        <template v-slot:activator="{ props }">
          <div v-bind="props">
            <v-btn
              color="primary"
              :disabled="book?.monitored"
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
          <v-skeleton-loader height="200" type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
    </template>
  </DetailedCard>
</template>
