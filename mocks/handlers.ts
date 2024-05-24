import type { RequestHandler } from 'msw';
import { getReadarrMock } from '~/thirdPartyApis/readarr/index.msw';

export const handlers: Array<RequestHandler> = [...getReadarrMock()];
