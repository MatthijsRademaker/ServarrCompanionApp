<template>
  <v-row>
    <v-col cols-md="4">
      <div class="intro">
        <p class="text-h4 mb-6">
          Hello! I'm Prowlarr, here to transform the way you discover books and
          music.
        </p>
        <p class="text-body-1 mb-2">
          Whether you're an avid reader on the hunt for your next literary
          adventure or a music lover seeking fresh tunes, I've got you covered.
          Think of me as your personal guide in the vast universe of literature
          and melodies.
        </p>
        <p class="text-body-1 mb-2">
          With my advanced search capabilities and intuitive interface, I make
          finding your desired books and music a breeze. No more endless
          scrolling or frustrating searches. I'm here to help you get exactly
          what you want, quickly and effortlessly. Let's embark on this exciting
          journey together. Dive into Prowlarr today, and let me show you how
          easy it is to find your next great read or your new favorite song.
          Your perfect book or playlist is just a click away, and I'm here to
          help you find it!
        </p>
      </div>
      <!-- TODO -->
      <v-btn color="primary" class="mt-6" to="/readarr">
        Explore book library
      </v-btn>
      <v-btn color="primary" class="mt-2" to="/lidarr">
        Discover music library
      </v-btn>
    </v-col>
    <v-col>
      <v-img
        src="/assets/hero-banner.jpg"
        max-height="500"
        max-width="800"
        :aspect-ratio="16 / 9"
      ></v-img>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-divider class="my-6"></v-divider>
    </v-col>
  </v-row>
</template>

<style scoped>
.intro {
  @media screen and (min-width: 600px) {
    max-width: 70%;
  }
}
</style>
