import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { useApplicationEvent } from '~/composables/use-event-bus';

export default eventHandler(async (event) => {
  const body = await readBody(event);
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);

  const { data, error } = await client
    .from('BookWatchList')
    .delete()
    .eq('user_id', user!.id)
    .eq('book_id', body.bookId);

  if (!error) {
    useApplicationEvent('supabase:alertListUpdated');
  }

  return { data, error };
});
