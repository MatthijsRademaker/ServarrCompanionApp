// custom-instance.ts
export type MutatorOptions = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: any;
  data?: unknown;
  responseType?: string;
};
export const mutator = async <T>(
  baseUrl: string,
  apiKey: string,
  { url, method, params, data }: MutatorOptions
): Promise<T> => {
  const response = await fetch(
    `${baseUrl}${url}` + `${params ? '?' : ''}` + new URLSearchParams(params),
    {
      method,
      ...(data ? { body: JSON.stringify(data) } : {}),
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey,
      },
    }
  );

  return response.json();
};

export default mutator;
