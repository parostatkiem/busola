import { checkForTokenExpiration } from './checkForTokenExpiration';
import { createHeaders } from './createHeaders';
import { useMicrofrontendContext } from '../../contexts/MicrofrontendContext';
import { baseUrl, throwHttpError } from './config';
import { useConfig } from '../../contexts/ConfigContext';

export const useFetch = () => {
  const { authData, cluster } = useMicrofrontendContext();
  const { fromConfig } = useConfig();

  if (!authData) return () => {};

  return async ({ relativeUrl, abortController, init }) => {
    checkForTokenExpiration(authData?.token);

    init = {
      ...init,
      headers: {
        ...(init?.headers || {}),
        ...createHeaders(authData, cluster.cluster),
      },
      signal: abortController?.signal,
    };

    try {
      const response = await fetch(baseUrl(fromConfig) + relativeUrl, init);
      if (response.ok) {
        return response;
      } else {
        throw await throwHttpError(response);
      }
    } catch (e) {
      console.error('Fetch failed: ', e);
      throw e;
    }
  };
};
