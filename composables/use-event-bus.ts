import mitt from 'mitt';

type ApplicationEvents = {
  'supabase:wishListUpdated': void;
};

const emitter = mitt<ApplicationEvents>();

export const useApplicationEvent = emitter.emit;
export const useApplicationListen = emitter.on;
