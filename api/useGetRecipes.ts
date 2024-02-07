import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const QUERY_KEY = ["recipe"];

const fetchRecipes = async (category: string) => {
  const { data } = await axios.get(
    `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  return data;
};

export const useGetRecipes = (category: string) => {
  return useQuery({
    queryKey: [QUERY_KEY, category],
    queryFn: () => fetchRecipes(category),
  });
};
