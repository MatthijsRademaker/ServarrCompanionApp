// custom-instance.ts

const baseURL = import.meta.env.VITE_READARR_API_URL; // use your own URL here or environment variable

export const customInstance = async <T>({
  url,
  method,
  params,
  data,
}: {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: any;
  data?: unknown;
  responseType?: string;
}): Promise<T> => {
  const response = await fetch(
    `${baseURL}${url}` + `${params ? '?' : ''}` + new URLSearchParams(params),
    {
      method,
      ...(data ? { body: JSON.stringify(data) } : {}),
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': import.meta.env.VITE_READARR_API_KEY, // use your own API key here or environment variable
      },
    }
  );

  return response.json();
};

export default customInstance;
