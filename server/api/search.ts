import { getApiV1Search } from '~/thirdPartyApis/readarr/index';

export default defineEventHandler(async (event) => {
  const { data } = await getApiV1Search({ term: 'test' });
  console.log('🚀 ~ defineEventHandler ~ data:', data);

  return data;
});
