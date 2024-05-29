import type { SearchResource as ReadarrSearchResult } from '~/thirdPartyApis/readarr/models';
import type { SearchResource as LidarrSearchResult } from '~/thirdPartyApis/lidarr/models';

export const useSearchStore = defineStore('search', () => {
  const readarrSearchResults = ref<ReadarrSearchResult[]>();

  const setReadarrSearchResults = (results: ReadarrSearchResult[]) => {
    readarrSearchResults.value = results;
  };
  const lidarrSearchResults = ref<LidarrSearchResult[]>();

  const setLidarrSearchResults = (results: LidarrSearchResult[]) => {
    lidarrSearchResults.value = results;
  };

  return {
    readarrSearchResults,
    setReadarrSearchResults,
    lidarrSearchResults,
    setLidarrSearchResults,
  };
});
