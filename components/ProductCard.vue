<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { goToRelativePath, type BaseRoute } from '~/helpers/route';

interface Props {
  title: string;
  subTitle: string;
  imgUrl: string;
  id: number | string;
  rating: number;
  icon: string;
  genres?: string[];
  goToRoute: string;
  baseRoute: BaseRoute;
  disabled: boolean;
  variant: 'default' | 'highlight';
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  variant: 'default',
});

const goToDetails = () => {
  goToRelativePath(props.baseRoute, useRouter(), props.goToRoute);
};

const rating = ref<number>(props.rating);

const genresSlice = ref<string[] | undefined>(props.genres?.slice(0, 3));

// TODO move to indexed and not-indexed book routes
// On not indexed book routes immediately add to watchlist for readarr
// On indexed book routes add to personal watchlist
const supaBaseStore = useSupabaseStore();
supaBaseStore.getAlertList();

const { alertList } = storeToRefs(supaBaseStore);
const alreadyInWatchList = computed(() => {
  return alertList.value?.data?.find(
    (item) => item.book_id === props.id.toString()
  );
});

const handleAlertListClick = () => {
  if (alreadyInWatchList.value) {
    useFetch('/api/remove-from-alert-list', {
      method: 'POST',
      body: JSON.stringify({ bookId: props.id }),
    });
    return;
  }
  useFetch('/api/add-to-alert-list', {
    method: 'POST',
    body: JSON.stringify({ bookId: props.id }),
  });
};
//END TODO
const display = useDisplay();

const minHeight = computed(() => {
  switch (display.name.value) {
    case 'xs':
      return props.variant === 'highlight' ? 140 : 150;
    case 'sm':
      return 240;
    default:
      return props.variant === 'highlight' ? 240 : 300;
  }
});

const buttonSize = computed(() => {
  switch (display.name.value) {
    case 'xs':
      return 'medium';
    case 'sm':
      return 'medium';
    default:
      return 'large';
  }
});
</script>
<template>
  <v-card
    :key="id"
    :class="{
      grid: variant === 'default',
      'grid--highlight': variant === 'highlight',
    }"
    variant="elevated"
    :color="variant === 'highlight' ? 'accent' : ''"
    :min-height="minHeight"
  >
    <v-img
      :src="imgUrl"
      :alt="title"
      :class="{
        'grid-img': variant === 'default',
        'grid-img--highlight': variant === 'highlight',
      }"
      cover
    />
    <div class="grid-title px-2 pl-md-3 mb-2">
      <p
        class="pt-2 text-sm-subtitle-1 text-xl-h6 text-caption font-weight-bold book-title"
        @click="goToDetails"
      >
        {{ title }}
        <v-icon size="small">mdi-open-in-new</v-icon>
      </p>
      <v-card-subtitle class="author-title pl-0">
        {{ subTitle }}</v-card-subtitle
      >
    </div>
    <div v-if="$vuetify.display.mdAndUp" class="grid-additional-details">
      <template v-if="genres?.length && genresSlice?.length">
        <div class="mb-4 pl-2">
          <template v-for="genre in genresSlice">
            <v-chip size="small">{{ genre }}</v-chip>
          </template>
          <v-chip v-if="genres.length > genresSlice.length">...</v-chip>
        </div>
      </template>
      <template v-if="$vuetify.display.mdAndUp">
        <div class="pl-md-3">
          <slot />
        </div>
      </template>
    </div>
    <v-card-actions
      class="justify-end align-start flex-column"
      :class="{
        'grid-actions': variant === 'default',
        'grid-actions--highlight': variant === 'highlight',
      }"
    >
      <v-rating
        v-if="variant === 'default'"
        class="pl-2 mb-4"
        readonly
        density="compact"
        half-increments
        v-model="rating"
        active-color="orange-lighten-1"
        color="orange-lighten-1"
      ></v-rating>
      <div class="d-flex justify-space-between w-100">
        <v-btn
          :disabled="disabled"
          @click="router.push(`/readarr/books/indexed/${item.id}`)"
          icon
          :size="buttonSize"
        >
          <v-icon :size="$vuetify.display.xs ? 'default' : 'large'"
            >mdi-download</v-icon
          >
        </v-btn>
        <v-btn
          @click="router.push(`/readarr/books/indexed/${item.id}`)"
          icon
          :size="buttonSize"
        >
          <v-icon :size="$vuetify.display.xs ? 'default' : 'large'"
            >mdi-share</v-icon
          >
        </v-btn>
        <!-- TODO add/remove from watchlist -->
        <v-btn
          :size="buttonSize"
          @click="
            useFetch('/api/remove-from-alert-list', {
              method: 'POST',
              body: JSON.stringify({ bookId: item.id }),
            })
          "
          icon
        >
          <v-icon :size="$vuetify.display.xs ? 'default' : 'large'"
            >mdi-heart</v-icon
          >
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: 100px 1fr;
  column-gap: 8px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 140px 1fr;
  }

  @media screen and (min-width: 900px) {
    grid-template-columns: 180px 1fr;
  }
}

.grid--highlight {
  display: grid;
  grid-template-columns: 80px 1fr;

  @media screen and (min-width: 768px) {
    grid-template-columns: 140px 1fr;
  }

  @media screen and (min-width: 1441px) {
    grid-template-columns: 180px 1fr;
  }
}

.grid-img {
  grid-column: 1;
  grid-row: 1 / 4;
}

.grid-img--highlight {
  grid-column: 1;
  grid-row: 1 / 3;
}
.grid-title {
  grid-column: 2;
  grid-row: 1;
}
.grid-additional-details {
  grid-column: 2;
  grid-row: 2;
}

.grid-actions {
  grid-column: 2;
  grid-row: 3;
  padding-left: 0;
}

.grid-actions--highlight {
  grid-column: 2;
  grid-row: 2;
  padding-left: 0;
}

.book-title {
  cursor: pointer;
}
.author-title {
  cursor: pointer;
}
</style>
