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
    :id="id"
    :indexed="indexed"
    :genres="genres"
    :rating="rating"
    :img-width="200"
    :img-height="180"
    icon="mdi-card-account-details"
    :go-to-route="goToRoute"
    :base-route="'readarr'"
  >
    <p>{{ overview }}</p>
  </ProductCard>
</template>
