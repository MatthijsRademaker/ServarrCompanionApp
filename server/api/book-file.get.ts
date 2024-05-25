import customInstance from './mutator';
import type { BookFileResource } from '~/thirdPartyApis/readarr/models';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log('🚀 ~ defineEventHandler ~ body:', body);
  const data = await customInstance<BookFileResource[]>({
    url: 'books/book-file',
    method: 'GET',
    params: body,
  });

  return data;
});
