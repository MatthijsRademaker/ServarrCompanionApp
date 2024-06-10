<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';

const visible = ref(false);

const emit = defineEmits<{
  signUp: [];
  login: [emailAddress: string, password: string];
  forgotPassword: [];
}>();

const emailAddress = ref('');
const password = ref('');

const OnLoginClick = () => {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }
  emit('login', emailAddress.value, password.value);
};

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
      :error-messages="v$.value.emailAddress?.$errors"
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
            event.preventDefault();
            $emit('forgotPassword');
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
      :error-messages="v$.value.password?.$errors"
    ></v-text-field>

    <v-btn
      class="mb-8"
      size="large"
      color="primary"
      block
      @click="OnLoginClick"
    >
      Log In
    </v-btn>

    <v-btn color="secondary" size="large" block @click="$emit('signUp')">
      Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
    </v-btn>
  </v-card>
</template>
