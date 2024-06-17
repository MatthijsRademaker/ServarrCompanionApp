import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { useApplicationEvent } from '~/composables/use-event-bus';
import { WishListTableName } from '~/server/constants/supabase';

export default eventHandler(async (event) => {
  const body = await readBody(event);
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);

  const { data, error } = await client
    .from(WishListTableName)
    .delete()
    .eq('user_id', user!.id)
    .eq('book_id', body.bookId.toString());

  console.log('🚀 ~ eventHandler ~ error:', error);
  console.log('🚀 ~ eventHandler ~ data:', data);

  return { data, error };
});
