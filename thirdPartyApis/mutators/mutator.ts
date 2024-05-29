import ky from 'ky';

/**
 * Based on https://github.com/anymaniax/orval/blob/master/tests/mutators/custom-client.ts
 */

export type BodyType<BodyData> = BodyData;

export type Params = Record<string, string> | string; // all relevant URLSearchParams arguments

export interface OrvalOptions {
  url: string;
  method:
    | 'get'
    | 'GET'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'delete'
    | 'DELETE'
    | 'patch'
    | 'PATCH';
  params?: Params;
  data?: BodyType<unknown>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  responseType?: string;
}

export const mutator = <T>(orvalOptions: OrvalOptions) => {
  const { url, method, params, data, headers, signal } = orvalOptions;

  return ky(url.startsWith('/') ? url.slice(1) : url, {
    prefixUrl: import.meta.env.VITE_ZORGFUNNEL_API_BASE_URL,
    ...(method ? { method: method } : {}),
    ...(params ? { searchParams: params } : {}),
    ...(data ? { json: data } : {}),
    ...(headers ? { headers: headers } : {}),
    ...(signal ? { signal: signal } : {}),
    // TODO: json() should be based on OrvalOptions.responseType
  }).json<T>();
};
