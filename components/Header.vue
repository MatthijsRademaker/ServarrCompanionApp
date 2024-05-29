<script setup lang="ts">
import logo from '~/assets/logo.png';
const router = useRouter();
const showDrawer = ref(false);
const showSecondDrawer = ref(false);

const items = [
  { title: 'Home', icon: 'mdi-home', to: '/' },
  { title: 'Book library', icon: 'mdi-book' },
  { title: 'Music library', icon: 'mdi-music' },
  { title: 'About', icon: 'mdi-information', to: '/about' },
];
const subItemsBooks = [
  { title: 'Home', icon: 'mdi-home', to: '/readarr' },
  { title: 'Search', icon: 'mdi-magnify', to: '/readarr/search' },
  {
    title: 'Bookshelf',
    icon: 'mdi-bookshelf',
    to: '/readarr/bookshelf',
  },
];

const subItemsMusic = [
  { title: 'Home', icon: 'mdi-home', to: '/lidarr' },
  { title: 'Search', icon: 'mdi-magnify', to: '/lidarr/search' },
  {
    title: 'Albums',
    icon: 'mdi-album',
    to: '/lidarr/albums',
  },
];

const subItems = ref(subItemsBooks);

const onNavItemClick = (to: string) => {
  router.push(to);
  showDrawer.value = false;
};

const setSubList = (title: string, to?: string) => {
  if (to) {
    onNavItemClick(to);
  }
  if (title === 'Book library') {
    subItems.value = subItemsBooks;
  } else {
    subItems.value = subItemsMusic;
  }

  showSecondDrawer.value = true;
};
</script>

<template>
  <v-app-bar class="header">
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        @click.stop="showDrawer = !showDrawer"
      ></v-app-bar-nav-icon>
      <v-img src="/assets/logo.png" width="80" height="80" />
    </template>
    <v-app-bar-title> Servarr Companion App </v-app-bar-title>

    <v-spacer></v-spacer>
  </v-app-bar>

  <v-navigation-drawer
    v-model="showDrawer"
    :location="$vuetify.display.mobile ? 'top' : undefined"
    permanent
    ><v-list :items="items" nav
      ><v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        color="primary"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title
          v-text="item.title"
          @click="setSubList(item.title, item.to)"
        ></v-list-item-title> </v-list-item
    ></v-list>
  </v-navigation-drawer>
  <v-navigation-drawer
    v-model="showSecondDrawer"
    :location="$vuetify.display.mobile ? 'top' : undefined"
    temporary
  >
    <v-list :items="subItems" nav
      ><v-list-item
        v-for="(item, i) in subItems"
        :key="i"
        :value="item"
        color="primary"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title
          v-text="item.title"
          @click="onNavItemClick(item.to)"
        ></v-list-item-title> </v-list-item
    ></v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.header {
  margin-bottom: 64px;
}

.title {
  display: flex;
  align-items: center;
}
</style>
