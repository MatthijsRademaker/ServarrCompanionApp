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
  () =>
    props.indexed &&
    isLoggedIn.value &&
    (book as IndexedBook).fileData.value?.length > 0
);

const supaBaseStore = useSupabaseStore();
supaBaseStore.getWishList();

const { isLoggedIn } = storeToRefs(supaBaseStore);

const { alreadyInWishList, addToWishList } = useWishList(book);

const onDownloadClick = () => {
  (book as IndexedBook).DownloadBook();
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
    @wish-list-click="addToWishList"
    @share-click="() => {}"
  >
    <p>
      <span class="text-caption">Page count:</span>
      {{ book?.book.value?.pageCount }}
    </p>
  </ProductCard>
</template>
