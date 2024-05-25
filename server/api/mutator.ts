// custom-instance.ts

const baseURL = 'http://188.89.222.236:8787'; // use your own URL here or environment variable

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
        'X-Api-Key': 'f5f3f65639164b0f8e6f16b67bf0f17e', // use your own API key here or environment variable
      },
    }
  );

  return response.json();
};

export default customInstance;
