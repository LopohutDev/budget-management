import useSWR from "swr";
import { buildURL, buildURLWithParams } from "../helpers";

const useGetTransactionsByCategory = (categoryId: string) => {
  const url = `${buildURL(`/api/category/${categoryId}`)}`;

  const { data, error, mutate } = useSWR(
    url,
    async (url) => {
      // If url is null (i.e., orderId is undefined), skip the fetch.
      if (!url) return undefined;

      const res = await fetch(url, {
        method: "GET",
      });
      const json = await res.json();
      return json;
    },
    {
      // useSWR configuration to avoid revalidate on focus or network reconnect when url is null
      revalidateOnFocus: !!url,
      revalidateOnReconnect: !!url,
    }
  );

  return {
    data: data?.data,
    error,
    isLoading: !error && !data,
    mutate,
  };
};

export default useGetTransactionsByCategory;
