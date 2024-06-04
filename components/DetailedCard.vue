<script setup lang="ts">
import { useDisplay } from 'vuetify';

const props = defineProps<{
  title: string;
  mainImagePath: string;
  mainOverview: string;
  sideTitle: string;
  sideImagePath: string;
  sideOverview: string;
  genres: string[];
  isLoading: boolean;
  link?: string;
  linkText?: string;
  height?: number;
  width?: number;
}>();

const goToLink = () => {
  window.open(props.link, '_blank');
};

const { mobile } = useDisplay();
</script>

<template>
  <v-row v-if="isLoading">
    <v-col cols="12" sm="6" md="4">
      <v-skeleton-loader
        :height="$vuetify.display.mobile ? 300 : 600"
        :width="$vuetify.display.mobile ? 300 : 1800"
        type="card"
      ></v-skeleton-loader>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col>
      <v-card>
        <v-card-title>
          <v-icon :icon="'mdi-book-open-page-variant'"></v-icon>
          {{ title }}
        </v-card-title>
        <div class="grid-container">
          <div class="one">
            <v-img
              cover
              :src="mainImagePath"
              :height="height ?? 340"
              :aspect-ratio="4 / 3"
            />
          </div>
          <div class="two" v-if="!mobile">
            <h2>Overview</h2>
            <div class="genre-container">
              <p>{{ mainOverview }}</p>
            </div>
          </div>
          <div class="three" v-if="!mobile && sideTitle">
            <h2>{{ sideTitle }}</h2>
            <div class="author-details-container">
              <img :src="sideImagePath" height="240" width="240" />
            </div>
          </div>
          <div class="four" v-if="!mobile && sideTitle">
            <p>{{ sideOverview }}</p>
          </div>
          <div :class="{ 'bottom-row': sideTitle, three: !sideTitle }">
            <h2>Genres</h2>
            <div class="genre-container">
              <template v-for="genre in genres">
                <v-chip>{{ genre }}</v-chip>
              </template>
            </div>
          </div>
        </div>
        <div class="button-container">
          <slot name="buttons" />
          <v-btn
            v-if="link"
            append-icon="mdi-open-in-new"
            color="primary"
            link
            @click="goToLink"
            >{{ linkText }}</v-btn
          >
        </div>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <slot name="additional-content" />
    </v-col>
  </v-row>
</template>

<style scoped>
.grid-container {
  @media screen and (min-width: 900px) {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr 2fr;
    grid-gap: 24px;
  }
  padding: 16px;
}
.one {
  grid-column: 1;
  grid-row: 1 / 4;
  max-height: 540px;
  overflow-y: auto;
}
.two {
  grid-column: 2;
  grid-row: 1;
  max-height: 540px;
  overflow-y: auto;
}

.three {
  grid-column: 3;
  grid-row: 1;
}

.four {
  @media screen and (min-width: 600px) {
    margin-top: 32px;
    max-height: 400px;
    overflow-y: auto;
  }
  grid-column: 4;
  grid-row: 1;
}

.bottom-row {
  @media screen and (min-width: 600px) {
    margin-top: 48px;
  }
  grid-column: 1/3;
  grid-row: 2;
}

.genre-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.author-details-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.button-container {
  display: flex;
  flex-direction: column;

  gap: 16px;
  padding: 16px;

  @media screen and (min-width: 600px) {
    flex-direction: row;
  }
}
</style>
