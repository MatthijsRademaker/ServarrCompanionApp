<script setup lang="ts">
import type { AuthError } from '@supabase/supabase-js';
import useVuelidate from '@vuelidate/core';
import { email, minLength, required, sameAs } from '@vuelidate/validators';

const supabase = useSupabaseClient();

const signUpModel = ref({
  emailAddress: '',
  password: '',
  confirmPassword: '',
  username: '',
});

const visible = ref(false);
const rules = computed(() => ({
  emailAddress: {
    required: required,
    email: email,
  },
  password: {
    required: required,
    minLength: minLength(8),
  },
  confirmPassword: {
    required: required,
    sameAsPassword: sameAs(signUpModel.value.password),
  },
  username: {
    required: required,
  },
}));

const v$ = useVuelidate(rules, signUpModel);
const signUpError = ref<AuthError | null>(null);
const isLoading = ref(false);
const username = ref('');
const signUp = async () => {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }

  isLoading.value = true;
  const { data, error } = await supabase.auth.signUp({
    email: signUpModel.value.emailAddress,
    password: signUpModel.value.password,
    options: {
      data: {
        displayName: signUpModel.value.username,
      },
      emailRedirectTo: import.meta.env.VITE_EMAIL_REDIRECT_TO,
    },
  });
  isLoading.value = false;
  signUpError.value = error;
  if (!error && data) {
    username.value = data.user?.email ?? '';
  }
};
</script>

<template>
  <v-row>
    <v-alert v-if="signUpError" color="error" dense>{{
      signUpError.message
    }}</v-alert>
    <v-alert v-if="username" color="success" dense>
      A verification email has been sent to {{ username }}. Please verify your
      email address to complete the sign up process.
    </v-alert>
  </v-row>
  <v-row v-if="!signUpError && !username">
    <v-col md="8">
      <v-form @submit.prevent>
        <v-text-field
          :class="{ 'mb-4': v$.username.$errors.length }"
          v-model="signUpModel.username"
          label="Username"
          density="compact"
          :error-messages="
            v$.username.$errors.map((e) => e.$message.toString())
          "
          variant="underlined"
        ></v-text-field>

        <v-text-field
          :class="{ 'mb-4': v$.emailAddress.$errors.length }"
          v-model="signUpModel.emailAddress"
          label="Email Address"
          :error-messages="
            v$.emailAddress.$errors.map((e) => e.$message.toString())
          "
          density="compact"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          :class="{ 'mb-4': v$.password.$errors.length }"
          v-model="signUpModel.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
          :error-messages="
            v$.password.$errors.map((e) => e.$message.toString())
          "
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-text-field
          :class="{ 'mb-8': v$.confirmPassword.$errors.length }"
          v-model="signUpModel.confirmPassword"
          :error-messages="
            v$.confirmPassword.$errors.map((e) => e.$message.toString())
          "
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          label="Confirm password"
          variant="underlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn block color="primary" @click="signUp" :loading="isLoading">
          Sign Up
        </v-btn>
      </v-form></v-col
    >
  </v-row>
</template>
