<script setup lang="ts">
import HeaderMenu from './navigation/HeaderMenu.vue';
import HeaderUser from './navigation/HeaderUser.vue';

const showMenuDrawer = ref(false);
const showSubMenuDrawer = ref(false);

const showAccountDrawer = ref(false);
const user = useSupabaseUser();
</script>

<template>
  <v-app-bar class="header" flat>
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        @click.stop="showMenuDrawer = !showMenuDrawer"
      ></v-app-bar-nav-icon>
      <v-img src="/assets/logo.png" width="80" height="80" />
    </template>
    <v-app-bar-title v-if="!$vuetify.display.mobile">
      Servarr Companion App
    </v-app-bar-title>

    <v-spacer></v-spacer>
    <v-btn
      icon
      @click="
        () => {
          showMenuDrawer = false;
          showSubMenuDrawer = false;
          showAccountDrawer = !showAccountDrawer;
        }
      "
      ><v-icon
        :icon="user ? 'mdi-account-check' : 'mdi-account-cancel'"
      ></v-icon
    ></v-btn>
  </v-app-bar>
  <HeaderMenu
    :show-drawer="showMenuDrawer"
    :show-second-drawer="showSubMenuDrawer"
  />
  <HeaderUser
    v-if="showAccountDrawer"
    :show-account-drawer="showAccountDrawer"
  />
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
