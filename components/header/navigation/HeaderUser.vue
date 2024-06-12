<script setup lang="ts">
import EmailLoginCard from '~/components/auth/EmailLoginCard.vue';
const showAccountDrawer = defineModel('showAccountDrawer', { type: Boolean });

const user = useSupabaseUser();
const supabase = useSupabaseClient();

const showAccountInfo = computed(() => !!user.value && showAccountDrawer.value);

const showLoginButtons = computed(() => !user.value && showAccountDrawer.value);

const showSignInModal = ref(false);

const router = useRouter();

const signOut = async () => {
  await supabase.auth.signOut();
};
</script>

<template>
  <v-navigation-drawer
    v-model="showAccountDrawer"
    :location="$vuetify.display.mobile ? 'top' : 'right'"
    temporary
  >
    <v-list nav>
      <template v-if="showLoginButtons">
        <v-col>
          <v-btn
            color="primary"
            block
            @click="
              () => {
                showSignInModal = true;
                showAccountDrawer = false;
              }
            "
          >
            Login
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            color="primary"
            block
            @click="
              () => {
                showAccountDrawer = false;
                router.push('/auth/signup');
              }
            "
          >
            Sign Up</v-btn
          >
        </v-col>
      </template>
      <!-- TODO -->
      <v-list-item
        v-if="showAccountInfo"
        v-for="(item, i) in [
          { path: 'Profile', icon: 'mdi-account-cog' },
          { path: 'Alertlist', icon: 'mdi-bookmark-plus' },
        ]"
        :key="i"
        :value="item"
        color="primary"
      >
        <v-list-item-title
          @click="
            () => {
              showAccountDrawer = false;
              router.push(`/user/${item.path.toLowerCase()}`);
            }
          "
          ><v-icon>{{ item.icon }}</v-icon> {{ item.path }}</v-list-item-title
        >
      </v-list-item>
      <v-btn
        v-if="showAccountInfo"
        color="primary"
        block
        @click="
          () => {
            showAccountDrawer = false;
            signOut();
          }
        "
      >
        Logout</v-btn
      >
    </v-list>
  </v-navigation-drawer>

  <v-overlay v-model="showSignInModal" class="align-center justify-center">
    <EmailLoginCard @event-handled="showSignInModal = false" />
  </v-overlay>
</template>
