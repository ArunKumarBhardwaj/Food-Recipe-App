import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const QUERY_KEY = ["recipeDetails"];

const fetchRecipeDetails = async (id: any) => {
  const { data } = await axios.get(
    `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  return data;
};

export const useGetRecipeDeatils = (id: any) => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => fetchRecipeDetails(id),
    enabled: !!id,
  });
};
