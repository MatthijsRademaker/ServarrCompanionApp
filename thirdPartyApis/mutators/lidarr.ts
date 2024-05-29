import { mutator, type MutatorOptions } from './mutator';

export const lidarrMutator = async <T>(options: MutatorOptions) =>
  mutator<T>(
    import.meta.env.VITE_LIDARR_API_URL,
    import.meta.env.VITE_LIDARR_API_KEY,
    options
  );
