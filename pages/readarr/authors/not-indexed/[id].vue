<script setup lang="ts">
import { useGetApiV1AuthorId } from '~/thirdPartyApis/readarr';

const route = useRoute();
// TODO find goodreads id
</script>
<template>
  <!-- TODO fill with next book -->
  <DetailedCard
    :is-loading="isLoading"
    :title="author?.authorName"
    :main-image-path="imageFilePath"
    :main-overview="author?.overview"
    :side-title="author?.authorName"
    :side-image-path="author?.images?.[0].url"
    :side-overview="author?.overview"
    :genres="genres"
    :good-reads-link="links?.[0].url"
  >
    <template #buttons>
      <!-- TODO should be buttons to add entire catalog -->
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
        :text="book?.monitored ? 'Already on wishlist' : 'Add to wishlist'"
        location="top"
      >
        <template v-slot:activator="{ props }">
          <div v-bind="props">
            <v-btn
              color="primary"
              :disabled="book?.monitored"
              @click="addBookToWatchList"
              ><v-icon
                :icon="book?.monitored ? 'mdi-heart' : 'mdi-heart-outline'"
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
        <template v-if="books">
          <v-col v-for="item in books" :key="item.id" cols="12" sm="6" md="4">
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
    </template>
  </DetailedCard>
</template>
