import { supabase } from '~/helpers/supabase';

// TODO move to server side

export const getAlertList = async (userId: string) => {
  const { data, error } = await supabase
    .from('BookWatchList')
    .select()
    .eq('user_id', userId);
  return { data, error };
};

export const addToAlertList = async (userUId: string, bookId: string) => {
  const { data, error } = await supabase
    .from('BookWatchList')
    .insert([{ user_id: userUId, book_id: bookId }]);
  return { data, error };
};

export const removeFromAlertList = async (userUId: string, bookId: string) => {
  const { data, error } = await supabase
    .from('BookWatchList')
    .delete()
    .eq('user_id', userUId)
    .eq('book_id', bookId);
  return { data, error };
};
