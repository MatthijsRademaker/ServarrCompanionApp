<script setup lang="ts">
const props = defineProps<{
  title: string;
  imgUrl: string;
  id: number | string;
  genres: string[];
  rating: number;
  pageCount: number;
  indexed?: boolean;
}>();

const subPath = props.indexed ? 'indexed' : 'not-indexed';
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
    icon="mdi-book-open-page-variant"
    :go-to-route="`/books/${subPath}/${id}`"
  >
    <p>Page count: {{ pageCount }}</p>
  </ProductCard>
</template>
