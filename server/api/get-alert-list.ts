import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default eventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);

  const { data, error } = await client
    .from('BookWatchList')
    .select()
    .eq('user_id', user!.id);

  return { data, error };
});
