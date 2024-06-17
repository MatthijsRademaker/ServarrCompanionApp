export const wrapToPromise = async <T>(
  fn: Function,
  isLoading: Ref<Boolean>
) => {
  await new Promise<T>((resolve) => {
    watch(
      isLoading,
      (newIsLoading) => {
        if (newIsLoading) return;
        resolve(fn());
      },
      { immediate: true }
    );
  });
};
