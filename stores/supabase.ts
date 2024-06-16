export const useSupabaseStore = defineStore('supabase', () => {
  const user = useSupabaseUser();
  const {
    data: wishListData,
    error,
    execute: fetchWishList,
  } = useFetch('/api/wishlist/get-wish-list', {
    immediate: false,
  });
  fetchWishList();
  const getWishList = () => {
    if (user.value?.id && !wishListData.value) {
      fetchWishList();
    }
    return wishListData;
  };

  useApplicationListen('supabase:wishListUpdated', () => {
    console.log('🚀 ~ useSupabaseStore ~ wishListUpdated');
    fetchWishList();
  });

  const isLoggedIn = computed(
    () => user.value !== null && user.value !== undefined
  );

  const wishList = computed(() => {
    return wishListData.value?.data;
  });
  return { wishList, getWishList, isLoggedIn };
});
