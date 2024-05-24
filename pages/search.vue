<script setup lang="ts">
import { useGetApiV1Search } from '~/thirdPartyApis/readarr/index';

const query = ref<string>();
const queryRequest = computed(() =>
  query.value && query.value.length > 3
    ? {
        term: query.value,
      }
    : undefined
);

const { data } = useGetApiV1Search(queryRequest);
</script>

<template>
  <h1>Search for your favorite Author or Book</h1>
</template>
