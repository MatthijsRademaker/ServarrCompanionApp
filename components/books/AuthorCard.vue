<script setup lang="ts">
defineProps<{
  title: string;
  imgUrl: string;
  id: number | string;
  rating: number;
  indexed: boolean;
  genres?: string[];
  goToRoute: string;
  overview?: string | null;
}>();
</script>
<template>
  <ProductCard
    :title="title"
    :imgUrl="imgUrl"
    :sub-title="`known for`"
    :id="id"
    :indexed="indexed"
    :genres="genres"
    :rating="rating"
    :go-to-route="goToRoute"
    :base-route="'readarr'"
    variant="compact"
  >
    <p>{{ overview }}</p>
  </ProductCard>
</template>
