import { useCallback } from 'react';

export const useHttpClient = () => {
  const sendRequest = useCallback(
    async (
      url: string,
      method = 'GET',
      body: string | null = null,
      headers = {}
    ) => {
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        const responseData = await response.json();

        if (!response.ok) throw new Error(responseData.message);

        return responseData;
      } catch (err) {
        throw err;
      }
    },
    []
  );

  return { sendRequest };
};
