<script setup lang="ts">
import { usePostApiV1Artist, useGetApiV1Search } from '~/thirdPartyApis/lidarr';

const route = useRoute();
const id = route.params.id as string;

const { data: searchResult, isLoading: isLoadingSearch } = useGetApiV1Search(
  {
    term: `lidarr:${id}`,
  },
  {
    query: {
      enabled: id !== undefined,
    },
  }
);
const artist = computed(
  () =>
    searchResult.value?.find((entity) => entity.artist !== undefined)?.artist
);

const { mutate } = usePostApiV1Artist();

const addArtistToWatchList = () => {
  if (!artist.value) return;
  const addOptionsArtist = {
    addOptions: {
      searchForMissingAlbums: false,
      monitor: 'all',
    },
  };
  const postData = {
    ...artist.value,
    qualityProfileId: 2,
    metadataProfileId: 1,
    rootFolderPath: 'Q:\\',
    monitored: true,
    ...addOptionsArtist,
  };

  mutate({ data: postData });
};
</script>
<template>
  <DetailedCard
    :is-loading="isLoadingSearch"
    :title="artist?.artistName"
    :main-image-path="artist?.remotePoster"
    :main-overview="artist?.overview"
    :side-title="artist?.author?.authorName"
    :side-image-path="artist?.author?.images?.[0].url"
    :side-overview="artist?.overview"
    :genres="artist?.genres"
    :good-reads-link="artist?.links?.[0].url"
    :width="440"
    :height="540"
  >
    <template #buttons>
      <v-tooltip
        :text="artist?.monitored ? 'Already on watchlist' : 'Add to watchlist'"
        location="top"
      >
        <template v-slot:activator="{ props }">
          <div v-bind="props">
            <v-btn
              color="primary"
              class="w-100"
              :loading="isLoadingSearch"
              :disabled="artist?.monitored || isLoadingSearch"
              @click="addArtistToWatchList"
              ><v-icon
                :icon="
                  artist?.monitored
                    ? 'mdi-artistmark'
                    : 'mdi-artistmark-outline'
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
          <h2>Similar artists</h2>
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
