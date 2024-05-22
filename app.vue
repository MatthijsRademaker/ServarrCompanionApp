<script setup lang="ts">
const { data } = useFetch('/api/search', { params: { q: 'vue' } });
</script>
<template>
  <div>
    <h1>{{ data }}</h1>
    <NuxtWelcome />
  </div>
</template>
