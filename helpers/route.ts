const route = useRoute();
const router = useRouter();

export const goToRelativePath = (path: string) => {
  router.push(`${route.path}/${path}`);
};

export const getRelativePath = (path: string) => {
  return `${route.path}/${path}`;
};
