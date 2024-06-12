<script setup lang="ts">
import {
  useGetApiV1Book,
  useGetApiV1Author,
  useGetApiV1Bookfile,
} from '~/thirdPartyApis/readarr';
import { getImageFilePath } from '~/helpers/files';

const user = useSupabaseUser();
const router = useRouter();

if (!user.value) {
  router.push('/login');
}

const supaBaseStore = useSupabaseStore();
supaBaseStore.getAlertList();

const { alertList } = storeToRefs(supaBaseStore);

const requestParams = computed(() => {
  return {
    bookIds: alertList.value?.data?.map((item) => item.book_id),
  };
});
const { data: books, isLoading: isLoadingBooks } = useGetApiV1Book(
  requestParams,
  {
    query: {
      enabled: !!requestParams.value,
    },
  }
);

const authorRequestParams = computed(() => {
  return {
    authorIds: books.value?.map((item) => item.authorId),
  };
});
const { data: authorData, isLoading: isLoadingAuthors } = useGetApiV1Author({
  query: {
    enabled: !!authorRequestParams.value,
  },
});

const getAuthorName = (authorId: string) => {
  const author = authorData.value?.find((item) => item.id === authorId);
  return author?.authorName;
};

const getAlertItemCreatedAt = (bookId: string) => {
  const createdAt = alertList.value?.data?.find(
    (item) => item.book_id === bookId
  )?.created_at;

  return createdAt ? new Date(createdAt).toLocaleDateString() : '';
};

const bookFileParams = computed(() => ({
  bookId: requestParams.value?.bookIds,
}));

const { data: fileData } = useGetApiV1Bookfile(bookFileParams, {
  query: {
    enabled: !!bookFileParams.value,
  },
});

const isBookOnDisk = (bookId: number) => {
  return fileData.value?.find((item) => item.bookId === bookId);
};

const sortedBooksBasedOnDisk = computed(() => {
  return books.value?.sort((a, b) => {
    if (isBookOnDisk(a.id) && !isBookOnDisk(b.id)) {
      return -1;
    }
    if (!isBookOnDisk(a.id) && isBookOnDisk(b.id)) {
      return 1;
    }
    return 0;
  });
});
</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-card :loading="isLoadingBooks || !requestParams">
        <v-card-title>Wish list</v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="3"
              v-for="item in sortedBooksBasedOnDisk"
            >
              <v-card
                :key="item.id"
                class="grid"
                color="accent"
                variant="elevated"
                min-height="140"
              >
                <v-img
                  :src="getImageFilePath(item)"
                  :alt="item.title"
                  class="grid-img"
                  cover
                />
                <div class="grid-title">
                  <p
                    @click="router.push(`/readarr/books/indexed/${item.id}`)"
                    class="pl-4 pt-2 text-md-6 text-caption font-weight-bold book-title"
                  >
                    {{ item.title }}
                  </p>
                  <v-card-subtitle
                    @click="
                      router.push(`/readarr/authors/indexed/${item.authorId}`)
                    "
                    class="author-title"
                  >
                    by {{ getAuthorName(item.authorId) }}</v-card-subtitle
                  >
                </div>
                <v-card-actions class="justify-space-between align-end">
                  <!-- TODO download button -->
                  <v-btn
                    :disabled="!isBookOnDisk(item.id)"
                    @click="router.push(`/readarr/books/indexed/${item.id}`)"
                    icon
                    size="medium"
                  >
                    <v-icon>mdi-download</v-icon>
                  </v-btn>
                  <!-- TODO share button -->
                  <v-btn
                    @click="router.push(`/readarr/books/indexed/${item.id}`)"
                    icon
                    size="medium"
                  >
                    <v-icon>mdi-share</v-icon>
                  </v-btn>
                  <v-btn
                    size="medium"
                    @click="
                      useFetch('/api/remove-from-alert-list', {
                        method: 'POST',
                        body: JSON.stringify({ bookId: item.id }),
                      })
                    "
                    icon
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 80px 1fr;

  @media screen and (min-width: 1441px) {
    grid-template-columns: 180px 1fr;
  }
}
.grid-img {
  grid-column: 1;
  grid-row: 1 / 3;
}
.grid-title {
  grid-column: 2;
  grid-row: 1;
}
.grid-subtitle {
  grid-column: 2;
  grid-row: 2;
}

.book-title {
  cursor: pointer;
}
.author-title {
  cursor: pointer;
}
</style>
