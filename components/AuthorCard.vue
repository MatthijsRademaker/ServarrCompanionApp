<script setup lang="ts">
const props = defineProps<{
  title: string;
  imgUrl: string;
  id: number;
  rating: number;
  overview: string;
}>();

const router = useRouter();

const rating = ref<number>(props.rating);
</script>
<template>
  <ProductCard
    :title="title"
    :imgUrl="imgUrl"
    :id="id"
    :rating="rating"
    type="authors"
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
