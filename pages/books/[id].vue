<script setup lang="ts">
import {
  useGetApiV1Bookfile,
  useGetApiV1BookId,
  useGetApiV1BookIdOverview,
  useGetApiV1BookLookup,
  usePutApiV1BookMonitor,
} from '~/thirdPartyApis/readarr';

const route = useRoute();

const { data: books } = useGetApiV1BookLookup({
  term: route.params.id as string,
});

const book = computed(() => books.value?.[0]);
// const filePath = computed(
//   () =>
//     `${import.meta.env.VITE_HTTP_FILE_SERVER_URL}/readarr${
//       book.value?.images?.[0].url
//     }`
// );

const bookFileParams = computed(() => ({
  bookId: [Number(route.params.id)],
  authorId: book.value?.authorId,
  bookFileIds: [0],
}));

const { data: fileData, refetch } = useGetApiV1Bookfile(bookFileParams, {
  query: {
    enabled: false,
  },
});

watch(book, (newValue) => {
  if (newValue) {
    refetch();
  }
});

const { data: bookOverview } = useGetApiV1BookIdOverview(
  Number(route.params.id)
);

const download = () => {
  const url = String(fileData.value?.[0].path);
  const strippedUrl = url.substring(3);
  window.open(
    `${import.meta.env.VITE_HTTP_FILE_SERVER_URL}/books/${strippedUrl}`
  );
};

const goToAuthorOnGoodReads = () => {
  window.open(book.value?.links?.[0].url, '_blank');
};

const { mutate } = usePutApiV1BookMonitor();

const addBookToWatchList = () => {
  if (!book.value?.id) return;

  mutate({ data: { bookIds: [book.value?.id], monitored: true } });
};
</script>
<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <v-icon :icon="'mdi-book-open-page-variant'"></v-icon>
          {{ book?.title }}
        </v-card-title>
        <div class="grid-container">
          <div class="one">
            <img :src="book?.images?.[0].url" height="340" width="240" />
          </div>
          <div class="two">
            <h2>Overview</h2>
            <div class="genre-container">
              <p>{{ bookOverview?.overview }}</p>
            </div>
          </div>
          <div class="three">
            <h2>{{ book?.author?.authorName }}</h2>
            <div class="author-details-container">
              <img
                :src="book?.author?.images?.[0].url"
                height="240"
                width="240"
              />
            </div>
          </div>
          <div class="four">
            <p>{{ book?.author?.overview }}</p>
          </div>
          <div class="bottom-row">
            <h2>Genres</h2>
            <div class="genre-container">
              <template v-for="genre in book?.genres">
                <v-chip>{{ genre }}</v-chip>
              </template>
            </div>
          </div>
        </div>
        <div class="button-container">
          <v-tooltip
            :text="
              fileData?.length === 0 ? 'Not present on disk' : 'Download file'
            "
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
            </template>
          </v-tooltip>
          <v-tooltip
            :text="
              book?.monitored ? 'Already on watchlist' : 'Add to watchlist'
            "
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
          <v-btn
            append-icon="mdi-open-in-new"
            color="primary"
            link
            @click="goToAuthorOnGoodReads"
            >See on GoodReads</v-btn
          >
        </div>
      </v-card>
    </v-col>
  </v-row>

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

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr 2fr;
  grid-gap: 24px;
  padding: 16px;
}
.one {
  grid-column: 1;
  grid-row: 1 / 4;
}
.two {
  grid-column: 2;
  grid-row: 1;
}

.three {
  grid-column: 3;
  grid-row: 1;
}

.four {
  @media screen and (min-width: 600px) {
    margin-top: 32px;
  }
  grid-column: 4;
  grid-row: 1;
}

.bottom-row {
  margin-top: 16px;
  grid-column: 1/3;
  grid-row: 2;
}

.genre-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.author-details-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.button-container {
  display: flex;
  gap: 16px;
  padding: 16px;
}
</style>
