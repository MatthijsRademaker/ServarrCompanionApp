<script setup lang="ts">
import { usePutApiV1BookMonitor } from '~/thirdPartyApis/readarr';

const route = useRoute();

const {
  book,
  imageFilePath,
  bookOverview,
  fileData,
  isLoading,
  AddToWishlist,
  DownloadBook,
} = useIndexedBook(route.params.id as string);

const presentOnDisk = computed(() => fileData.value?.length > 0);

const onDownloadClick = async () => {
  DownloadBook();
};

const onAddToWishlist = async () => {
  await AddToWishlist();
};

const user = useSupabaseUser();

const supaBaseStore = useSupabaseStore();
const { wishList, isLoggedIn } = storeToRefs(supaBaseStore);

const alreadyOnWishList = computed(() => {
  return (
    wishList.value?.find(
      (item) => item.book_id === book.value?.id?.toString()
    ) !== undefined
  );
});

const wishListToolTipContent = computed(() => {
  if (!isLoggedIn.value) {
    return 'Login to add to wishlist';
  }
  return alreadyOnWishList.value ? 'Already on wishlist' : 'Add to wishlist';
});
</script>
<template>
  <DetailedCard
    :is-loading="isLoading"
    :title="book?.title"
    :main-image-path="imageFilePath"
    :main-overview="bookOverview?.overview"
    :side-title="book?.author?.authorName"
    :side-image-path="book?.author?.images?.[0]?.url"
    :side-overview="book?.author?.overview"
    :genres="book?.genres"
    :good-reads-link="book?.links?.[0]?.url"
  >
    <template #buttons>
      <v-tooltip
        :text="presentOnDisk ? 'Download file' : 'Not present on disk'"
        location="top"
      >
        <template v-slot:activator="{ props }">
          <div v-bind="props">
            <v-btn
              @click="onDownloadClick"
              color="primary"
              :disabled="!presentOnDisk"
              ><v-icon :icon="'mdi-download'" />Download</v-btn
            >
          </div>
        </template> </v-tooltip
      ><v-tooltip :text="wishListToolTipContent" location="top">
        <template v-slot:activator="{ props }">
          <div v-bind="props">
            <v-btn
              color="primary"
              :disabled="alreadyOnWishList && user !== null"
              @click="onAddToWishlist"
              ><v-icon
                :icon="alreadyOnWishList ? 'mdi-heart' : 'mdi-heart-outline'"
              />Add To wishlist</v-btn
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
