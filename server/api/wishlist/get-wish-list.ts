import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { WishListTableName } from '~/server/constants/supabase';

export default eventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);

  const { data, error } = await client
    .from(WishListTableName)
    .select()
    .eq('user_id', user!.id);

  return { data, error };
});
