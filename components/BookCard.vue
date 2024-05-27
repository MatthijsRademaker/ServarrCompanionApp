<script setup lang="ts">
defineProps<{
  title: string;
  imgUrl: string;
  id: number | string;
  genres: string[];
  rating: number;
  pageCount: number;
  indexed?: boolean;
}>();
</script>
<template>
  <ProductCard
    :title="title"
    :imgUrl="imgUrl"
    :id="id"
    :img-width="140"
    :img-height="180"
    :genres="genres"
    :rating="rating"
    :indexed="indexed ?? false"
    type="books"
  >
    <p>Page count: {{ pageCount }}</p>
  </ProductCard>
</template>
