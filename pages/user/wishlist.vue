<script setup lang="ts">
import {
  useGetApiV1Book,
  useGetApiV1Author,
  useGetApiV1Bookfile,
} from '~/thirdPartyApis/readarr';
import { getImageFilePath } from '~/helpers/files';
import BookCard from '~/components/books/BookCard.vue';

const user = useSupabaseUser();
const router = useRouter();

if (!user.value) {
  router.push('/login');
}

const supaBaseStore = useSupabaseStore();
supaBaseStore.getWishList();

const { wishList } = storeToRefs(supaBaseStore);

const requestParams = computed(() => {
  return {
    bookIds: wishList.value?.map((item) => item.book_id),
  };
});

const isGetApiV1BookEnabled = computed(() => {
  return requestParams.value?.bookIds?.length > 0;
});
const { data: books, isLoading: isLoadingBooks } = useGetApiV1Book(
  requestParams,
  {
    query: {
      enabled: isGetApiV1BookEnabled,
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

const getWishListItemCreatedAt = (bookId: string) => {
  const createdAt = wishList.value?.data?.find(
    (item) => item.book_id === bookId
  )?.created_at;

  return createdAt ? new Date(createdAt).toLocaleDateString() : '';
};

const bookFileParams = computed(() => ({
  bookId: requestParams.value?.bookIds,
}));

const { data: fileData } = useGetApiV1Bookfile(bookFileParams, {
  query: {
    enabled: bookFileParams.value?.bookId?.length > 0,
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
          <v-row
            v-if="!isLoadingBooks && (books === null || books === undefined)"
          >
            <v-col cols="12" lg="6">
              <v-alert type="info">No books in your wish list</v-alert>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col
              cols="12"
              sm="6"
              lg="3"
              v-for="item in sortedBooksBasedOnDisk"
              :key="item.id"
            >
              <BookCard
                variant="highlight"
                :title="item.title"
                :imgUrl="getImageFilePath(item)"
                :id="item.id"
                :indexed="true"
                :go-to-route="`books/indexed/${item.id}`"
                :pagecount="item.pageCount"
                :author="getAuthorName(item.authorId)"
              />
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
