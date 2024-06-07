<script setup lang="ts">
import {
  useGetApiV1AlbumId,
  useGetApiV1MediacoverAlbumAlbumIdFilename,
} from '~/thirdPartyApis/lidarr';

const route = useRoute();

const { data: album, refetch: refetchGetAlbum } = useGetApiV1AlbumId(
  route.params.id as string
);

const imageFilePath = computed(() => {
  const subPath = album.value?.images?.[0].url;
  return `${import.meta.env.VITE_FILE_SERVER_URL}/lidarr${
    subPath?.split('?')[0]
  }`;
});

const albumFileParams = computed(() => ({
  albumId: [Number(route.params.id)],
  authorId: album.value?.authorId,
  albumFileIds: [0],
}));

const { data: fileData, refetch: refetchFile } =
  useGetApiV1MediacoverAlbumAlbumIdFilename(route.params.id as string, {
    query: {
      enabled: false,
    },
  });

watch(album, (newValue) => {
  if (newValue) {
    refetchFile();
  }
});

const { data: albumOverview } = useGetApiV1AlbumIdOverview(
  Number(route.params.id)
);

const download = () => {
  const url = String(fileData.value?.[0].path);
  const strippedUrl = url.substring(3);
  window.open(`${import.meta.env.VITE_FILE_SERVER_URL}/albums/${strippedUrl}`);
};

const isLoading = computed(() => {
  return !album.value || !albumOverview.value || !fileData.value;
});
const { mutate } = usePutApiV1AlbumMonitor();

const addAlbumToWatchList = () => {
  if (!album.value?.id) return;

  mutate(
    { data: { albumIds: [album.value?.id], monitored: true } },
    {
      onSuccess: () => {
        refetchGetAlbum();
      },
    }
  );
};
</script>
<template>
  <DetailedCard
    :is-loading="isLoading"
    :title="album?.title"
    :main-image-path="imageFilePath"
    :main-overview="albumOverview?.overview"
    :side-title="album?.author?.authorName"
    :side-image-path="album?.author?.images?.[0].url"
    :side-overview="album?.author?.overview"
    :genres="album?.genres"
    :good-reads-link="album?.links?.[0].url"
  >
    <template #buttons>
      <v-tooltip
        :text="fileData?.length === 0 ? 'Not present on disk' : 'Download file'"
        location="top"
      >
        <template v-slot:activator="{ props }">
          <div v-bind="props">
            <v-btn
              @click="download"
              color="primary"
              :disabled="fileData?.length === 0"
              ><v-icon :icon="'mdi-download'" />Download</v-btn
            >
          </div>
        </template> </v-tooltip
      ><v-tooltip
        :text="album?.monitored ? 'Already on watchlist' : 'Add to watchlist'"
        location="top"
      >
        <template v-slot:activator="{ props }">
          <div v-bind="props">
            <v-btn
              color="primary"
              :disabled="album?.monitored"
              @click="addAlbumToWatchList"
              ><v-icon
                :icon="
                  album?.monitored ? 'mdi-albummark' : 'mdi-albummark-outline'
                "
              />Add To WatchList</v-btn
            >
          </div>
        </template>
      </v-tooltip>
    </template>

    <template #additional-content>
      <!-- TODO see if even possible with API? -->
      <v-row>
        <v-col>
          <h2>Similar albums</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="i in 9" :key="i" cols="12" sm="6" md="4">
          <CardSkeletonLoader is-loading />
        </v-col>
      </v-row>
    </template>
  </DetailedCard>
</template>
