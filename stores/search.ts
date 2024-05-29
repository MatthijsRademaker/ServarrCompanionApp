import type { SearchResource } from '~/thirdPartyApis/readarr/models';

export const useSearchStore = defineStore('search', () => {
  const readarrSearchResults = ref<SearchResource[]>();

  const setReadarrSearchResults = (results: SearchResource[]) => {
    readarrSearchResults.value = results;
  };
  const lidarrSearchResults = ref<SearchResource[]>();

  const setLidarrSearchResults = (results: SearchResource[]) => {
    lidarrSearchResults.value = results;
  };

  return {
    readarrSearchResults,
    setReadarrSearchResults,
    lidarrSearchResults,
    setLidarrSearchResults,
  };
});
