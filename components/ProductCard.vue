<script setup lang="ts">
import { goToRelativePath } from '~/helpers/route';

const props = defineProps<{
  title: string;
  imgUrl: string;
  id: number | string;
  rating: number;
  icon: string;
  imgWidth: number;
  imgHeight: number;
  genres?: string[];
  goToRoute: string;
}>();

const goToDetails = () => {
  goToRelativePath(props.goToRoute);
};

const rating = ref<number>(props.rating);

const genresSlice = ref<string[] | undefined>(props.genres?.slice(0, 3));
</script>
<template>
  <v-card variant="elevated">
    <v-card-title class="title">
      <v-icon :icon="icon"></v-icon>
      {{ title }}
    </v-card-title>
    <div class="grid-container">
      <div class="one">
        <img :src="imgUrl" :height="imgHeight" :width="imgWidth" />
      </div>
      <div
        class="two"
        :class="{
          'two--no-genres': !genres?.length,
        }"
      >
        <template v-if="genres?.length && genresSlice?.length">
          <h2>Genres</h2>
          <div class="genre-container">
            <template v-for="(genre, index) in genresSlice">
              <v-chip>{{ genre }}</v-chip>
            </template>
            <v-chip v-if="genres.length > genresSlice.length">...</v-chip>
          </div>
        </template>
        <template v-else>
          <slot />
        </template>
      </div>
      <div class="three">
        <div class="additional-details-container">
          <template v-if="genres?.length">
            <slot />
          </template>
        </div>
        <v-rating
          readonly
          density="compact"
          half-increments
          v-model="rating"
          active-color="orange-lighten-1"
          color="orange-lighten-1"
        ></v-rating>
      </div>
    </div>
    <v-card-actions>
      <v-list-item
        append-icon="mdi-chevron-right"
        color="primary"
        link
        @click="goToDetails"
        >Go to details</v-list-item
      >
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.title {
  overflow: visible;
  white-space: initial;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 600px) {
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
}

.grid-container {
  padding: 16px 16px 0 16px;
  @media screen and (min-width: 900px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 24px;
    padding: 16px;
  }
}
.one {
  grid-column: 1;
  grid-row: 1 / 4;
}

.two {
  grid-column: 2;
  grid-row: 1 / 2;
  margin-bottom: 16px;
  @media screen and (min-width: 600px) {
    margin-bottom: 0;
  }
}

.two--no-genres {
  grid-row: 1 / 3;
  max-height: 117px;

  overflow: hidden;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }
}

.three {
  grid-column: 2;
  grid-row: 3;
}

.genre-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.additional-details-container {
  margin-bottom: 16px;
  padding-left: 4px;
  overflow: hidden;

  overflow-y: scroll;
  max-height: 60px;

  &::-webkit-scrollbar {
    width: 8px;
  }
}
</style>
