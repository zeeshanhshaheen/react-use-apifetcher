import { useState, useEffect } from 'react';

interface UseFetcherOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: { [key: string]: string };
  body?: BodyInit | null;
}

interface UseFetcherReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useFetcher<T>(
  url: string,
  options: UseFetcherOptions = {},
  callback: (data: T) => T = data => data
): UseFetcherReturn<T> {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        let jsonData: T = await response.json();

        // If a callback is provided, use it to process the data
        const processedData = callback(jsonData);

        setData(processedData);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options, callback]);

  return { data, loading, error };
}

export default useFetcher;
