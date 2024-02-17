import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const QUERY_KEY = "searchedMeal";

const fetchSearchedMeal = async (meal: any) => {
  const { data } = await axios.get(
    `https://themealdb.com/api/json/v1/1/search.php?s=${meal}`
  );
  return data;
};

export const useGetSearchedMeal = (meal: any) => {
  return useQuery({
    queryKey: [QUERY_KEY, meal],
    queryFn: () => fetchSearchedMeal(meal),
    enabled: Boolean(meal),
  });
};
