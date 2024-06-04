<script setup lang="ts">
import { useGetApiV1Author } from '~/thirdPartyApis/readarr';

const { data: authors, isLoading } = useGetApiV1Author();

const getImageFilePath = (item) => {
  const subPath = item?.images?.[0].url;
  return `${import.meta.env.VITE_FILE_SERVER_URL}/readarr${
    subPath?.split('?')[0]
  }`;
};
</script>

<template>
  <v-row>
    <v-col>
      <h1>Already indexed authors</h1>
    </v-col>
  </v-row>
  <v-row v-if="isLoading">
    <v-col cols="12" sm="6" md="4">
      <v-skeleton-loader
        :height="$vuetify.display.mobile ? 300 : 600"
        :width="$vuetify.display.mobile ? 300 : 1800"
        type="card"
      ></v-skeleton-loader>
    </v-col>
  </v-row>

  <v-row>
    <template v-if="authors">
      <v-col v-for="item in authors" :key="item.id" cols="12" sm="6" md="4">
        <AuthorCard
          :title="item?.authorName ?? ''"
          :imgUrl="getImageFilePath(item)"
          :id="item.id ?? item?.foreignAuthorId ?? 0"
          :indexed="item?.id !== 0"
          :genres="item?.genres ?? []"
          :rating="item?.ratings?.value ?? 0"
          :overview="item?.overview ?? ''"
        />
      </v-col>
    </template>
  </v-row>
</template>
