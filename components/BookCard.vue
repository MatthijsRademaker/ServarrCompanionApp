<script setup lang="ts">
defineProps<{
  title: string;
  imgUrl: string;
  id: number;
  genres: string[];
  rating: number;
  pageCount: number;
}>();
</script>
<template>
  <ProductCard
    :title="title"
    :imgUrl="imgUrl"
    :id="id"
    :genres="genres"
    :rating="rating"
    type="books"
  >
    <p>Page count: {{ pageCount }}</p>
  </ProductCard>
</template>
