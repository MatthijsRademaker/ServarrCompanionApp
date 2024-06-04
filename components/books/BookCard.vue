<script setup lang="ts">
defineProps<{
  title: string;
  imgUrl: string;
  id: number | string;
  rating: number;
  indexed: boolean;
  genres?: string[];
  goToRoute: string;
  pagecount?: number;
}>();
</script>
<template>
  <ProductCard
    :title="title"
    :imgUrl="imgUrl"
    :id="id"
    :indexed="indexed"
    :genres="genres"
    :rating="rating"
    :img-width="140"
    :img-height="180"
    icon="mdi-book-open-page-variant"
    :go-to-route="goToRoute"
    :base-route="'readarr'"
  >
    <p>Page count: {{ pagecount }}</p>
  </ProductCard>
</template>
