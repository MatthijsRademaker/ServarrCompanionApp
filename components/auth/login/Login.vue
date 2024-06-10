<script setup lang="ts">
import { supabase } from '~/helpers/supabase';
import EmailLoginCard from '~/components/auth/login/EmailLoginCard.vue';

const handleSignInWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000',
    },
  });
};

const handleSignInWitEmail = async (email: string, password: string) => {
  await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
};
type authOptions = 'Google' | 'Email';
const authOption = ref<authOptions>();

const router = useRouter();
</script>

<template>
  <Script async src="https://accounts.google.com/gsi/client"></Script>
  <div
    id="g_id_onload"
    data-client_id="921892192725-k240cc8lebthetaevs9rop0305bbh0tb.apps.googleusercontent.com"
    data-context="signin"
    data-ux_mode="popup"
    data-login_uri="http://localhost:3000"
    data-itp_support="true"
  ></div>
  <template v-if="authOption === undefined">
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium">Sign in with</div>
      <v-row>
        <v-col cols="12">
          <div
            @click="authOption = 'Google'"
            class="g_id_signin mr-8"
            data-type="standard"
            data-shape="rectangular"
            data-theme="outline"
            data-text="signin_with"
            data-logo_alignment="left"
          ></div>
        </v-col>
        <v-col sm="7">
          <v-btn
            color="primary"
            size="large"
            block
            @click="authOption = 'Email'"
          >
            Email
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </template>
  <div v-if="authOption === 'Email'">
    <EmailLoginCard
      @login="handleSignInWitEmail"
      @forgot-password="() => 'todo'"
      @sign-up="router.push('/auth/signup')"
    />
  </div>
</template>
