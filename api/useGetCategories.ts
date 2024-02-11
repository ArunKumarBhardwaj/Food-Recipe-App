import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

const QUERY_KEY = ["categories"];

const fetchCategories = async (): Promise<AxiosResponse> => {
  const { data } = await axios.get(
    "https://themealdb.com/api/json/v1/1/categories.php"
  );
  return data;
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchCategories,
    staleTime: Infinity,
  });
};
