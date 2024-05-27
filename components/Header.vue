<script setup lang="ts">
import logo from '~/assets/logo.png';
const router = useRouter();
const showDrawer = ref(false);

const items = [
  { title: 'Home', icon: 'mdi-home', to: '/' },
  { title: 'Search', icon: 'mdi-magnify', to: '/search' },
  {
    title: 'Bookshelf',
    icon: 'mdi-bookshelf',
    to: '/bookshelf',
  },
  { title: 'About', icon: 'mdi-information', to: '/about' },
];

const onNavItemClick = (to: string) => {
  router.push(to);
  showDrawer.value = false;
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

    <v-btn icon="mdi-account"></v-btn>
  </v-app-bar>
  <v-navigation-drawer
    v-model="showDrawer"
    :location="$vuetify.display.mobile ? 'top' : undefined"
    temporary
  >
    <v-list :items="items" nav
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
