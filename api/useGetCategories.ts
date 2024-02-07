import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const QUERY_KEY = ["categories"];

const fetchCategories = async () => {
  const { data } = await axios.get(
    "https://themealdb.com/api/json/v1/1/categories.php"
  );
  return data;
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchCategories,
  });
};
