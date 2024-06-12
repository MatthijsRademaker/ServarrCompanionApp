export const useSupabaseStore = defineStore('supabase', () => {
  const user = useSupabaseUser();
  const {
    data: alertList,
    error,
    execute: fetchAlertList,
  } = useFetch('/api/get-alert-list', {
    immediate: false,
  });

  const getAlertList = () => {
    if (user.value?.id && !alertList.value) {
      fetchAlertList();
    }
    return alertList;
  };

  useApplicationListen('supabase:alertListUpdated', () => {
    console.log('🚀 ~ useSupabaseStore ~ alertListUpdated');
    fetchAlertList();
  });

  return { alertList, getAlertList };
});
