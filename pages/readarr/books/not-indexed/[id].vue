<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const { isLoading, book, AddToWishlist } = useNotIndexedBook(id);

const onAddToWishlist = async () => {
  await AddToWishlist();
  router.push(`/readarr/books/indexed/${book.value?.id}`);
};
</script>
<template>
  <DetailedCard
    :is-loading="isLoading"
    :title="book?.title"
    :main-image-path="book?.images?.[0]?.url"
    :main-overview="book?.overview"
    :side-title="book?.author?.authorName"
    :side-image-path="book?.author?.images?.[0]?.url"
    :side-overview="book?.author?.overview"
    :genres="book?.genres"
    :good-reads-link="book?.links?.[0]?.url"
  >
    <template #buttons>
      <v-tooltip text="'Add to wishlist'" location="top">
        <template v-slot:activator="{ props }">
          <div v-bind="props">
            <v-btn
              color="primary"
              class="w-100"
              :loading="isLoading"
              :disabled="book?.monitored || isLoading"
              @click="onAddToWishlist"
              ><v-icon icon="mdi-heart-outline" />Add To Wishlist</v-btn
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
