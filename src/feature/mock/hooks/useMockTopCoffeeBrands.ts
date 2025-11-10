import { useQuery } from "@tanstack/react-query";
import { mockApi } from "../api";
import { QUERY_KEYS } from "@/feature/query-keys";
import type { MockTopCoffeeBrandsResponse } from "../types";

export const useMockTopCoffeeBrands = () => {
  return useQuery<MockTopCoffeeBrandsResponse>({
    queryKey: QUERY_KEYS.MOCK.TOP_COFFEE_BRANDS,
    queryFn: mockApi.getTopCoffeeBrands,
  });
};
