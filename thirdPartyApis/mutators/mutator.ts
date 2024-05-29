import ky from 'ky';

/**
 * Based on https://github.com/anymaniax/orval/blob/master/tests/mutators/custom-client.ts
 */

export type BodyType<BodyData> = BodyData;

export type Params = Record<string, string> | string; // all relevant URLSearchParams arguments

export interface MutatorOptions {
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

export const mutator = <T>(
  baseUrl: string,
  apiKey: string,
  mutatorOptions: MutatorOptions
) => {
  const { url, method, params, data, headers, signal } = mutatorOptions;

  const defaultHeaders = {
    'X-Api-Key': apiKey,
  };
  return ky(url.startsWith('/') ? url.slice(1) : url, {
    prefixUrl: baseUrl,
    ...(method ? { method: method } : {}),
    ...(params ? { searchParams: params } : {}),
    ...(data ? { json: data } : {}),
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...(signal ? { signal: signal } : {}),
    // TODO: json() should be based on OrvalOptions.responseType
  }).json<T>();
};
