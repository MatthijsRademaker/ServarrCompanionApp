import type { RouteLocation, Router } from 'vue-router';

export type BaseRoute = 'lidarr' | 'readarr';
export const goToRelativePath = (
  route: BaseRoute,
  router: Router,
  path: string
) => {
  router.push(`/${route}/${path}`);
};

export const getRelativePath = (route: RouteLocation, path: string) => {
  return `${route.path}/${path}`;
};
