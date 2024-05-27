<script setup lang="ts">
import { useGetApiV1Book } from '~/thirdPartyApis/readarr';

const { data: books, isLoading } = useGetApiV1Book();

const getImageFilePath = (item: BookResource) => {
  const subPath = item?.images?.[0].url;
  return `${import.meta.env.VITE_FILE_SERVER_URL}/readarr${
    subPath?.split('?')[0]
  }`;
};
</script>

<template>
  <v-row>
    <v-col>
      <h1>Ready for download</h1>
    </v-col>
  </v-row>

  <v-row>
    <template v-if="fileData">
      <v-col v-for="item in fileData" :key="item.id" cols="12" sm="6" md="4">
        <BookCard
          :title="item?.title ?? ''"
          :imgUrl="getImageFilePath(item)"
          :id="item.id ?? item?.foreignBookId ?? 0"
          :indexed="item?.id !== 0"
          :genres="item?.genres ?? []"
          :rating="item?.ratings?.value ?? 0"
          :pageCount="item?.pageCount ?? 0"
        />
      </v-col>
    </template>
  </v-row>
  <v-row>
    <v-col>
      <h1>Already Indexed books</h1>
    </v-col>
  </v-row>
  <v-row v-if="isLoading">
    <v-col cols="12" sm="6" md="4">
      <v-skeleton-loader
        height="600"
        width="1800"
        type="card"
      ></v-skeleton-loader>
    </v-col>
  </v-row>

  <v-row>
    <template v-if="books">
      <v-col v-for="item in books" :key="item.id" cols="12" sm="6" md="4">
        <BookCard
          :title="item?.title ?? ''"
          :imgUrl="getImageFilePath(item)"
          :id="item.id ?? item?.foreignBookId ?? 0"
          :indexed="item?.id !== 0"
          :genres="item?.genres ?? []"
          :rating="item?.ratings?.value ?? 0"
          :pageCount="item?.pageCount ?? 0"
        />
      </v-col>
    </template>
  </v-row>
</template>
