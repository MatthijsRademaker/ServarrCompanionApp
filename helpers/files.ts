import type {
  AuthorResource,
  BookResource,
} from '~/thirdPartyApis/readarr/models';

export const getImageFilePath = (item: BookResource | AuthorResource) => {
  const subPath = item?.images?.[0]?.url;
  return `${import.meta.env.VITE_FILE_SERVER_URL}/readarr${
    subPath?.split('?')[0]
  }`;
};
