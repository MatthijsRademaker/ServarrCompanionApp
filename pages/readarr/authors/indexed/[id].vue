<script setup lang="ts">
import { useGetApiV1AuthorId, useGetApiV1Book } from '~/thirdPartyApis/readarr';
import { getImageFilePath } from '~/helpers/files';

const route = useRoute();

const { data: author, isLoading: isLoadingAuthor } = useGetApiV1AuthorId(
  route.params.id as string
);

const imageFilePath = computed(() => {
  const subPath = author.value?.images?.[0]?.url;
  return `${import.meta.env.VITE_FILE_SERVER_URL}/readarr${
    subPath?.split('?')[0]
  }`;
});

const { data: books, isLoading: isLoadingBooks } = useGetApiV1Book();

const isLoading = computed(() => {
  return isLoadingAuthor.value || isLoadingBooks.value;
});

const booksForAuthor = computed(() => {
  return books.value?.filter((book) => book.authorId === author.value?.id);
});
</script>
<template>
  <!-- TODO fill with next book  and genres should be all unlisted books or something-->
  <DetailedCard
    :is-loading="isLoading"
    :title="author?.authorName"
    :main-image-path="imageFilePath"
    :main-overview="author?.overview"
    :side-title="author?.lastBook?.title"
    :side-image-path="author?.images?.[0]?.url"
    :side-overview="author?.overview"
    :genres="['todo']"
    :good-reads-link="links?.[0]?.url"
  >
    <template #buttons>
      <!-- TODO should be buttons to add entire catalog -->
    </template>

    <template #additional-content>
      <v-row>
        <v-col>
          <h2>Books from {{ author?.authorName }}</h2>
        </v-col>
      </v-row>
      <v-row>
        <template v-if="booksForAuthor">
          <v-col
            v-for="item in booksForAuthor"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
          >
            <BookCard
              :title="item?.title ?? ''"
              :imgUrl="getImageFilePath(item)"
              :id="item.id ?? item?.foreignBookId ?? 0"
              :indexed="item?.id !== 0"
              :genres="item?.genres ?? []"
              :rating="item?.ratings?.value ?? 0"
              :pageCount="item?.pageCount ?? 0"
            />
          </v-col>
        </template>
      </v-row>
    </template>
  </DetailedCard>
</template>
