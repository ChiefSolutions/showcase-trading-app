import { useCallback, useEffect, useMemo, useReducer } from 'react';

type FetchError = Error | string | null;
type FetchState<T> = {
  data: T;
  loading: boolean;
  error: FetchError;
};

type FetchAction<T> = { type: 'FETCH_INIT' } | { type: 'FETCH_SUCCESS'; payload: T } | { type: 'FETCH_ERROR'; error: FetchError };

const fetchReducer = <T>(state: T, action: FetchAction<T>): T => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export const useFetch = <T>(url: string, initialData: T, onInit = true) => {
  const initialState: FetchState<T> = {
    data: initialData,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchData = useCallback(
    async (options: { controller: AbortController }) => {
      const { controller } = options;

      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          console.warn(`An error occurred while fetching market tabs configuration`);
        }

        const data = await response.json();

        dispatch({ type: 'FETCH_SUCCESS', payload: data });

        return data;
      } catch (e) {
        console.error(e);
        dispatch({ type: 'FETCH_ERROR', error: e as Error });
      }
    },
    [url],
  );

  useEffect(() => {
    let controller: AbortController;
    dispatch({ type: 'FETCH_INIT' });

    if (onInit) {
      controller = new AbortController();

      (async () => {
        await fetchData({ controller });
      })();
    }

    return () => {
      controller?.abort('Fetch aborted');
    };
  }, [onInit, fetchData]);

  return useMemo(() => {
    return {
      ...state,
      fetchData,
    };
  }, [fetchData, state]);
};
