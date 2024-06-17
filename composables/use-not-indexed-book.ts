import { ref, computed, watch } from 'vue';
import { wrapToPromise } from '~/helpers/wrap-to-promise';
import { useGetApiV1Search, usePostApiV1Book } from '~/thirdPartyApis/readarr';
import type { BookResource } from '~/thirdPartyApis/readarr/models';

export interface NotIndexedBook {
  isLoading: Ref<boolean>;
  book: ComputedRef<BookResource | undefined>;
  AddToWishlist: () => Promise<void>;
}

export function useNotIndexedBook(id: string): NotIndexedBook {
  const isLoading = ref(false);
  // TODO get value after mutate is done and update with new value and use that to add to wishlist
  const bookValue = ref<BookResource>();

  const book = computed(
    () =>
      bookValue.value ??
      searchResult.value?.find((entity) => entity.book !== undefined)?.book
  );

  const author = computed(() => book.value?.author);

  const { data: searchResult, isLoading: isLoadingSearch } = useGetApiV1Search(
    {
      term: `work:${id}`,
    },
    {
      query: {
        enabled: id !== undefined,
      },
    }
  );

  watch(isLoadingSearch, () => {
    isLoading.value = isLoadingSearch.value;
  });

  const { mutate, data } = usePostApiV1Book();
  async function AddToWishlist() {
    const callBack = () => {
      const addOptionsBook = {
        addOptions: {
          searchForNewBook: false,
        },
      };
      const addOptionsAuthor = {
        author: {
          ...author.value,
          addOptions: {
            searchForMissingBooks: false,
            booksToMonitor: [id],
          },
          rootFolderPath: 'B:\\',
        },
      };
      const postData = {
        ...book.value,
        ...addOptionsBook,
        ...addOptionsAuthor,
        monitor: true,
      };

      mutate({ data: postData });

      watch(data, async (newValue) => {
        if (newValue) {
          bookValue.value = newValue;
          await $fetch('/api/wishlist/add-to-wish-list', {
            method: 'POST',
            body: JSON.stringify({ bookId: newValue.id }),
          });

          useApplicationEvent('supabase:wishListUpdated');
        }
      });
    };

    await wrapToPromise(callBack, isLoading);
  }

  return {
    isLoading,
    book,
    AddToWishlist,
  };
}
