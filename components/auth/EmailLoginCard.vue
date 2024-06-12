<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';

const visible = ref(false);
const isLoading = ref(false);

const emit = defineEmits<{
  eventHandled: [];
}>();

const emailAddress = ref('');
const password = ref('');

const rules = computed(() => ({
  emailAddress: {
    required: required,
    email: email,
  },
  password: {
    required: required,
    minLength: minLength(8),
  },
}));

const v$ = useVuelidate(rules, { emailAddress, password });

const OnLoginClick = () => {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }
  handleSignInWitEmail();
};

const supabase = useSupabaseClient();
const handleSignInWitEmail = async () => {
  isLoading.value = true;
  await supabase.auth.signInWithPassword({
    email: emailAddress.value,
    password: password.value,
  });
  isLoading.value = false;

  emit('eventHandled');
  router.push('/user/alertlist');
};

const router = useRouter();

const onSignUp = () => {
  emit('eventHandled');
  router.push('/auth/signup');
};
</script>

<template>
  <v-card class="mx-auto pa-12 pb-8" elevation="8" width="600" rounded="lg">
    <div class="text-subtitle-1 text-medium">Email Address</div>

    <v-text-field
      v-model="emailAddress"
      density="compact"
      placeholder="Enter your email address"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      :error-messages="
        v$.emailAddress?.$errors?.map((e) => e.$message.toString())
      "
    ></v-text-field>

    <div
      class="text-subtitle-1 text-medium d-flex align-center justify-space-between"
    >
      Password

      <a
        class="text-caption text-decoration-none text-blue"
        href="#"
        rel="noopener noreferrer"
        target="_blank"
        @click="
          (event) => {
            // TODO
            event.preventDefault();
            $emit('eventHandled');
          }
        "
      >
        Forgot login password?</a
      >
    </div>

    <v-text-field
      v-model="password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
      :error-messages="v$.password?.$errors?.map((e) => e.$message.toString())"
    ></v-text-field>

    <v-btn
      class="mb-8"
      size="large"
      color="primary"
      block
      @click="OnLoginClick"
      :loading="isLoading"
    >
      Log In
    </v-btn>

    <v-btn color="secondary" size="large" block @click="onSignUp">
      Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
    </v-btn>
  </v-card>
</template>
