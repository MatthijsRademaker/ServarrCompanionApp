<script setup lang="ts">
import { useTheme } from 'vuetify';

const theme = useTheme();

theme.global.name.value = 'lidarr';
</script>
<template>
  <NuxtPage />
</template>
