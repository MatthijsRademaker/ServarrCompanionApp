import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { useApplicationEvent } from '~/composables/use-event-bus';

export default eventHandler(async (event) => {
  const body = await readBody(event);
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);

  const { data: currentAlertList, error: getError } = await client
    .from('BookWatchList')
    .select()
    .eq('user_id', user!.id);

  if (getError) {
    console.log('🚀 ~ addToAlertList ~ getError:', getError);
    return { data: null, error: getError };
  }

  if (
    currentAlertList.length > 0 &&
    currentAlertList.some((book) => book.book_id === body.bookId.toString())
  ) {
    console.log('🚀 ~ addToAlertList ~ already in alert list');
    return { data: currentAlertList, error: null };
  }

  const { data, error } = await client
    .from('BookWatchList')
    .insert([{ user_id: user?.id, book_id: body.bookId }]);

  if (!error) {
    useApplicationEvent('supabase:alertListUpdated');
  }
  return { data, error };
});
