import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { useNuxtApp } from 'nuxt/app';
import { useApplicationEvent } from '~/composables/use-event-bus';
import { WishListTableName } from '~/server/constants/supabase';

export default eventHandler(async (event) => {
  const body = await readBody(event);
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);

  const { data: currentWishList, error: getError } = await client
    .from(WishListTableName)
    .select()
    .eq('user_id', user!.id);

  if (getError) {
    console.log('🚀 ~ addToWishList ~ getError:', getError);
    return { data: null, error: getError };
  }

  if (
    currentWishList.length > 0 &&
    currentWishList.some((book) => book.book_id === body.bookId.toString())
  ) {
    console.log('🚀 ~ addToWishList ~ already in wish list');
    return { data: currentWishList, error: null };
  }

  const { data, error } = await client
    .from(WishListTableName)
    .insert([{ user_id: user?.id, book_id: body.bookId }]);

  return { data, error };
});
