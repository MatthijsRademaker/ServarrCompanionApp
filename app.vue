<template>
  <NuxtLayout>
    <v-layout>
      <Header />
      <v-main>
        <div class="container">
          <NuxtPage />
        </div>
      </v-main>
    </v-layout>
  </NuxtLayout>
</template>

<style scoped>
.container {
  padding: 20px;
}
</style>
