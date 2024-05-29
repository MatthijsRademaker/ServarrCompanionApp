<script setup lang="ts">
const props = defineProps<{
  title: string;
  imgUrl: string;
  id: number | string;
  rating: number;
  indexed?: boolean;
  overview: string;
}>();
const subPath = props.indexed ? 'indexed' : 'not-indexed';
</script>
<template>
  <ProductCard
    :title="title"
    :imgUrl="imgUrl"
    :img-width="200"
    :img-height="200"
    :id="id"
    :rating="rating"
    icon="mdi-card-account-details"
    :go-to-route="`/authors/${subPath}/${id}`"
  >
    <p>{{ overview }}</p>
  </ProductCard>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 24px;
  padding: 16px;
}
.one {
  grid-column: 1;
  grid-row: 1 / 4;
}
.two {
  grid-column: 2;
  grid-row: 1 / 2;
}

.three {
  grid-column: 2;
  grid-row: 3;
}
</style>
