<script setup lang="ts">
import { useGetApiV1Artist, useGetApiV1Album } from '~/thirdPartyApis/lidarr';

const { data: artists, isLoading: isLoadingArtists } = useGetApiV1Artist();
const { data: albums, isLoading: isLoadingAlbums } = useGetApiV1Album();

const getImageFilePath = (item) => {
  const subPath = item?.images?.[0].url;
  return `${import.meta.env.VITE_FILE_SERVER_URL}/lidarr${
    subPath?.split('?')[0]
  }`;
};

const artistsSlice = computed(() => {
  const copy = artists.value?.slice();

  return copy?.reverse()?.slice(0, 4);
});

const albumsSlice = computed(() => {
  const copy = albums.value?.slice();
  return copy?.reverse()?.slice(0, 4);
});
</script>

<template>
  <v-row>
    <v-col>
      <h1>Recently added artists</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col v-if="isLoadingArtists" cols="12" sm="6" md="4">
      <CardSkeletonLoader is-loading />
    </v-col>
    <template v-if="artists">
      <v-col
        v-for="item in artistsSlice"
        :key="item.id"
        cols="12"
        sm="6"
        md="3"
      >
        <ProductCard
          :title="item.artistName"
          :imgUrl="getImageFilePath(item)"
          :id="item.id"
          :img-width="140"
          :img-height="180"
          :genres="item.genres"
          :rating="item.ratings.value"
          icon="mdi-account-music"
          :go-to-route="`/artists/indexed/${item.id}`"
        >
        </ProductCard>
      </v-col>
    </template>
  </v-row>
  <v-row>
    <v-col>
      <NuxtLink to="/artists">
        <v-btn color="primary">View all artists</v-btn>
      </NuxtLink>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <h1>Recently added albums</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col v-if="isLoadingAlbums" cols="12" sm="6" md="4">
      <CardSkeletonLoader is-loading />
    </v-col>
    <template v-if="albums">
      <v-col v-for="item in albumsSlice" :key="item.id" cols="12" sm="6" md="3">
        <ProductCard
          :title="item.title"
          :imgUrl="getImageFilePath(item)"
          :id="item.id"
          :img-width="140"
          :img-height="180"
          :genres="item.genres"
          :rating="item.ratings.value"
          icon="mdi-music-box-multiple"
          :go-to-route="`/albums/indexed/${item.id}`"
        >
        </ProductCard>
      </v-col>
    </template>
  </v-row>
  <v-row>
    <v-col>
      <NuxtLink to="/albums">
        <v-btn color="primary">View all albums</v-btn>
      </NuxtLink>
    </v-col>
  </v-row>
</template>
