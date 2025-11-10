import { useQuery } from "@tanstack/react-query";
import { mockApi } from "../api";
import { QUERY_KEYS } from "@/feature/query-keys";
import type { MockCoffeeConsumptionResponse } from "../types";

export const useMockCoffeeConsumption = () => {
  return useQuery<MockCoffeeConsumptionResponse>({
    queryKey: QUERY_KEYS.MOCK.COFFEE_CONSUMPTION,
    queryFn: mockApi.getCoffeeConsumption,
  });
};
