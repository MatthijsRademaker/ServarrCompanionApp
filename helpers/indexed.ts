import type { BookResource } from '~/thirdPartyApis/readarr/models';

export const isBookIndexed = (item: BookResource) => {
  return item.id !== undefined && item.id !== 0 && item.id !== null;
};
