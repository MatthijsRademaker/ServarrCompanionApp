import type { RouteLocation, Router } from 'vue-router';

export const goToRelativePath = (
  route: RouteLocation,
  router: Router,
  path: string
) => {
  router.push(`${route.path}/${path}`);
};

export const getRelativePath = (route: RouteLocation, path: string) => {
  return `${route.path}/${path}`;
};
