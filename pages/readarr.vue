<script setup lang="ts">
import { useTheme } from 'vuetify';

const theme = useTheme();

theme.global.name.value = 'readarr';
</script>
<template>
  <NuxtPage />
</template>
