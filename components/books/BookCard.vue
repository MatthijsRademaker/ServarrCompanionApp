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
  author?: string;
}>();
</script>
<template>
  <ProductCard
    :title="title"
    :subTitle="`by ${author}`"
    :imgUrl="imgUrl"
    :id="id"
    :indexed="indexed"
    :genres="genres"
    :rating="rating"
    :go-to-route="goToRoute"
    :base-route="'readarr'"
  >
    <p><span class="text-caption">Page count:</span> {{ pagecount }}</p>
  </ProductCard>
</template>
