<script setup lang="ts">
import { usePutApiV1BookMonitor } from '~/thirdPartyApis/readarr';

const props = defineProps<{
  title: string;
  imgUrl: string;
  id: number | string;
  rating: number;
  indexed: boolean;
  genres?: string[];
  goToRoute: string;
}>();

const book = useBook(props.id.toString(), props.indexed);

const showDownloadButton = computed(
  () => props.indexed && (book as IndexedBook).fileData.value?.length > 0
);

const supaBaseStore = useSupabaseStore();
supaBaseStore.getWishList();

const { wishList, isLoggedIn } = storeToRefs(supaBaseStore);
const alreadyInWishList = computed(() => {
  return (
    wishList.value?.find((item) => item.book_id === props.id.toString()) !==
    undefined
  );
});

const onDownloadClick = () => {
  (book as IndexedBook).DownloadBook();
};

const onWishListClick = async () => {
  if (alreadyInWishList.value) {
    await $fetch('/api/wishlist/remove-from-wish-list', {
      method: 'POST',
      body: JSON.stringify({ bookId: props.id }),
    });

    useApplicationEvent('supabase:wishListUpdated');
    return;
  }

  await book.AddToWishlist();
};

const author = computed(() => {
  return book.book.value?.author?.authorName;
});
</script>
<template>
  <ProductCard
    :title="title"
    :subTitle="`by ${author}`"
    :imgUrl="imgUrl"
    :id="id"
    :indexed="indexed"
    :genres="genres"
    :rating="rating"
    :go-to-route="goToRoute"
    :base-route="'readarr'"
    :show-download-button="showDownloadButton"
    :is-wishlist-button-disabled="!isLoggedIn"
    :already-on-wish-list="alreadyInWishList"
    @download-click="onDownloadClick"
    @wish-list-click="onWishListClick"
    @share-click="() => {}"
  >
    <p>
      <span class="text-caption">Page count:</span>
      {{ book?.book.value?.pageCount }}
    </p>
  </ProductCard>
</template>
