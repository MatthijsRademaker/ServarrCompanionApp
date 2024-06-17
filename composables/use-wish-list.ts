export const useWishList = (book: IndexedBook | NotIndexedBook) => {
  const supaBaseStore = useSupabaseStore();
  supaBaseStore.getWishList();
  const { wishList, isLoggedIn } = storeToRefs(supaBaseStore);

  const id = computed(() => book.book.value?.id?.toString());

  const alreadyInWishList = computed(
    () =>
      wishList.value?.find((item) => item.book_id === id.value) !== undefined
  );

  const isWishlistLoading = ref(false);
  const addToWishList = async () => {
    if (alreadyInWishList.value) {
      await $fetch('/api/wishlist/remove-from-wish-list', {
        method: 'POST',
        body: JSON.stringify({ bookId: id.value }),
      });

      useApplicationEvent('supabase:wishListUpdated');
      return;
    }
    isWishlistLoading.value = true;
    await book.AddToWishlist();
    isWishlistLoading.value = false;
  };

  return {
    alreadyInWishList,
    addToWishList,
    isWishlistLoading,
    canAddToWishList: isLoggedIn,
  };
};
