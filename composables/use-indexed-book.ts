import { ref, computed, watch } from 'vue';
import { wrapToPromise } from '~/api/helpers/wrap-to-promise';
import {
  useGetApiV1Bookfile,
  useGetApiV1BookId,
  useGetApiV1BookIdOverview,
  usePutApiV1BookMonitor,
} from '~/thirdPartyApis/readarr';
import type {
  BookFileResource,
  BookResource,
  SearchResource,
} from '~/thirdPartyApis/readarr/models';

export interface IndexedBook {
  book: Ref<BookResource | undefined>;
  imageFilePath: ComputedRef<string>;
  bookOverview: Ref<unknown>;
  fileData: Ref<BookFileResource[] | undefined>;
  isLoading: ComputedRef<boolean>;
  AddToWishlist: () => Promise<void>;
  DownloadBook: () => void;
}

export function useIndexedBook(id: string): IndexedBook {
  const imageFilePath = computed(() => {
    const subPath = book.value?.images?.[0].url;
    return `${import.meta.env.VITE_FILE_SERVER_URL}/readarr${
      subPath?.split('?')[0]
    }`;
  });

  const isLoading = computed(() => {
    return isBookLoading.value || isOverviewLoading.value;
  });

  const { data: book, isLoading: isBookLoading } = useGetApiV1BookId(
    Number(id)
  );

  const bookFileParams = computed(() => ({
    bookId: [Number(id)],
    authorId: book.value?.authorId,
    bookFileIds: [0],
  }));

  const { data: fileData } = useGetApiV1Bookfile(bookFileParams);

  const { data: bookOverview, isLoading: isOverviewLoading } =
    useGetApiV1BookIdOverview(Number(id));

  const { mutate } = usePutApiV1BookMonitor();

  async function AddToWishlist() {
    const callBack = async () => {
      mutate({
        data: { bookIds: [Number(book.value?.id)], monitored: true },
      });

      await $fetch('/api/wishlist/add-to-wish-list', {
        method: 'POST',
        body: JSON.stringify({ bookId: book.value?.id }),
      });

      useApplicationEvent('supabase:wishListUpdated');
    };

    await wrapToPromise(callBack, isLoading);
  }

  function DownloadBook() {
    const url = String(fileData.value?.[0].path);
    const strippedUrl = url.substring(3);
    window.open(`${import.meta.env.VITE_FILE_SERVER_URL}/books/${strippedUrl}`);
  }

  return {
    book,
    imageFilePath,
    bookOverview,
    fileData,
    isLoading,
    AddToWishlist,
    DownloadBook,
  };
}
