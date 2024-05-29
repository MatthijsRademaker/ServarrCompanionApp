import mutator, { type MutatorOptions } from './mutator';

export const readarrMutator = async <T>(options: MutatorOptions) =>
  mutator<T>(
    import.meta.env.VITE_READARR_API_URL,
    import.meta.env.VITE_READARR_API_KEY,
    options
  );
