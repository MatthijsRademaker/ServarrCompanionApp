<script setup lang="ts">
import { useDisplay } from 'vuetify';

defineProps<{
  isLoading: boolean;
}>();

const display = useDisplay();

const height = computed(() => {
  switch (display.name.value) {
    case 'xs':
      return 300;
    case 'sm':
      return 400;
    case 'md':
      return 500;
    case 'lg':
      return 600;
    case 'xl':
      return 700;
    default:
      return 300;
  }
});

const width = computed(() => {
  switch (display.name.value) {
    case 'xs':
      return 300;
    case 'sm':
      return 400;
    case 'md':
      return 500;
    case 'lg':
      return 600;
    case 'xl':
      return 700;
    default:
      return 300;
  }
});
</script>
<template>
  <v-skeleton-loader
    class="skeleton-loader"
    :loading="isLoading"
    :max-height="height"
    :max-width="width"
    type="card"
  >
    <slot />
  </v-skeleton-loader>
</template>

<style scoped>
.skeleton-loader {
  margin: 0 auto;
  display: flex;
}
</style>
