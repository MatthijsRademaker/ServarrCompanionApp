import type { SearchResource } from '~/thirdPartyApis/readarr/models';

export const useSearchStore = defineStore('search', () => {
  const searchResults = ref<SearchResource[]>();

  const setSearchResults = (results: SearchResource[]) => {
    searchResults.value = results;
  };

  return {
    searchResults,
    setSearchResults,
  };
});
