export const useBook = (
  id: string,
  indexed: boolean
): IndexedBook | NotIndexedBook => {
  if (indexed) {
    return useIndexedBook(id, indexed);
  }
  return useNotIndexedBook(id);
};
