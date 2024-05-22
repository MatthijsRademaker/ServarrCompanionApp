import { getReadarrMock } from '../thirdPartyApis/readarr/index.msw';

export const handlers = [...getReadarrMock()];
